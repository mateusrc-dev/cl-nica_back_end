const { Router } = require("express")
const horáriosTerçaRoutes = Router()
const HoráriosTerçaController = require("../Controllers/HoráriosTerçaController")
const horáriosTerçaController = new HoráriosTerçaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosTerçaRoutes.post("/terça", ensureAuthenticated, horáriosTerçaController.create)
horáriosTerçaRoutes.put("/terça", ensureAuthenticated, horáriosTerçaController.update)
horáriosTerçaRoutes.get("/terça", ensureAuthenticated, horáriosTerçaController.index)
horáriosTerçaRoutes.delete("/terça", ensureAuthenticated, horáriosTerçaController.delete)

module.exports = horáriosTerçaRoutes