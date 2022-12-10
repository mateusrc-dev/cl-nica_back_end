const knex = require("../database/knex");

class SchedulesUserController {
  async index(request, response) {
    const { id_professional } = request.params;
    const schedules = await knex("schedules")
      .where({ id_professional })
      .orderBy("schedules.date");

    return response.json({
      schedules,
    });
  }

  async show(request, response) {
    const { date, time } = request.query;
    const schedules = await knex("schedules")
      .select([
        "schedules.time",
        "schedules.duration",
        "schedules.availability",
        "schedules.date",
        "schedules.status",
        "users.name",
        "users.queixas",
        "users.avatar",
      ])
      .where({ date })
      .where({ time })
      .innerJoin("users", "users.id", "schedules.id_user")
      .orderBy("schedules.date");

    return response.json({ schedules });
  }
}
module.exports = SchedulesUserController;
