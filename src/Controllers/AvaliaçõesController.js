const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class AvaliaçõesController {

  async create(request, response) {
    const { depoimento, nota } = request.body
    const user_id = request.user.id;
    const { id } = request.params
    const database = await sqliteConnection()
    await database.run("INSERT INTO avaliações (user_id, profissional_id, depoimento, nota) VALUES (?, ?, ?)", [user_id, {profissional_id : id}, depoimento, nota])

    return response.status(201).json()
  }

  async update(request, response) { //funcionalidade de atualização do usuário
    const { depoimento, nota } = request.body //pegando o corpo da requisição
    const user_id = request.user.id; //acessando a propriedade que foi criada no middleware que contem o id do usuário que foi extraído do token
    //const { id } = request.params; //o id está sendo pego do caminho, pois ele foi colocado como parâmetro
    const database = await sqliteConnection() //fazendo conexão com o banco de dados
    const avali = await database.get("SELECT * FROM avaliações WHERE id = (?)", [user_id]) //selecionando todos as colunas da linha que tem o respectivo id
    avali.depoimento = depoimento ?? avali.depoimento //atualizando o nome do user que foi pego através do id - a interrogação significa que se não existir conteúdo dentro de name então vai ser utilizado o user.name - as interrogações é um null operator
    avali.nota = nota ?? avali.nota //atualizando o email do user

    await database.run(`
    UPDATE avaliações SET 
    depoimento = ?, 
    nota = ?,
    update_at = DATETIME('now')
    WHERE user_id = ?`,
      [avali.depoimento, avali.nota, user_id]); //aqui está sendo atualizado o banco de dados, são comandos SQL (UPDATE users SET) pra atualizar o banco de dados - WHERE é pra identificar a linha específica que será modificado o valor das colunas - DATETIME() é uma função do banco de dados que pega o momento atual (data e hora), estamos fazendo isso porque a função Date() do JS tem um padrão de escrever a data e hora diferente da função do banco de dados
    return response.json()
  }

  async index(request, response) {
    const { id } = request.params
    const { depoimento, nota } = await knex("avaliações").where({profissional_id: id}).orderBy("nota")
    return response.json({ depoimento, nota })
  }

  async show(request, response) {
    const user_id = request.user.id;
    const { depoimento, nota} = await knex("avaliações").where({ user_id }).first()
    return response.json({ depoimento, nota })
  }
  async delete(request, response) {
    const user_id = request.user.id;
    await knex("avaliações").where({ user_id }).delete()
    return response.json()
  }
}
module.exports = AvaliaçõesController;