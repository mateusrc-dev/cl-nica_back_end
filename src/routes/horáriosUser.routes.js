const { Router } = require("express")
const horáriosUserRoutes = Router()
const HoráriosUserController = require("../Controllers/HoráriosUserController")
const horáriosUserController = new HoráriosUserController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosUserRoutes.get("/", ensureAuthenticated, horáriosUserController.index)

module.exports = horáriosUserRoutes