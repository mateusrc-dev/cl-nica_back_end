const { Router } = require("express")
const schedulesRoutes = Router()
const SchedulesController = require("../Controllers/SchedulesController")
const schedulesController = new SchedulesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

schedulesRoutes.post("/", ensureAuthenticated, schedulesController.create)
schedulesRoutes.put("/", ensureAuthenticated, schedulesController.update)
schedulesRoutes.put("/:id", ensureAuthenticated, schedulesController.updateTwo)
schedulesRoutes.put("/:id", ensureAuthenticated, schedulesController.updateThree)
schedulesRoutes.get("/:id_profissional", ensureAuthenticated, schedulesController.index)
schedulesRoutes.get("/", ensureAuthenticated, schedulesController.show)
schedulesRoutes.delete("/", ensureAuthenticated, schedulesController.delete)

module.exports = schedulesRoutes