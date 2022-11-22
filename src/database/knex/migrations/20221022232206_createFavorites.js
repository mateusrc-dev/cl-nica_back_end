exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("profissional_id").references("id").inTable("profissionais").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("favorites")