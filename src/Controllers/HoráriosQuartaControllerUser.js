const knex = require("../database/knex")

class HoráriosQuartaControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosQuarta")
      .select(["horáriosQuarta.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosQuarta.id_profissional").orderBy("horáriosQuarta.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HoráriosQuartaControllerUser;