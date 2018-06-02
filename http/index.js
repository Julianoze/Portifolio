const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))

const geral = require('./routers/geral')

router.use('/', geral)


module.exports = router
