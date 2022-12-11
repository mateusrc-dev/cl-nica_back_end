const {Router} = require("express");

const TagsController = require("../Controllers/TagsController")
const tagsController = new TagsController()

const tagsRoutes = Router()

tagsRoutes.get("/:id", tagsController.indexProfessional) 
tagsRoutes.get("/", tagsController.index) 

module.exports = tagsRoutes;