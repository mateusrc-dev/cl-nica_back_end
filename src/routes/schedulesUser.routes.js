const { Router } = require("express")
const schedulesUserRoutes = Router()
const SchedulesUserController = require("../Controllers/SchedulesUserController")
const schedulesUserController = new SchedulesUserController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

schedulesUserRoutes.get("/", ensureAuthenticated, schedulesUserController.index)

module.exports = schedulesUserRoutes