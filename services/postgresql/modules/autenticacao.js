/* const sha1 = require('sha1') */
const { Pool } = require('pg')
const config = require('../config')
const jwt = require('jsonwebtoken')
const sha1 = require('sha1')

const autenticacao = deps => {
  return {
    all: (senha) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('SELECT * FROM portifolio.usuario WHERE senha = $1', [sha1(senha)], (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error || result.rowCount === 0) {
            errorHandler(error, 'Usuario não localizado', reject)
            return false
          }
          // Prepara o retorno
          let data = new Date()
          data = data.getTime()
          // Assina o token
          const token = jwt.sign({ data }, process.env.JWT_SECRET)
          
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
