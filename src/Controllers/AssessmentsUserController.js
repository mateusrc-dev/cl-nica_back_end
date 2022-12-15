const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class AssessmentsUserController {

  async update(request, response) {
    const { testimony, id } = request.query

    const database = await sqliteConnection()

    const assess = await knex("assessments").where({ id })

    assess.testimony = testimony ?? assess.testimony

    await database.run(`
    UPDATE assessments SET 
    testimony = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [assess.testimony, id]);
    return response.json()
  }

  async updateTwo(request, response) {
    const { id } = request.params
    const { note } = request.query
  
    const database = await sqliteConnection()

    const assess = await knex("assessments").where({ id })

    assess.note = note ?? assess.note

    await database.run(`
    UPDATE assessments SET 
    note = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [ assess.note, id]);
    return response.json()
  }


  async index(request, response) {
    const id_user = request.user.id;
    
    const testimony = await knex("assessments")
    .select(["professionals.name", "professionals.avatar", "assessments.id", "professionals.specialization", "assessments.testimony", "assessments.note"])
    .where({ id_user })
    .innerJoin("professionals", "professionals.id", "assessments.id_professional").orderBy("professionals.name")

    return response.json({ testimony })
  }

  async delete(request, response) {
    const { id } = request.query
    await knex("assessments").where({ id }).delete()
    return response.json()
  }
}

module.exports = AssessmentsUserController;