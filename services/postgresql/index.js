const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({ error: msg })
}

const escolaModule = require('./modules/escola')({ errorHandler })
const atividadeModule = require('./modules/atividade')({ errorHandler })
const autenticacaoModule = require('./modules/autenticacao')({ errorHandler })

module.exports = {
  autenticacao: () => autenticacaoModule,
}
