const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const tags = await knex("tags").groupBy("name"); 
    return response.json(tags);
  }

  async indexProfessional(request, response) {
    const id = request.params.id; 
    const tags = await knex("tags").where({ professional_id: id }).groupBy("name"); 
    return response.json(tags);
  }
}

module.exports = TagsController;