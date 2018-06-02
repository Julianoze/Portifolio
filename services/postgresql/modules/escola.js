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
        pool.query('SELECT * FROM escola ' + condicao, (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao listar Escola', reject)
            return false
          }
        
          // Se der sucesso retorna os dados
          resolve({ escola: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    save: (razaosocial, nomefantasia, endereco, bairro, cidade, uf, cep, telefone, cnpj, ie) => {
      return new Promise((resolve, reject) => {

        // Tratamento de erro padrão
        // Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('INSERT INTO escola(razaosocial, nomefantasia, endereco, bairro, cidade, uf, cep, telefone, cnpj, ie)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning * ', [razaosocial, nomefantasia, endereco, bairro, cidade, uf, cep, telefone, cnpj, ie], (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao cadastrar Escola', reject)
            return false
          }
        
          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rows })

          // Fecha conexão
          pool.end()
        })
      })
    },
    update: (idescola, razaosocial, nomefantasia, endereco, bairro, cidade, uf, cep, telefone, cnpj, ie) => {
      return new Promise((resolve, reject) => {

        // Linha 61, tratamento de erro padrão
        // Linha 62, Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('UPDATE escola SET razaosocial=$2, nomefantasia=$3, endereco=$4, bairro=$5, cidade=$6, uf=$7, cep=$8, telefone=$9, cnpj=$10, ie=$11 WHERE idescola=$1;', [idescola, razaosocial, nomefantasia, endereco, bairro, cidade, uf, cep, telefone, cnpj, ie], (error, result) => {

          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao atualizar Escola', reject)
            return false
          }

          // Se der sucesso retorna os dados
          resolve({ affectedRows: result.rowsCount })

          // Fecha conexão
          pool.end()
        })
      })
    },
    del: (idescola) => {
      return new Promise((resolve, reject) => {

        // Linha 86, tratamento de erro padrão
        // Linha 87, Inicia a conexão
        const { errorHandler } = deps
        const pool = new Pool(config())

        // Executa a Query
        pool.query('DELETE FROM escola WHERE idescola = $1;', [idescola], (error, result) => {
        
          // Se apresentar erro rejeita a promise
          if (error) {
            errorHandler(error, 'Falha ao deletar Escola', reject)
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
