exports.up = knex => knex.schema.createTable("mensagens", table => {
  table.increments("id")
  table.text("mensagem")
  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("mensagens")