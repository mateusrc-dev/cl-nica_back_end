const { Router } = require("express")
const horáriosTerçaRoutes = Router()
const HoráriosTerçaController = require("../Controllers/HoráriosTerçaController")
const horáriosTerçaController = new HoráriosTerçaController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosTerçaRoutes.post("/", ensureAuthenticated, horáriosTerçaController.create)
horáriosTerçaRoutes.put("/", ensureAuthenticated, horáriosTerçaController.update)
horáriosTerçaRoutes.put("/:time/:id_profissional", ensureAuthenticated, horáriosTerçaController.updateTwo)
horáriosTerçaRoutes.get("/:id_profissional", ensureAuthenticated, horáriosTerçaController.index)
horáriosTerçaRoutes.get("/", ensureAuthenticated, horáriosTerçaController.show)
horáriosTerçaRoutes.delete("/", ensureAuthenticated, horáriosTerçaController.delete)

module.exports = horáriosTerçaRoutes