const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({ error: msg })
}

const conteudoModule = require('./modules/conteudo')({ errorHandler })
const professorModule = require('./modules/professor')({ errorHandler })
const autenticacaoModule = require('./modules/autenticacao')({ errorHandler })

module.exports = {
  autenticacao: () => autenticacaoModule,
  professor: () => professorModule,
  conteudo: () => conteudoModule,
}
