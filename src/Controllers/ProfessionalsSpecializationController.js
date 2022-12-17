const knex = require("../database/knex");

class ProfessionalsSpecializationController {
  async show(request, response) {
    const { specialization } = request.query;
    const professional = await knex("professionals")
      .where({ specialization })
      .first();
    return response.json({ professional });
  }
}
module.exports = ProfessionalsSpecializationController;
