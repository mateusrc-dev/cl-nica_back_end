const { Router } = require("express")
const assessmentsUserRoutes = Router()
const AssessmentsUserController = require("../Controllers/AssessmentsUserController")
const assessmentsUserController = new AssessmentsUserController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

assessmentsUserRoutes.put("/", ensureAuthenticated, assessmentsUserController.update)
assessmentsUserRoutes.put("/:id", assessmentsUserController.updateTwo)
assessmentsUserRoutes.get("/", ensureAuthenticated, assessmentsUserController.index)
assessmentsUserRoutes.delete("/", ensureAuthenticated, assessmentsUserController.delete)

module.exports = assessmentsUserRoutes
