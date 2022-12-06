const { Router } = require("express")
const professionalsRoutes = Router()
const ProfessionalsController = require("../Controllers/ProfessionalsController")
const professionalsController = new ProfessionalsController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

professionalsRoutes.post("/", professionalsController.create)
professionalsRoutes.put("/", ensureAuthenticated, professionalsController.update)
professionalsRoutes.get("/:id", ensureAuthenticated, professionalsController.show)
professionalsRoutes.get("/", professionalsController.index)
professionalsRoutes.delete("/:id", ensureAuthenticated, professionalsController.delete)

module.exports = professionalsRoutes
