/* const sha1 = require('sha1') */
const { Pool } = require('pg')
const config = require('../config')
const jwt = require('jsonwebtoken')

const autenticacao = deps => {
  return {
    all: (login, senha) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('SELECT * FROM usuario WHERE loginusuario = $1 AND senhaescola = $2 AND Eliminado = False', [login, senha], (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error || result.rowCount === 0) {
            errorHandler(error, 'Usuario não localizado', reject)
            return false
          }
          
          // Prepara o retorno
          let retorno = result.rows
          let idescola = retorno[0].idescola
          let data = new Date()
          data = data.getTime()
          // Assina o token
          const token = jwt.sign({idescola, data}, process.env.JWT_SECRET)
          
          // Após dar sucesso retorna os dados
          resolve({token: token})

          // Fecha conexão
          pool.end()
        })
      })
    }
  }
}

module.exports = autenticacao
