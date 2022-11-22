const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class ProfissionaisController {

  async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM profissionais WHERE email = (?)", [email])
    if (checkUserExists) {
      throw new AppError("Este E-mail está em uso!")
    }
    if (!name) {
      throw new AppError("Nome é obrigatório")
    }
    const hashedPassword = await hash(password, 8)
    await database.run("INSERT INTO profissionais (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()
  }

  async update(request, response) { //funcionalidade de atualização do usuário
    const { name, email, área, descrição, tags, password, old_password } = request.body //pegando o corpo da requisição
    const user_id = request.user.id; //acessando a propriedade que foi criada no middleware que contem o id do usuário que foi extraído do token
    //const { id } = request.params; //o id está sendo pego do caminho, pois ele foi colocado como parâmetro
    const database = await sqliteConnection() //fazendo conexão com o banco de dados
    const user = await database.get("SELECT * FROM profissionais WHERE id = (?)", [user_id]) //selecionando todos as colunas da linha que tem o respectivo id
    if (!user) { //caso o usuário não exista vai entrar nas chaves
      throw new AppError("Profissional não encontrado!")
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM profissionais WHERE email = (?)", [email]) //selecionando todas as colunas da linha que tem o respectivo email
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) { //verificando se a pessoa está tentando mudar um email pra outro que é usado por outra pessoa
      throw new AppError("Este e-mail já está em uso!")
    }

    const tagsInsert = tags.map(name => {
      return {
        profissional_id: user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    user.name = name ?? user.name //atualizando o nome do user que foi pego através do id - a interrogação significa que se não existir conteúdo dentro de name então vai ser utilizado o user.name - as interrogações é um null operator
    user.email = email ?? user.email //atualizando o email do user
    user.área = área ?? user.área
    user.descrição = descrição ?? user.descrição

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
    UPDATE profissionais SET 
    name = ?, 
    email = ?,
    password = ?, 
    área = ?,
    descrição = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user.área, user.descrição, user_id]); //aqui está sendo atualizado o banco de dados, são comandos SQL (UPDATE users SET) pra atualizar o banco de dados - WHERE é pra identificar a linha específica que será modificado o valor das colunas - DATETIME() é uma função do banco de dados que pega o momento atual (data e hora), estamos fazendo isso porque a função Date() do JS tem um padrão de escrever a data e hora diferente da função do banco de dados
    return response.json()
  }

  async show(request, response) {
    const {id} = request.params //vamos pegar o id que foi passado como um parâmetro para poder encontrar a nota do usuário
    const note = await knex("profissionais").where({id}).first(); //pegando a primeira nota com first, sempre vai retornar uma única nota do id especificado
    const tags = await knex("tags").where({profissional_id: id}).orderBy("name"); //pegando a tag onde o note_id vai ser igual ao id passado no parâmetro/rota - orderBy é pra colocar em ordem alfabética
    const links = await knex("links").where({note_id: id}).orderBy("created_at")
    return response.json({...note, tags, links}); // os '...' é para 'despejar' os detalhes de note
  }

  async delete(request, response) { //criando a funcionalidade de deletar
    const {id} = request.params;
    await knex("notes").where({id}).delete(); //tudo vai ser deletado em cascata, links, tags, pois essas tabelas tem relação com notes
    return response.json()
  }

  async index(request, response) { //criando funcionalidade que vai ser responsável por listar todos os notes de um usuário
    const {title, tags} = request.query;
    const user_id = request.user.id
    let notes;
    
    if (tags) { //se existir tags vai ocorrer a consulta esse chaves, se não vai ser realizada a consulta abaixo no else
      const filterTags = tags.split(',').map(tag => tag.trim()); //vamos dividir os elementos a partir da vírgula e cada elemento fará parte de um vetor/array - map pra pegar somente a tag (vai pegar cada tag do vetor) - função TRIM apara uma string removendo os espaços em branco iniciais e finais
      notes = await knex("tags").select(["notes.id", "notes.title", "notes.user_id"]).where("notes.user_id", user_id).whereLike("notes.title", `%${title}%`).whereIn("name", filterTags).innerJoin("notes", "notes.id", "tags.note_id").groupBy("notes.id").orderBy("notes.title") //analisar notes baseado na tag - vamos passar o "name" (nome da tag) e o vetor pra comparar se a tag existe ou não - no select vamos colocar um array com os campos que queremos selecionar de ambas as tabelas - também vamos filtrar baseado no id do usuário - innerJoin é pra conectar uma tabela com a outra, vamos colocar a tabela notes e os campos que vão ser conectados - groupBy é uma funcionalidade do banco de dados que permite fazer agrupamentos sem repetir os elementos (não vai repetir notes com o mesmo id)
    } else {
    notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title") //vai mostrar o notes de um usuário determinado - where é para filtrar - orderBy é pra deixar em ordem alfabética de acordo com o title - whereLike ajuda a buscar valores que contenham uma palavra determinada no meio de outras, a porcentagem antes e depois de title é porque vai ser ignorado o que vem antes e depois da palavra, vai ser procurado a palavra, ou uma cadeia de caracteres
    }

    const userTags = await knex("tags").where({user_id}) //fazendo filtro nas tags onde o id seja igual do user_id
    const notesWithTags = notes.map(note => { //percorrendo todas as notas e executando a função pra cada 'note' (variável auxiliar)
      const noteTags = userTags.filter(tag => tag.note_id === note.id) //filtrando as tags da nota - comparando se note_id da tag é igual ao note.id 
      return {
        ...note,
        tags: noteTags
      }
    }) 

    return response.json(notesWithTags) 
  }  
}
module.exports = ProfissionaisController;