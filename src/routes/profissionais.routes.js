const { Router } = require("express")
const profissionaisRoutes = Router()
const ProfissionaisController = require("../Controllers/ProfissionaisController")
const profissionaisController = new ProfissionaisController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

profissionaisRoutes.post("/", profissionaisController.create)
profissionaisRoutes.put("/", ensureAuthenticated, profissionaisController.update)
profissionaisRoutes.get("/:id", ensureAuthenticated, profissionaisController.show)
profissionaisRoutes.get("/", profissionaisController.index)
profissionaisRoutes.delete("/:id", ensureAuthenticated, profissionaisController.delete)

module.exports = profissionaisRoutes
