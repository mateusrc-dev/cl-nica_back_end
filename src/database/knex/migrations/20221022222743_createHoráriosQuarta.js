exports.up = knex => knex.schema.createTable("horáriosQuarta", table => {
  table.increments("id")
  table.text("duração")
  table.text("horário")
  table.text("disponibilidade")
  table.integer("id_profissional").references("id").inTable("profissionais").onDelete("CASCADE")
  table.integer("id_user").references("id").inTable("users").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("horáriosQuarta")
