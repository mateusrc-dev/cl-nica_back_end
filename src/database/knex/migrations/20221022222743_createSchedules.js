exports.up = knex => knex.schema.createTable("schedules", table => {
  table.increments("id")
  table.text("duration")
  table.text("time")
  table.text("availability")
  table.text("date")
  table.text("status")
  table.text("justification")
  table.integer("id_professional").references("id").inTable("professionals").onDelete("CASCADE")
  table.integer("id_user").references("id").inTable("users").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("schedules")