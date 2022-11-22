const { Router } = require("express")
const avaliaçõesRoutes = Router()
const AvaliaçõesController = require("../Controllers/AvaliaçõesController")
const avaliaçõesController = new AvaliaçõesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

avaliaçõesRoutes.post("/", ensureAuthenticated, avaliaçõesController.create)
avaliaçõesRoutes.put("/", ensureAuthenticated, avaliaçõesController.update)
avaliaçõesRoutes.get("/", ensureAuthenticated, avaliaçõesController.show)
avaliaçõesRoutes.get("/:id", ensureAuthenticated, avaliaçõesController.index)
avaliaçõesRoutes.delete("/", ensureAuthenticated, avaliaçõesController.delete)

module.exports = avaliaçõesRoutes
