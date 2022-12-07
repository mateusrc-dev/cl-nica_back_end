const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class ProfessionalsController {
  async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM professionals WHERE email = (?)", [email])
    if (checkUserExists) {
      throw new AppError("Este E-mail está em uso!")
    }
    if (!name) {
      throw new AppError("Nome é obrigatório")
    }
    const hashedPassword = await hash(password, 8)
    await database.run("INSERT INTO professionals (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()
  }

  async update(request, response) { //funcionalidade de atualização do usuário
    const { name, email, specialization, description, tags, password, old_password } = request.body //pegando o corpo da requisição
    const user_id = request.user.id; //acessando a propriedade que foi criada no middleware que contem o id do usuário que foi extraído do token
    //const { id } = request.params; //o id está sendo pego do caminho, pois ele foi colocado como parâmetro
    const database = await sqliteConnection() //fazendo conexão com o banco de dados
    const user = await database.get("SELECT * FROM professionals WHERE id = (?)", [user_id]) //selecionando todos as colunas da linha que tem o respectivo id
    if (!user) { //caso o usuário não exista vai entrar nas chaves
      throw new AppError("Profissional não encontrado!")
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM professionals WHERE email = (?)", [email]) //selecionando todas as colunas da linha que tem o respectivo email
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ) { //verificando se a pessoa está tentando mudar um email pra outro que é usado por outra pessoa
      throw new AppError("Este e-mail já está em uso!")
    }

    const tagsInsert = tags.map(name => {
      return {
        name,
        professional_id: user_id
      }
    })

    const tagsExist = await knex("tags").where({ professional_id: user_id })
    if (tagsExist) {
      await knex("tags").where({ professional_id: user_id }).delete()
    }
    await knex("tags").insert(tagsInsert)

    user.name = name ?? user.name //atualizando o nome do user que foi pego através do id - a interrogação significa que se não existir conteúdo dentro de name então vai ser utilizado o user.name - as interrogações é um null operator
    user.email = email ?? user.email //atualizando o email do user
    user.specialization = specialization ?? user.specialization
    user.description = description ?? user.description

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha!")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password) //comparando se a senha antiga inserida pelo usuário (old_password) é igual a que está no banco de dados (user.password) - compare é uma funcionalidade de bcrypt que serve para comparar senhas, é possível comparar a senha que está criptografada no banco de dados (user.password) com a senha que não está que foi inserida pelo usuário (old_password)
      if (!checkOldPassword) { //se caso a senha digitada pelo usuário não for igual a do banco de dados, vai entrar nas chaves
        throw new AppError("A senha antiga não confere!")
      }
      user.password = await hash(password, 8) //atualizando a senha caso passe por todas as verificações e criptografando ela com a função hash
    }

    await database.run(`
    UPDATE professionals SET 
    name = ?, 
    email = ?,
    password = ?, 
    specialization = ?,
    description = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user.specialization, user.description, user_id]); //aqui está sendo atualizado o banco de dados, são comandos SQL (UPDATE users SET) pra atualizar o banco de dados - WHERE é pra identificar a linha específica que será modificado o valor das colunas - DATETIME() é uma função do banco de dados que pega o momento atual (data e hora), estamos fazendo isso porque a função Date() do JS tem um padrão de escrever a data e hora diferente da função do banco de dados
    return response.json()
  }

  async show(request, response) {
    const { id } = request.params //vamos pegar o id que foi passado como um parâmetro para poder encontrar a nota do usuário
    const professional = await knex("professionals").where({ id }).first(); //pegando a primeira nota com first, sempre vai retornar uma única nota do id especificado
    const tags = await knex("tags").where({ professional_id: id }).orderBy("name"); //pegando a tag onde o note_id vai ser igual ao id passado no parâmetro/rota - orderBy é pra colocar em ordem alfabética
    return response.json({ ...professional, tags }); // os '...' é para 'despejar' os detalhes de note
  }

  async delete(request, response) { //criando a funcionalidade de deletar
    const { id } = request.params;
    await knex("professionals").where({ id }).delete(); //tudo vai ser deletado em cascata, links, tags, pois essas tabelas tem relação com notes
    return response.json()
  }

  async index(request, response) { 
    const { name, specialization, tags } = request.query;
    let professionals;

    if (tags) { 
      const filterTags = tags.split(',').map(tag => tag.trim()); 
      
      professionals = await knex("professionals")
      .select([
        "professionals.id",
        "professionals.name",
        "professionals.description",
        "professionals.specialization",
        "professionals.avatar"
      ])
      .whereLike("professionals.name", `%${name}%`)
      .whereLike("professionals.specialization", `%${specialization}%`)
      .whereIn("tags.name", filterTags)
      .innerJoin("tags", "tags.professional_id", "professionals.id")
      
    } else {
      professionals = await knex("professionals").whereLike("name", `%${name}%`).whereLike("specialization", `%${specialization}%`).orderBy("name") 
    }

    const Tags = await knex("tags") 
    const ProfessionalsWithTags = professionals.map(professionals => { 
      const ProfessionalsTags = Tags.filter(tag => tag.professional_id === professionals.id) 
      return {
        ...professionals,
        tags: ProfessionalsTags
      }
    })

    return response.json(ProfessionalsWithTags)
  }
}
module.exports = ProfessionalsController;