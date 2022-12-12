const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { specialization } = request.query;
    const tags = await knex("professionals")
      .select([
        "tags.name",
        "tags.professional_id",
        "tags.professional_specialization",
      ])
      .whereLike("tags.professional_specialization", `%${specialization}%`)
      .innerJoin("tags", "tags.professional_id", "professionals.id");
    return response.json(tags);
  }

  async indexProfessional(request, response) {
    const id = request.params.id;
    const tags = await knex("tags")
      .where({ professional_id: id })
      .groupBy("name");
    return response.json(tags);
  }
}

module.exports = TagsController;
