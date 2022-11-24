const { Router } = require("express")
const horáriosTerçaUserRoutes = Router()
const HoráriosTerçaControllerUser = require("../Controllers/HoráriosTerçaControllerUser")
const horáriosTerçaControllerUser = new HoráriosTerçaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosTerçaUserRoutes.get("/", ensureAuthenticated, horáriosTerçaControllerUser.index)

module.exports = horáriosTerçaUserRoutes