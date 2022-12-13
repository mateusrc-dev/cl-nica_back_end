const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class AssessmentsController {

  async create(request, response) {
    const { testimony, note, id_professional } = request.query
    const id_user = request.user.id;
    await knex("assessments").insert({ id_user, id_professional, testimony, note })

    return response.status(201).json()
  }

  async update(request, response) {
    const { testimony, id_user } = request.query

    const database = await sqliteConnection()

    const assess = await knex("assessments").where({ id_user })

    assess.testimony = testimony ?? assess.testimony

    await database.run(`
    UPDATE assessments SET 
    testimony = ?, 
    update_at = DATETIME('now')
    WHERE id_user = ?`,
      [assess.testimony, id_user]);
    return response.json()
  }

  async updateTwo(request, response) {
    const { id_user } = request.params
    const { note } = request.query
  
    const database = await sqliteConnection()

    const assess = await knex("assessments").where({ id_user })

    assess.note = note ?? assess.note

    await database.run(`
    UPDATE assessments SET 
    note = ?,
    update_at = DATETIME('now')
    WHERE id_user = ?`,
      [ assess.note, id_user]);
    return response.json()
  }

  async index(request, response) {
    const { id_professional } = request.query
    
    const testimony = await knex("assessments")
    .select(["users.id", "users.name", "users.avatar", "assessments.testimony", "assessments.note"])
    .where({ id_professional })
    .innerJoin("users", "users.id", "assessments.id_user").orderBy("users.name")

    //const testimony = await knex("assessments").where({ id_professional })
    return response.json({ testimony })
  }

  async show(request, response) {
    const id_user = request.user.id;
    const { id_professional } = request.params
    
    const testimony = await knex("assessments")
    .select(["users.id", "users.name", "users.avatar", "assessments.testimony", "assessments.note"])
    .where({ id_professional })
    .where({ id_user })
    .innerJoin("users", "users.id", "assessments.id_user").orderBy("users.name")

    return response.json({ testimony })
  }

  async delete(request, response) {
    const { id_user } = request.query
    await knex("assessments").where({ id_user }).delete()
    return response.json()
  }
}

module.exports = AssessmentsController;