const { Router } = require("express")
const horáriosQuintaRoutes = Router()
const HoráriosQuintaController = require("../Controllers/HoráriosQuintaController")
const horáriosQuintaController = new HoráriosQuintaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuintaRoutes.post("/", ensureAuthenticated, horáriosQuintaController.create)
horáriosQuintaRoutes.put("/", ensureAuthenticated, horáriosQuintaController.update)
horáriosQuintaRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosQuintaController.updateTwo)
horáriosQuintaRoutes.get("/:id_profissional", ensureAuthenticated, horáriosQuintaController.index)
horáriosQuintaRoutes.get("/", ensureAuthenticated, horáriosQuintaController.show)
horáriosQuintaRoutes.delete("/", ensureAuthenticated, horáriosQuintaController.delete)

module.exports = horáriosQuintaRoutes