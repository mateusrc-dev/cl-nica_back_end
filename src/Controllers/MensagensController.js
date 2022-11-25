const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class MensagensController {

  async create(request, response) {
    const { mensagem, user_id, profissional_id } = request.body
    const database = await sqliteConnection()
    await database.run("INSERT INTO mensagens (mensagem, profissional_id, user_id) VALUES (?, ?, ?)", [mensagem, profissional_id, user_id])

    return response.status(201).json()
  }

  async indexUser(request, response) {
    const { user_id } = request.body
    const mensagens = await knex("mensagens")
      .select(["mensagens.id", "profissionais.name", "profissionais.área"])
      .where({ user_id })
      .innerJoin("profissionais", "profissionais.id", "mensagens.profissional_id")

    return response.json({ mensagens })
  }

  /*async indexProf(request, response) {
    const { user_id } = request.params
    const { profissional_id } = request.params
    const mensagens = await knex("avaliações").where({ profissional_id }).where({ user_id })
    return response.json({ mensagens })
  }*/

  async show(request, response) {
    const { user_id } = request.query
    const { profissional_id } = request.query
    const mensagem = await knex("mensagens").where({ user_id }).where({ profissional_id }).first()
    return response.json({ mensagem })
  }

  async delete(request, response) {
    const { id } = request.body;
    await knex("mensagens").where({ id }).delete()
    return response.json()
  }
}
module.exports = MensagensController;