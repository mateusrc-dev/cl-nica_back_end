const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class SchedulesController {
  async create(request, response) {
    const { time, availability, date, duration } = request.body;
    const id_professional = request.user.id;
    const database = await sqliteConnection();
    await database.run(
      "INSERT INTO schedules (time, availability, id_professional, date, duration) VALUES (?, ?, ?, ?, ?)",
      [time, availability, id_professional, date, duration]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { availability, justification, status, id } = request.body;
    const id_user = request.user.id;
    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE schedules SET 
    availability = ?,
    status = ?,
    justification = ?,
    id_user = ?
    WHERE id = ?`,
      [availability, status, justification, id_user, id]
    );
    return response.json();
  }

  async updateTwo(request, response) {
    const { id } = request.params;
    const { status, justification, availability } = request.body;
    let id_user = request.user.id;
    id_user = null

    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE schedules SET 
    status = ?,
    justification = ?,
    availability = ?,
    id_user = ?
    WHERE id = ?`,
      [status, justification, availability, id_user, id]
    );
    return response.json();
  }

  async updateThree(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE horários SET 
    status = ?
    WHERE id = ?`,
      [status, id]
    );
    return response.json();
  }

  async index(request, response) {
    const { id_profissional } = request.params;
    const { dia_da_semana, semana } = request.body;

    const horários = await knex("horários")
      .select([
        "horários.id",
        "horários.horário",
        "horários.disponibilidade",
        "users.name",
        "users.queixas",
        "users.avatar",
      ])
      .where({ id_profissional })
      .where({ dia_da_semana })
      .where({ semana })
      .innerJoin("users", "users.id", "horários.id_user")
      .orderBy("horários.horário");

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários });
  }

  async show(request, response) {
    const { horário, dia_da_semana, semana } = request.body;
    const horários = await knex("horários")
      .select([
        "horários.id",
        "horários.horário",
        "horários.disponibilidade",
        "users.name",
        "users.queixas",
        "users.avatar",
      ])
      .where({ horário })
      .where({ dia_da_semana })
      .where({ semana })
      .innerJoin("users", "users.id", "horários.id_user");

    //const horários = await knex("horáriosSegunda").where({ user_id }).first()
    return response.json({ horários });
  }

  async delete(request, response) {
    const { id } = request.body;
    await knex("horários").where({ id }).delete();
    return response.json();
  }
}
module.exports = SchedulesController;
