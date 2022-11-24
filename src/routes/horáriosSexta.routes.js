const { Router } = require("express")
const horáriosSextaRoutes = Router()
const HoráriosSextaController = require("../Controllers/HoráriosSextaController")
const horáriosSextaController = new HoráriosSextaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSextaRoutes.post("/", ensureAuthenticated, horáriosSextaController.create)
horáriosSextaRoutes.put("/", ensureAuthenticated, horáriosSextaController.update)
horáriosSextaRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosSextaController.updateTwo)
horáriosSextaRoutes.get("/:id_profissional", ensureAuthenticated, horáriosSextaController.index)
horáriosSextaRoutes.get("/", ensureAuthenticated, horáriosSextaController.show)
horáriosSextaRoutes.delete("/", ensureAuthenticated, horáriosSextaController.delete)

module.exports = horáriosSextaRoutes