exports.up = knex => knex.schema.createTable("mensagens", table => {
  table.increments("id")
  table.text("mensagem")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("profissional_id").references("id").inTable("profissionais").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("mensagens")