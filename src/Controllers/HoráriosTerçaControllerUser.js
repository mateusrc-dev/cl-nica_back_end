const knex = require("../database/knex")

class HoráriosTerçaControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosTerça")
      .select(["horáriosTerça.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosTerça.id_profissional").orderBy("horáriosTerça.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HoráriosTerçaControllerUser;