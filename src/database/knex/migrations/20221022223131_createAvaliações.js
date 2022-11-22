exports.up = knex => knex.schema.createTable("avaliações", table => {
  table.increments("id")
  table.integer("id_user").references("id").inTable("users")
  table.integer("id_profissional").references("id").inTable("profissionais")
  table.text("depoimento")
  table.integer("nota")
  table.timestamp("created_at").default(knex.fn.now()); 
  table.timestamp("update_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("avaliações")