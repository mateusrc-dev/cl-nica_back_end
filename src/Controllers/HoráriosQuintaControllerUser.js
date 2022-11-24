const knex = require("../database/knex")

class HorárioQuintaControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosQuinta")
      .select(["horáriosQuinta.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosQuinta.id_profissional").orderBy("horáriosQuinta.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HorárioQuintaControllerUser;