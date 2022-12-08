const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class AvatarProfessionalsController {
  async update(request, response) {
    const professional_id = request.professional.id;
    const avatarFileName = request.file.filename;
    const diskStorage = new DiskStorage();
    const professional = await knex("professionals").where({ id: professional_id }).first();
    if (!professional) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar!",
        401
      );
    }
    if (professional.avatar) {
      await diskStorage.deleteFile(professional.avatar);
    }
    const fileName = await diskStorage.saveFile(avatarFileName);
    professional.avatar = fileName;
    await knex("professionals").update(professional).where({ id: professional_id });
    return response.json(professional)
  }
}
module.exports = AvatarProfessionalsController;