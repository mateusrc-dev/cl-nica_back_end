const { Router } = require("express")
const horáriosSábadoRoutes = Router()
const HoráriosSábadoController = require("../Controllers/HoráriosSábadoController")
const horáriosSábadoController = new HoráriosSábadoController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSábadoRoutes.post("/", ensureAuthenticated, horáriosSábadoController.create)
horáriosSábadoRoutes.put("/", ensureAuthenticated, horáriosSábadoController.update)
horáriosSábadoRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosSábadoController.updateTwo)
horáriosSábadoRoutes.get("/:id_profissional", ensureAuthenticated, horáriosSábadoController.index)
horáriosSábadoRoutes.get("/", ensureAuthenticated, horáriosSábadoController.show)
horáriosSábadoRoutes.delete("/", ensureAuthenticated, horáriosSábadoController.delete)


module.exports = horáriosSábadoRoutes