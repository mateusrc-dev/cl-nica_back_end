const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class AvaliaçõesController {

  async create(request, response) {
    const { depoimento, nota, id_profissional } = request.body
    const id_user = request.user.id;
    await knex("avaliações").insert({ id_user, id_profissional, depoimento, nota })

    return response.status(201).json()
  }

  async update(request, response) {
    const { depoimento, nota, id } = request.body

    const database = await sqliteConnection()

    const avali = await knex("avaliações").where({ id })

    avali.depoimento = depoimento ?? avali.depoimento

    avali.nota = nota ?? avali.nota

    await database.run(`
    UPDATE avaliações SET 
    depoimento = ?, 
    nota = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [avali.depoimento, avali.nota, id]);
    return response.json()
  }

  async index(request, response) {
    const { id_profissional } = request.body
    
    const depoimento = await knex("avaliações")
    .select(["users.id", "users.name", "users.avatar", "avaliações.depoimento", "avaliações.nota"])
    .where({ id_profissional })
    .innerJoin("users", "users.id", "avaliações.id_user").orderBy("users.name")

    //const depoimento = await knex("avaliações").where({ id_profissional })
    return response.json({ depoimento })
  }

  async show(request, response) {
    const id_user = request.user.id;
    const { id_profissional } = request.params
    
    const depoimento = await knex("avaliações")
    .select(["users.id", "users.name", "users.avatar", "avaliações.depoimento", "avaliações.nota"])
    .where({ id_profissional })
    .where({ id_user })
    .innerJoin("users", "users.id", "avaliações.id_user").orderBy("users.name")

    //const depoimento = await knex("avaliações").where({ id_profissional }).where({ id_user }).first()
    return response.json({ depoimento })
  }

  async delete(request, response) {
    const { id } = request.body
    await knex("avaliações").where({ id }).delete()
    return response.json()
  }
}

module.exports = AvaliaçõesController;