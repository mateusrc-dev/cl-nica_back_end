const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class HoráriosTerçaController {

  async create(request, response) {
    const { horário, disponibilidade, id_user } = request.body
    const id_profissional = request.user.id;
    const database = await sqliteConnection()
    await database.run("INSERT INTO horáriosTerça (horário, disponibilidade, id_profissional, id_user) VALUES (?, ?, ?, ?)", [horário, disponibilidade, id_profissional, id_user])

    return response.status(201).json()
  }

  async update(request, response) {
    const { disponibilidade, id } = request.body
    const id_user = request.user.id;
    const database = await sqliteConnection()

    await database.run(`
    UPDATE horáriosTerça SET 
    disponibilidade = ?,
    id_user = ?
    WHERE id = ?`,
      [disponibilidade, id_user, id]);
    return response.json()
  }

  async updateTwo(request, response) {
    const { time, id_profissional } = request.params

    const database = await sqliteConnection()

    await database.run(`
    UPDATE horáriosTerça SET 
    duração = ?
    WHERE id_profissional = ?`,
      [time, id_profissional]);
    return response.json()
  }


  async index(request, response) {
    const { id_profissional } = request.params;

    const horários = await knex("horáriosTerça")
    .select(["horáriosTerça.id", "horáriosTerça.horário", "horáriosTerça.disponibilidade", "users.name", "users.queixas", "users.avatar"])
    .where({ id_profissional })
    .innerJoin("users", "users.id", "horáriosTerça.id_user").orderBy("horáriosTerça.horário")
    
    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

  async show(request, response) {
    const { horário } = request.body
    const horários = await knex("horáriosTerça")
    .select(["horáriosTerça.id", "horáriosTerça.horário", "horáriosTerça.disponibilidade", "users.name", "users.queixas", "users.avatar"])
    .where({ horário })
    .innerJoin("users", "users.id", "horáriosTerça.id_user")

    //const horários = await knex("horáriosSegunda").where({ user_id }).first()
    return response.json({ horários })
  }

  async delete(request, response) {
    const { id } = request.body
    await knex("horáriosTerça").where({ id }).delete()
    return response.json()
  }
}
module.exports = HoráriosTerçaController;