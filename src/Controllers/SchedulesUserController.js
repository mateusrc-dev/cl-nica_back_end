const knex = require("../database/knex")

class SchedulesUserController {

  async index(request, response) {
    const id_user = request.user.id;
    const schedules = await knex("schedules")
      .select(["schedules.date", "schedules.time", "schedules.duration", "schedules.id", "professionals.name", "schedules.status", "schedules.justification", "professionals.avatar", "professionals.specialization"])
      .where({ id_user })
      .innerJoin("professionals", "professionals.id", "schedules.id_professional").orderBy("schedules.date")

    return response.json({ schedules })
  }

}
module.exports = SchedulesUserController;