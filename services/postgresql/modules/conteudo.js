const { Pool } = require('pg')
const config = require('../config')

const escola = deps => {
  return {
    all: (condicao) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('SELECT * FROM portifolio.conteudo ' + condicao , (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao listar conteúdo', reject)
            return false
          }
        
          // Se der sucesso retorna os dados
          resolve({ conteudo: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    save: (titulo, conteudo, professor, src) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('INSERT INTO portifolio.conteudo(titulo, conteudo, idprofessor, src) VALUES ($1, $2, $3, $4);', [titulo, conteudo, professor, src], (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao cadastrar conteúdo', reject)
            return false
          }
        
          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    update: (idconteudo, titulo, conteudo, professor, src) => {
      return new Promise((resolve, reject) => {

        // Linha 61, tratamento de erro padrão
        // Linha 62, Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('UPDATE portifolio.conteudo SET titulo=$2, conteudo=$3, idprofessor=$4, src = $5  WHERE idconteudo=$1;', [idconteudo, titulo, conteudo, professor, src], (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao atualizar conteúdo', reject)
            return false
          }

          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rowsCount })

          // Fecha conexão
          pool.end()
        })
      })
    },
    del: (idconteudo) => {
      return new Promise((resolve, reject) => {

        // Linha 86, tratamento de erro padrão
        // Linha 87, Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('UPDATE portifolio.conteudo SET eliminado = True WHERE idconteudo=$1;', [idconteudo], (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao eliminar conteúdo', reject)
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

module.exports = escola
