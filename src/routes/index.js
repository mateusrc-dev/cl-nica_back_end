const { Router } = require("express");
const usersRouter = require("./users.routes");
const professionalsRouter = require("./professionals.routes");
const professionalsSpecializationRouter = require("./professionalsSpecialization.routes");
const assessmentsRouter = require("./assessments.routes");
const assessmentsUserRouter = require("./assessmentsUser.routes");
const schedulesRouter = require("./schedules.routes");
const schedulesCancelRouter = require("./schedulesCancel.routes");
const schedulesUserRouter = require("./schedulesUser.routes");
const schedulesProfessionalsRouter = require("./schedulesProfessionals.routes");
const favoritesRouter = require("./favorites.routes");
const sessionsRouter = require("./sessions.routes");
const sessionsProfessionalsRouter = require("./sessionsProfessionals.routes");
const searchRouter = require("./search.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/professionals", professionalsRouter);
routes.use("/professionalsSpecialization", professionalsSpecializationRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/sessionsprofessionals", sessionsProfessionalsRouter);
routes.use("/search", searchRouter);
routes.use("/assessments", assessmentsRouter);
routes.use("/assessmentsUser", assessmentsUserRouter);
routes.use("/schedules", schedulesRouter);
routes.use("/schedulesCancel", schedulesCancelRouter);
routes.use("/schedulesUser", schedulesUserRouter);
routes.use("/schedulesProfessionals", schedulesProfessionalsRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;
