const { Router } = require("express")
const schedulesRoutes = Router()
const SchedulesController = require("../Controllers/SchedulesController")
const schedulesController = new SchedulesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

schedulesRoutes.post("/", ensureAuthenticated, schedulesController.create)
schedulesRoutes.put("/", ensureAuthenticated, schedulesController.update)
schedulesRoutes.put("/:id", ensureAuthenticated, schedulesController.updateTwo)
schedulesRoutes.get("/", ensureAuthenticated, schedulesController.index)
schedulesRoutes.get("/:id_professional", ensureAuthenticated, schedulesController.indexTwo)
schedulesRoutes.delete("/", ensureAuthenticated, schedulesController.delete)

module.exports = schedulesRoutes