const { Router } = require("express")
const horáriosSegundaUserRoutes = Router()
const HoráriosSegundaControllerUser = require("../Controllers/HoráriosSegundaControllerUser")
const horáriosSegundaControllerUser = new HoráriosSegundaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSegundaUserRoutes.get("/", ensureAuthenticated, horáriosSegundaControllerUser.index)

module.exports = horáriosSegundaUserRoutes