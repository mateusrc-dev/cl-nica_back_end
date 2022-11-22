const { Router } = require("express")
const horáriosSegundaRoutes = Router()
const HoráriosSegundaController = require("../Controllers/HoráriosSegundaController")
const horáriosSegundaController = new HoráriosSegundaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSegundaRoutes.post("/segunda", ensureAuthenticated, horáriosSegundaController.create)
horáriosSegundaRoutes.put("/segunda", ensureAuthenticated, horáriosSegundaController.update)
horáriosSegundaRoutes.get("/segunda", ensureAuthenticated, horáriosSegundaController.index)
horáriosSegundaRoutes.delete("/segunda", ensureAuthenticated, horáriosSegundaController.delete)

module.exports = horáriosSegundaRoutes