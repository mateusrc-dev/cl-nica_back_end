const knex = require("../database/knex")

class favoritesController {
  async create(request, response) {
    const { id } = request.body
    const user_id = request.user.id
    //const { user_id } = request.params
    await knex("favorites").insert({ profissional_id: id, user_id })
    response.json()
  }

  async delete(request, response) {
    const { id } = request.params
    const user_id = request.user.id
    await knex("favorites").where({ profissional_id: id }).where({ user_id }).delete()
    return response.json()
  }
  async show(request, response) {
    const { id } = request.params
    const user_id = request.user.id
    const favorites = await knex("favorites").where({ profissional_id: id }).where({ user_id })
    return response.json({ favorites })
  }
  async index(request, response) {
    //const { user_id } = request.query
    const user_id = request.user.id
    const favoritesDesserts = await knex("favorites").where({ user_id }).select(["profissionais.id", "profissionais.nome", "profissionais.avatar", "profissionais.descrição"]).innerJoin("profissionais", "profissionais.id", "favorites.profissional_id").orderBy("profissionais.nome")
    return response.json({ favoritesDesserts })
  }
}

module.exports = favoritesController