const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class AssessmentsUserController {

  async update(request, response) {
    const { testimony, note, id } = request.body

    const database = await sqliteConnection()

    const assess = await knex("assessments").where({ id })

    assess.testimony = testimony ?? assess.testimony

    assess.note = note ?? assess.note

    await database.run(`
    UPDATE assessments SET 
    testimony = ?, 
    note = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [assess.testimony, assess.note, id]);
    return response.json()
  }

  async index(request, response) {
    const id_user = request.user.id;
    
    const testimony = await knex("assessments")
    .select(["professionals.id", "professionals.name", "professionals.avatar", "professionals.specialization", "assessments.testimony", "assessments.note"])
    .where({ id_user })
    .innerJoin("professionals", "professionals.id", "assessments.id_professional").orderBy("professionals.name")

    //const testimony = await knex("assessments").where({ id_professional })
    return response.json({ testimony })
  }

  async delete(request, response) {
    const { id } = request.body
    await knex("assessments").where({ id }).delete()
    return response.json()
  }
}

module.exports = AssessmentsUserController;