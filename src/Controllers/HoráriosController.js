const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class HoráriosController {

  async create(request, response) {
    const { horário, disponibilidade, id_user, semana, dia_da_semana, status } = request.body
    const id_profissional = request.user.id;
    const database = await sqliteConnection()
    await database.run("INSERT INTO horários (horário, disponibilidade, id_profissional, id_user, semana, dia_da_semana, status) VALUES (?, ?, ?, ?, ?, ?, ?)", [horário, disponibilidade, id_profissional, id_user, semana, dia_da_semana, status])

    return response.status(201).json()
  }

  async update(request, response) {
    const { disponibilidade, status, id } = request.body
    const id_user = request.user.id;
    const database = await sqliteConnection()

    await database.run(`
    UPDATE horários SET 
    disponibilidade = ?,
    status = ?,
    id_user = ?
    WHERE id = ?`,
      [disponibilidade, status, id_user, id]);
    return response.json()
  }

  async updateTwo(request, response) {
    const { time, id_profissional } = request.params

    const database = await sqliteConnection()

    await database.run(`
    UPDATE horários SET 
    duração = ?
    WHERE id_profissional = ?`,
      [time, id_profissional]);
    return response.json()
  }

  async updateThree(request, response) {
    const { id } = request.params
    const { status } = request.body

    const database = await sqliteConnection()

    await database.run(`
    UPDATE horários SET 
    status = ?
    WHERE id = ?`,
      [status, id]);
    return response.json()
  }

  async index(request, response) {
    const { id_profissional } = request.params;
    const { dia_da_semana, semana } = request.body

    const horários = await knex("horários")
      .select(["horários.id", "horários.horário", "horários.disponibilidade", "users.name", "users.queixas", "users.avatar"])
      .where({ id_profissional })
      .where({ dia_da_semana })
      .where({semana})
      .innerJoin("users", "users.id", "horários.id_user").orderBy("horários.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

  async show(request, response) {
    const { horário, dia_da_semana, semana } = request.body
    const horários = await knex("horários")
      .select(["horários.id", "horários.horário", "horários.disponibilidade", "users.name", "users.queixas", "users.avatar"])
      .where({ horário })
      .where({ dia_da_semana })
      .where({semana})
      .innerJoin("users", "users.id", "horários.id_user")

    //const horários = await knex("horáriosSegunda").where({ user_id }).first()
    return response.json({ horários })
  }

  async delete(request, response) {
    const { id } = request.body
    await knex("horários").where({ id }).delete()
    return response.json()
  }
}
module.exports = HoráriosController;