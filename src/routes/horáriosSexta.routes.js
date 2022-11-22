const { Router } = require("express")
const horáriosSextaRoutes = Router()
const HoráriosSextaController = require("../Controllers/HoráriosSextaController")
const horáriosSextaController = new HoráriosSextaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSextaRoutes.post("/sexta", ensureAuthenticated, horáriosSextaController.create)
horáriosSextaRoutes.put("/sexta", ensureAuthenticated, horáriosSextaController.update)
horáriosSextaRoutes.get("/sexta", ensureAuthenticated, horáriosSextaController.index)
horáriosSextaRoutes.delete("/sexta", ensureAuthenticated, horáriosSextaController.delete)

module.exports = horáriosSextaRoutes