const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const professionalsRoutes = Router()
const ProfessionalsController = require("../Controllers/ProfessionalsController")
const professionalsController = new ProfessionalsController()
const AvatarProfessionalsController = require("../Controllers/AvatarProfessionalsController")
const avatarProfessionalsController = new AvatarProfessionalsController()
const ensureAuthenticatedProfessional = require("../middlewares/ensureAuthenticatedProfessional")
const upload = multer(uploadConfig.MULTER)

professionalsRoutes.post("/", professionalsController.create)
professionalsRoutes.put("/", ensureAuthenticatedProfessional, professionalsController.update)
professionalsRoutes.get("/:id", professionalsController.show)
professionalsRoutes.get("/", professionalsController.index)
professionalsRoutes.delete("/:id", professionalsController.delete)
professionalsRoutes.patch("/avatar", ensureAuthenticatedProfessional, upload.single("avatar"), avatarProfessionalsController.update)

module.exports = professionalsRoutes