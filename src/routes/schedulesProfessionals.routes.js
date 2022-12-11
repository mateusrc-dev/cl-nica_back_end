const { Router } = require("express")
const schedulesProfessionalsRoutes = Router()
const SchedulesProfessionalController = require("../Controllers/SchedulesProfessionalController")
const schedulesProfessionalController = new SchedulesProfessionalController()
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")

schedulesProfessionalsRoutes.get("/:id_professional", ensureAuthenticatedProfessional, schedulesProfessionalController.index)
schedulesProfessionalsRoutes.get("/", ensureAuthenticatedProfessional, schedulesProfessionalController.show)
schedulesProfessionalsRoutes.delete("/", ensureAuthenticatedProfessional, schedulesProfessionalController.delete)


module.exports = schedulesProfessionalsRoutes