const { Router } = require("express")
const professionalsRoutes = Router()
const ProfessionalsController = require("../Controllers/ProfessionalsController")
const professionalsController = new ProfessionalsController()
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")

professionalsRoutes.post("/", professionalsController.create)
professionalsRoutes.put("/", ensureAuthenticatedProfessional, professionalsController.update)
professionalsRoutes.get("/:id", professionalsController.show)
professionalsRoutes.get("/", professionalsController.index)
professionalsRoutes.delete("/:id", professionalsController.delete)

module.exports = professionalsRoutes
