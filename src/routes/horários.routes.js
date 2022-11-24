const { Router } = require("express")
const horáriosRoutes = Router()
const HoráriosController = require("../Controllers/HoráriosController")
const horáriosController = new HoráriosController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosRoutes.post("/", ensureAuthenticated, horáriosController.create)
horáriosRoutes.put("/", ensureAuthenticated, horáriosController.update)
horáriosRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosController.updateTwo)
horáriosRoutes.put("/:id", ensureAuthenticated, horáriosController.updateThree)
horáriosRoutes.get("/:id_profissional", ensureAuthenticated, horáriosController.index)
horáriosRoutes.get("/", ensureAuthenticated, horáriosController.show)
horáriosRoutes.delete("/", ensureAuthenticated, horáriosController.delete)

module.exports = horáriosRoutes