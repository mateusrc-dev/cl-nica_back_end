const { Router } = require("express")
const horáriosQuartaUserRoutes = Router()
const HoráriosQuartaControllerUser = require("../Controllers/HoráriosQuartaControllerUser")
const horáriosQuartaControllerUser = new HoráriosQuartaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuartaUserRoutes.get("/", ensureAuthenticated, horáriosQuartaControllerUser.index)

module.exports = horáriosQuartaUserRoutes