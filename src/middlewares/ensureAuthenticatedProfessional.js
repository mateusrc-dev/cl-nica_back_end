const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticatedProfessional(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: professional_id } = verify(token, authConfig.jwt.secret)
    request.professional = {
      id: Number(professional_id)
    }
    return next()
  } catch {
    throw new AppError("JWT inválido", 401)
  }
}

module.exports = ensureAuthenticatedProfessional