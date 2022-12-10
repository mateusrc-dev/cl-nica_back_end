const knex = require("../database/knex")

class favoritesController {
  async create(request, response) {
    const { professional_id } = request.body
    const user_id = request.user.id
    await knex("favorites").insert({ professional_id, user_id })
    response.json()
  }

  async delete(request, response) {
    const { professional_id } = request.body
    const user_id = request.user.id
    await knex("favorites").where({ professional_id }).where({ user_id }).delete()
    return response.json()
  }

  async show(request, response) {
    const { professional_id } = request.params
    const user_id = request.user.id
    const favorites = await knex("favorites").where({ professional_id }).where({ user_id })
    return response.json({ favorites })
  }

  async index(request, response) {
    const user_id = request.user.id
    const favorites = await knex("favorites")
    .select(["professionals.id", "professionals.name", "professionals.avatar", "professionals.description", "professionals.specialization"])
    .where({ user_id })
    .innerJoin("professionals", "professionals.id", "favorites.professional_id").orderBy("professionals.name")
    return response.json({ favorites })
  }
}

module.exports = favoritesController