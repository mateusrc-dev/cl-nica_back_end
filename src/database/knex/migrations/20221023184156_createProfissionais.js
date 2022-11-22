exports.up = knex => knex.schema.createTable("profissionais", table => {
  table.increments("id")
  table.text("nome")
  table.text("email")
  table.text("área")
  table.text("descrição")
  table.text("avatar")
  table.text("tags")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("update_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("profissionais")