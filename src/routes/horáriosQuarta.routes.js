const { Router } = require("express")
const horáriosQuartaRoutes = Router()
const HoráriosQuartaController = require("../Controllers/HoráriosQuartaController")
const horáriosQuartaController = new HoráriosQuartaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuartaRoutes.post("/", ensureAuthenticated, horáriosQuartaController.create)
horáriosQuartaRoutes.put("/", ensureAuthenticated, horáriosQuartaController.update)
horáriosQuartaRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosQuartaController.updateTwo)
horáriosQuartaRoutes.get("/:id_profissional", ensureAuthenticated, horáriosQuartaController.index)
horáriosQuartaRoutes.get("/", ensureAuthenticated, horáriosQuartaController.show)
horáriosQuartaRoutes.delete("/", ensureAuthenticated, horáriosQuartaController.delete)

module.exports = horáriosQuartaRoutes