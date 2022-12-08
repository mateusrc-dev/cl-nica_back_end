const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const usersRoutes = Router()
const UsersController = require("../Controllers/UsersController")
const AvatarUsersController = require("../Controllers/AvatarUsersController")
const usersController = new UsersController()
const avatarUsersController = new AvatarUsersController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), avatarUsersController.update)

module.exports = usersRoutes