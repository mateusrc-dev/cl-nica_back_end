const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcrypt")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsProfessionalsController {
  async create(request, response) {
    const { email, password } = request.body
    const professional = await knex("professionals").where({ email }).first()
    if (!professional) {
      throw new AppError("E-mail e/ou senha incorreta!", 401)
    }
    const passwordMatched = await compare(password, professional.password)
    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta!", 401)
    }
    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, { subject: String(professional.id), expiresIn })
    return response.json({ professional, token })
  }
}

module.exports = SessionsProfessionalsController
