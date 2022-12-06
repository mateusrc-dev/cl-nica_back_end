exports.up = knex => knex.schema.createTable("professionals", table => {
  table.increments("id")
  table.text("name")
  table.text("email")
  table.text("specialization")
  table.text("description")
  table.text("avatar")
  table.text("password")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("update_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("professionals")