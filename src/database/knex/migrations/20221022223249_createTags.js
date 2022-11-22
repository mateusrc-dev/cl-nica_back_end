exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.integer("profissional_id").references("id").inTable("profissionais").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("tags")
