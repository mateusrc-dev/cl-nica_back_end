const knex = require("../database/knex");

class TagsController {
  async indexProfessional(request, response) {
    const professional_id = request.professional.id; 
    const tags = await knex("tags").where({ professional_id }).groupBy("name"); 
    return response.json(tags);
  }
}

module.exports = TagsController;