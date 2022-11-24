const knex = require("../database/knex")

class HoráriosSábadoControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosSábado")
      .select(["horáriosSábado.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosSábado.id_profissional").orderBy("horáriosSábado.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HoráriosSábadoControllerUser;