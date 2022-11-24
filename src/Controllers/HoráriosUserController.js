const knex = require("../database/knex")

class HoráriosUserController {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horários")
      .select(["horários.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horários.id_profissional").orderBy("horários.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HoráriosUserController;