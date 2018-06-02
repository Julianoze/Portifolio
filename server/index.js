// IMPORTS DOS ARQUIVOS PRINCIPAIS

// CRIA O SERVIDOR
const express = require('express')
const app = express()

// MIDDLEWARE E CORS
const jwtMiddleware = require('./jwtMiddleware')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')

// VIEW
const ejs_layout = require('express-ejs-layouts')

// ROUTER
const router = require('../http')

// CONFIGURAÇÕES DO SERVIDOR

// CONFIGURAÇÃO DE RENDERIZAÇÃO
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(ejs_layout)

//CONFIGURAÇÕES DE ROTAS

//ROTA ESTÁTICA PARA JS, CSS E IMAGENS
app.use(express.static(__dirname + '/public'))
//ROTAS PARA ACESSO COM O MIDDLEWARE JÁ INFORMADO
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}))
app.use('/', [jwtMiddleware], router)

// CORS E MIDLEWARE
app.use(cors())
app.use(cookieParser())

module.exports = app
