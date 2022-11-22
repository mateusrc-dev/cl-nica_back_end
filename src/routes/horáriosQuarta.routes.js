const { Router } = require("express")
const horáriosQuartaRoutes = Router()
const HoráriosQuartaController = require("../Controllers/HoráriosQuartaController")
const horáriosQuartaController = new HoráriosQuartaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuartaRoutes.post("/quarta", ensureAuthenticated, horáriosQuartaController.create)
horáriosQuartaRoutes.put("/quarta", ensureAuthenticated, horáriosQuartaController.update)
horáriosQuartaRoutes.get("/quarta", ensureAuthenticated, horáriosQuartaController.index)
horáriosQuartaRoutes.delete("/quarta", ensureAuthenticated, horáriosQuartaController.delete)

module.exports = horáriosQuartaRoutes