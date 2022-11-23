const { Router } = require("express")
const avaliaçõesRoutes = Router()
const AvaliaçõesController = require("../Controllers/AvaliaçõesController")
const avaliaçõesController = new AvaliaçõesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

avaliaçõesRoutes.post("/", ensureAuthenticated, avaliaçõesController.create)
avaliaçõesRoutes.put("/", ensureAuthenticated, avaliaçõesController.update)
avaliaçõesRoutes.get("/:id_profissional", ensureAuthenticated, avaliaçõesController.show)
avaliaçõesRoutes.get("/", ensureAuthenticated, avaliaçõesController.index)
avaliaçõesRoutes.delete("/", ensureAuthenticated, avaliaçõesController.delete)

module.exports = avaliaçõesRoutes
