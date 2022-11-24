const { Router } = require("express")
const horáriosSábadoUserRoutes = Router()
const HoráriosSábadoControllerUser = require("../Controllers/HoráriosSábadoControllerUser")
const horáriosSábadoControllerUser = new HoráriosSábadoControllerUser()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

horáriosSábadoUserRoutes.get("/", ensureAuthenticated, horáriosSábadoControllerUser.index)

module.exports = horáriosSábadoUserRoutes