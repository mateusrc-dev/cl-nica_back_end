const { Router } = require("express")
const SessionsProfessionalsController = require("../Controllers/SessionsProfessionalsController")
const sessionsProfessionalsController = new SessionsProfessionalsController()
const sessionsProfessionalsRoutes = Router()

sessionsProfessionalsRoutes.post("/", sessionsProfessionalsController.create)

module.exports = sessionsProfessionalsRoutes