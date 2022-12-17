const { Router } = require("express");
const professionalsSpecializationRoutes = Router();
const ProfessionalsSpecializationController = require("../Controllers/ProfessionalsSpecializationController");
const professionalsSpecializationController =
  new ProfessionalsSpecializationController();

professionalsSpecializationRoutes.get(
  "/",
  professionalsSpecializationController.show
);

module.exports = professionalsSpecializationRoutes;
