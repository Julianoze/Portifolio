const { Pool } = require('pg')
const config = require('../config')

const atividade = deps => {
  return {
    all: (condicao) => {
      return new Promise((resolve, reject) => {
        
        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('SELECT idatividade, idsubmateria, nomeatividade, enderecoatividade, descricaoatividade FROM atividade '+ condicao, (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao listar Atividades', reject)
            return false
          }

          // Se der sucesso retorna os dados
          resolve({ atividade: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    save: (idsubmateria, nomeatividade, enderecoatividade, descricaoatividade) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('INSERT INTO atividade(idsubmateria, nomeatividade, enderecoatividade, descricaoatividade, eliminado) VALUES ($1, $2, $3, $4, False);', [idsubmateria, nomeatividade, enderecoatividade, descricaoatividade], (error, result) => {
          
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao cadastrar Atividades', reject)
            return false
          }
          
          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    update: (idatividade, idsubmateria, nomeatividade, enderecoatividade, descricaoatividade) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('UPDATE atividade SET idsubmateria=$2, nomeatividade=$3, enderecoatividade=$4, descricaoatividade=$5 WHERE idatividade=$1;', [idatividade, idsubmateria, nomeatividade, enderecoatividade, descricaoatividade], (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao atualizar Atividades', reject)
            return false
          }
        
          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rowsCount })

          // Fecha conexão
          pool.end()
        })
      })
    },
    del: (idatividade) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('UPDATE atividade SET Eliminado = True WHERE idatividade = $1;', [idatividade], (error, result) => {
          
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao deletar Atividades', reject)
            return false
          }
          
          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rowCount })

          // Fecha conexão
          pool.end()
        })
      })
    }
  }
}

module.exports = atividade
