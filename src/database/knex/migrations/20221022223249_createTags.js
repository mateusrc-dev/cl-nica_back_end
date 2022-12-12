exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.integer("professional_id").references("id").inTable("professionals").onDelete("CASCADE")
  table.integer("professional_specialization").references("id").inTable("professionals").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("tags")