const { Router } = require("express")
const assessmentsRoutes = Router()
const AssessmentsController = require("../Controllers/AssessmentsController")
const assessmentsController = new AssessmentsController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

assessmentsRoutes.post("/", ensureAuthenticated, assessmentsController.create)
assessmentsRoutes.put("/", ensureAuthenticated, assessmentsController.update)
assessmentsRoutes.get("/:id_professional", ensureAuthenticated, assessmentsController.show)
assessmentsRoutes.get("/", ensureAuthenticated, assessmentsController.index)
assessmentsRoutes.delete("/", ensureAuthenticated, assessmentsController.delete)

module.exports = assessmentsRoutes
