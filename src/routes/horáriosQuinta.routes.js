const { Router } = require("express")
const horáriosQuintaRoutes = Router()
const HoráriosQuintaController = require("../Controllers/HoráriosQuintaController")
const horáriosQuintaController = new HoráriosQuintaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuintaRoutes.post("/", ensureAuthenticated, horáriosQuintaController.create)
horáriosQuintaRoutes.put("/", ensureAuthenticated, horáriosQuintaController.update)
horáriosQuintaRoutes.get("/", ensureAuthenticated, horáriosQuintaController.index)
horáriosQuintaRoutes.delete("/", ensureAuthenticated, horáriosQuintaController.delete)

module.exports = horáriosQuintaRoutes