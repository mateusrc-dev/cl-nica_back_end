const { Router } = require("express")
const horáriosQuintaUserRoutes = Router()
const HoráriosQuintaControllerUser = require("../Controllers/HoráriosQuintaControllerUser")
const horáriosQuintaControllerUser = new HoráriosQuintaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosQuintaUserRoutes.get("/", ensureAuthenticated, horáriosQuintaControllerUser.index)

module.exports = horáriosQuintaUserRoutes