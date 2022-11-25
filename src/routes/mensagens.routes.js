const { Router } = require("express")
const mensagensRoutes = Router()
const MensagensController = require("../Controllers/MensagensController")
const mensagensController = new MensagensController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

mensagensRoutes.post("/", ensureAuthenticated, mensagensController.create)
mensagensRoutes.get("/", ensureAuthenticated, mensagensController.indexUser)
mensagensRoutes.get("/:profissional_id/:user_id", ensureAuthenticated, mensagensController.show)
mensagensRoutes.delete("/", ensureAuthenticated, mensagensController.delete)

module.exports = mensagensRoutes