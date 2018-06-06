const router = require('express').Router()
const db = require('../../services/postgresql/')

router.get('/login', async (req, res, next) => {
    res.render('login', {error: ''})
    console.log(error)
})

router.post('/login', async (req, res, next) => {
    try {
        const { senha } = req.body
        await db.autenticacao().all(senha)

        res.redirect('/listar')
    } catch (error) {
        console.error(error)
        res.render('login', {error: error})        
    }
}) 

module.exports = router
