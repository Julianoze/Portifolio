const router = require('express').Router()
const db = require('../../services/postgresql/')

router.get('/eliminar/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        await db.conteudo().del(id)

        res.redirect('/listar')
    } catch(error) {
        console.error(error)
    }
})

module.exports = router
