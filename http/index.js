const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))

const geral = require('./routers/geral')
const login = require('./routers/login')
const cadastrar = require('./routers/cadastrar')
const eliminar = require('./routers/eliminar')

router.use('/', geral)
router.use('/', login)
router.use('/', cadastrar)
router.use('/', eliminar)

module.exports = router
