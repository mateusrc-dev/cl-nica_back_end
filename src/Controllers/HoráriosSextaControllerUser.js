const knex = require("../database/knex")

class HorárioSextaControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosSexta")
      .select(["horáriosSexta.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosSexta.id_profissional").orderBy("horáriosSexta.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HorárioSextaControllerUser;