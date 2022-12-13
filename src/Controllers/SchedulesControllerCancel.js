const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class SchedulesController {
  async update(request, response) {
    const { id } = request.params;
    const { status, justification } = request.query;

    const database = await sqliteConnection();

    await database.run(
      `
    UPDATE schedules SET 
    status = ?,
    justification = ?
    WHERE id = ?`,
      [status, justification, id]
    );
    return response.json();
  }
}

module.exports = SchedulesController;