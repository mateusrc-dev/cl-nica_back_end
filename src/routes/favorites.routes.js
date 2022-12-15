const { Router } = require("express")
const FavoritesController = require("../Controllers/FavoritesController")
const favoritesController = new FavoritesController()
const favoritesRoutes = Router()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

favoritesRoutes.use(ensureAuthenticated)
favoritesRoutes.post("/", favoritesController.create)
favoritesRoutes.get("/", favoritesController.index)
favoritesRoutes.delete("/:professional_id", favoritesController.delete)
favoritesRoutes.get("/:professional_id", favoritesController.show)

module.exports = favoritesRoutes 