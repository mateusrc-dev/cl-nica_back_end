const { Router } = require("express")
const horáriosSegundaRoutes = Router()
const HoráriosSegundaController = require("../Controllers/HoráriosSegundaController")
const horáriosSegundaController = new HoráriosSegundaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSegundaRoutes.post("/", ensureAuthenticated, horáriosSegundaController.create)
horáriosSegundaRoutes.put("/", ensureAuthenticated, horáriosSegundaController.update)
horáriosSegundaRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosSegundaController.updateTwo)
horáriosSegundaRoutes.get("/:id_profissional", ensureAuthenticated, horáriosSegundaController.index)
horáriosSegundaRoutes.get("/", ensureAuthenticated, horáriosSegundaController.show)
horáriosSegundaRoutes.delete("/", ensureAuthenticated, horáriosSegundaController.delete)

module.exports = horáriosSegundaRoutes