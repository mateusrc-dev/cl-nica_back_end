const {Router} = require("express");

const TagsController = require("../Controllers/TagsController")
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")
const tagsController = new TagsController()

const tagsRoutes = Router()

tagsRoutes.get("/", ensureAuthenticatedProfessional, tagsController.indexProfessional) 

module.exports = tagsRoutes;