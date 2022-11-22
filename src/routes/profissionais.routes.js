const { Router } = require("express")
const profissionaisRoutes = Router()
const ProfissionaisController = require("../Controllers/ProfissionaisController")
const profissionaisController = new ProfissionaisController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

profissionaisRoutes.post("/", profissionaisController.create)
profissionaisRoutes.put("/", ensureAuthenticated, profissionaisController.update)

module.exports = profissionaisRoutes
