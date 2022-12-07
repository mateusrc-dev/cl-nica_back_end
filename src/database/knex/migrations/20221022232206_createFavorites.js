exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("professional_id").references("id").inTable("professionals").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("favorites")