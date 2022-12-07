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
    const { availability, status, id } = request.body;
    const id_user = request.user.id;
    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE schedules SET 
    availability = ?,
    status = ?,
    id_user = ?
    WHERE id = ?`,
      [availability, status, id_user, id]
    );
    return response.json();
  }

  async updateTwo(request, response) {
    const { id } = request.params;
    const { status, justification } = request.body;

    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE schedules SET 
    status = ?,
    justification = ?
    WHERE id = ?`,
      [status, justification, id]
    );
    return response.json();
  }

  async index(request, response) {
    const id_professional = request.user.id;

    const schedules = await knex("schedules")
      .select([
        "schedules.id",
        "schedules.time",
        "schedules.duration",
        "schedules.availability",
        "schedules.date",
        "schedules.status",
        "users.name",
        "users.queixas",
        "users.avatar",
      ])
      .where({ id_professional })
      .innerJoin("users", "users.id", "schedules.id_user")
      .orderBy("schedules.date");

    return response.json({ schedules });
  }

  async indexTwo(request, response) {
    const { id_professional } = request.params;
    const { availability } = request.body;

    const schedules = await knex("schedules").where({ id_professional }).where({ availability }).orderBy("schedules.date");

    return response.json({ schedules });
  }

  async delete(request, response) {
    const { id } = request.body;
    await knex("schedules").where({ id }).delete();
    return response.json();
  }
}

module.exports = SchedulesController;