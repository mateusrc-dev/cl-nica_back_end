const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class HoráriosTerçaController {

  async create(request, response) {
    const { horário, disponibilidade } = request.body
    const user_id = request.user.id;
    const database = await sqliteConnection()
    await database.run("INSERT INTO horáriosQuinta (horário, disponibilidade, id_profissional) VALUES (?, ?, ?)", [horário, disponibilidade, {id_profissional: user_id}])

    return response.status(201).json()
  }

  async update(request, response) { //funcionalidade de atualização do usuário
    const { disponibilidade, id } = request.body //pegando o corpo da requisição
    const database = await sqliteConnection() //fazendo conexão com o banco de dados
    const horário = await database.get("SELECT * FROM horáriosQuinta WHERE id = (?)", [id]) //selecionando todos as colunas da linha que tem o respectivo id
    horário.disponibilidade = disponibilidade ?? horário.disponibilidade //atualizando o nome do user que foi pego através do id - a interrogação significa que se não existir conteúdo dentro de name então vai ser utilizado o user.name - as interrogações é um null operator

    await database.run(`
    UPDATE horáriosQuinta SET 
    disponibilidade = ?, 
    update_at = DATETIME('now')
    WHERE id = ?`,
      [ horário.disponibilidade, id]); //aqui está sendo atualizado o banco de dados, são comandos SQL (UPDATE users SET) pra atualizar o banco de dados - WHERE é pra identificar a linha específica que será modificado o valor das colunas - DATETIME() é uma função do banco de dados que pega o momento atual (data e hora), estamos fazendo isso porque a função Date() do JS tem um padrão de escrever a data e hora diferente da função do banco de dados
    return response.json()
  }

  async index(request, response) {
    const user_id = request.user.id;
    const horários = await knex("horáriosQuinta").where({ user_id }).first()
    return response.json({ horários })
  }

  async delete(request, response) {
    const { id } = request.body 
    await knex("horáriosQuinta").where({ id }).delete()
    return response.json()
  }
}
module.exports = HoráriosTerçaController;