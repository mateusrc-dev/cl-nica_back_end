const knex = require("../database/knex")

class favoritesController {
  async create(request, response) {
    const { profissional_id } = request.body
    const user_id = request.user.id
    await knex("favorites").insert({ profissional_id, user_id })
    response.json()
  }

  async delete(request, response) {
    const { profissional_id } = request.body
    const user_id = request.user.id
    await knex("favorites").where({ profissional_id }).where({ user_id }).delete()
    return response.json()
  }

  async show(request, response) {
    const { profissional_id } = request.params
    const user_id = request.user.id
    const favorites = await knex("favorites").where({ profissional_id }).where({ user_id })
    return response.json({ favorites })
  }

  async index(request, response) {
    const user_id = request.user.id
    const favorites = await knex("favorites")
    .select(["profissionais.id", "profissionais.name", "profissionais.avatar", "profissionais.descrição", "profissionais.área"])
    .where({ user_id })
    .innerJoin("profissionais", "profissionais.id", "favorites.profissional_id").orderBy("profissionais.name")
    return response.json({ favorites })
  }
}

module.exports = favoritesController