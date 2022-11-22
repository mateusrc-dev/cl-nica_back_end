const { Router } = require("express")
const horáriosSábadoRoutes = Router()
const HoráriosSábadoController = require("../Controllers/HoráriosSábadoController")
const horáriosSábadoController = new HoráriosSábadoController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSábadoRoutes.post("/", ensureAuthenticated, horáriosSábadoController.create)
horáriosSábadoRoutes.put("/", ensureAuthenticated, horáriosSábadoController.update)
horáriosSábadoRoutes.get("/", ensureAuthenticated, horáriosSábadoController.index)
horáriosSábadoRoutes.delete("/", ensureAuthenticated, horáriosSábadoController.delete)

module.exports = horáriosSábadoRoutes