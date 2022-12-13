const { Router } = require("express")
const schedulesCancelRoutes = Router()
const SchedulesControllerCancel = require("../Controllers/SchedulesControllerCancel")
const schedulesControllerCancel = new SchedulesControllerCancel()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")

schedulesCancelRoutes.put("/:id", schedulesControllerCancel.update)

module.exports = schedulesCancelRoutes