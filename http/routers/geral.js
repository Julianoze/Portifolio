const router = require('express').Router()
const db = require('../../services/postgresql/')

router.get('/', async (req, res, next) => {
    res.render('index')
})

router.get('/jogo', async (req, res, next) => {
    res.render('jogo')
})

router.get('/listar', async (req, res, next) => {
    res.render('listar')
})

router.get('/cadastrar', async (req, res, next) => {
    res.render('cadastrar')
})

module.exports = router
