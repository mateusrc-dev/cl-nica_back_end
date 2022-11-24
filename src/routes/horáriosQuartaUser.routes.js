const { Router } = require("express")
const horáriosQuartaRoutes = Router()
const HoráriosQuartaControllerUser = require("../Controllers/HoráriosQuartaControllerUser")
const horáriosQuartaControllerUser = new HoráriosQuartaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuartaRoutes.get("/", ensureAuthenticated, horáriosQuartaControllerUser.index)

module.exports = horáriosQuartaRoutes