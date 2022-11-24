const { Router } = require("express")
const horáriosSextaUserRoutes = Router()
const HoráriosSextaControllerUser = require("../Controllers/HoráriosSextaControllerUser")
const horáriosSextaControllerUser = new HoráriosSextaControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSextaUserRoutes.get("/", ensureAuthenticated, horáriosSextaControllerUser.index)

module.exports = horáriosSextaUserRoutes