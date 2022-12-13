const knex = require("../database/knex");

class SchedulesProfessionalController {
  async index(request, response) {
    const { id_professional } = request.params;
    const schedules = await knex("schedules")
    .select([
      "schedules.id",
      "schedules.time",
      "schedules.duration",
      "schedules.availability",
      "schedules.date",
      "schedules.status",
      "schedules.justification",
      "users.name",
      "users.queixas",
      "users.avatar",
    ])
    .where({ id_professional })
    .innerJoin("users", "users.id", "schedules.id_user")
    .orderBy("schedules.date");

    return response.json({
      schedules,
    });
  }

  async show(request, response) {
    const { date, time } = request.query;
    const id_professional = request.professional.id;
    const schedules = await knex("schedules")
      .select([
        "schedules.id",
        "schedules.time",
        "schedules.duration",
        "schedules.availability",
        "schedules.date",
        "schedules.status",
        "schedules.justification",
        "users.name",
        "users.queixas",
        "users.avatar",
      ])
      .where({ date })
      .where({ time })
      .where({ id_professional })
      .innerJoin("users", "users.id", "schedules.id_user")
      .orderBy("schedules.date");

    return response.json({ schedules });
  }

  async delete(request, response) {
    const { date, time } = request.query;
    const id_professional = request.professional.id;
    await knex("schedules").where({ date }).where({ time }).where({ id_professional }).delete();
    return response.json();
  }
}

module.exports = SchedulesProfessionalController;
