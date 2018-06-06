const { Pool } = require('pg')
const config = require('../config')

const atividade = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        
        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('SELECT * FROM portifolio.professor order by nomeprofessor', (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao listar Professor', reject)
            return false
          }

          // Se der sucesso retorna os dados
          resolve({ professor: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    }
  }
}

module.exports = atividade
