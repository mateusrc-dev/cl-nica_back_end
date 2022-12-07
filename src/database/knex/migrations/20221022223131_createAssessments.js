exports.up = knex => knex.schema.createTable("assessments", table => {
  table.increments("id")
  table.integer("id_user").references("id").inTable("users")
  table.integer("id_professional").references("id").inTable("professionals")
  table.text("testimony")
  table.integer("note")
  table.timestamp("created_at").default(knex.fn.now()); 
  table.timestamp("update_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("assessments")