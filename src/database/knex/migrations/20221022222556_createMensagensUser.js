exports.up = knex => knex.schema.createTable("mensagensUser", table => {
  table.increments("id")
  table.integer("id_mensagem").references("id").inTable("mensagens")
  table.integer("id_usuário").references("id").inTable("users")
  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("mensagensUser")