const knex = require("../database/knex")

class HoráriosSegundaControllerUser {

  async index(request, response) {
    const id_user = request.user.id;
    const horários = await knex("horáriosSegunda")
      .select(["horáriosSegunda.horário", "profissionais.name", "profissionais.avatar", "profissionais.área"])
      .where({ id_user })
      .innerJoin("profissionais", "profissionais.id", "horáriosSegunda.id_profissional").orderBy("horáriosSegunda.horário")

    //const horários = await knex("horáriosSegunda").where({ id_profissional })
    return response.json({ horários })
  }

}
module.exports = HoráriosSegundaControllerUser;