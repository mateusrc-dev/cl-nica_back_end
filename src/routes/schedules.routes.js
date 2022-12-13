const { Router } = require("express")
const schedulesRoutes = Router()
const SchedulesController = require("../Controllers/SchedulesController")
const schedulesController = new SchedulesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")

schedulesRoutes.post("/", ensureAuthenticatedProfessional, schedulesController.create)
schedulesRoutes.put("/", ensureAuthenticated, schedulesController.update)
schedulesRoutes.put("/:status", ensureAuthenticated, schedulesController.updateConfirm)
schedulesRoutes.get("/", ensureAuthenticatedProfessional, schedulesController.index)
schedulesRoutes.get("/:id_professional", schedulesController.indexTwo)
schedulesRoutes.delete("/", schedulesController.delete)

module.exports = schedulesRoutes