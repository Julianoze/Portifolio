const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
  // Configuração de rotas a serem ignoradas
  const exclusions = ['/']
  // Se a req.url estiver no array acima, ignora e renderiza
  if (exclusions.includes(req.url)) {
    // Pega o token, que é atribuido na autenticacao
    let token = req.session.token
    // Verifica se o token não é nulo
    if (!token) {
      res.status(403)
      res.render('index')
      return false
    }
    // Tenta decodificar o token, em caso de erro, redireciona para a login
    try {
      // Separa O JWT do nome da variavel
      token = (token.substring(token.indexOf('=') + 1, token.length))
      // decodifica
      jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      res.status(401)
      res.render('index')
    }
  } else {
    next()
  }
}

module.exports = jwtMiddleware
