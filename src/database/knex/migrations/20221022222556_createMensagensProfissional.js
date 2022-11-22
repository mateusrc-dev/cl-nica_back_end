exports.up = knex => knex.schema.createTable("mensagensProfissional", table => {
  table.increments("id")
  table.integer("id_mensagem").references("id").inTable("mensagens")
  table.integer("id_profissional").references("id").inTable("profissionais")
  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("mensagensProfissional")