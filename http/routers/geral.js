const router = require('express').Router()
const db = require('../../services/postgresql/')

router.get('/', async (req, res, next) => {
    res.render('index')
})

router.get('/jogo', async (req, res, next) => {
    res.render('jogo')
})

router.get('/listar', async (req, res, next) => {
    try{
        const { professor } = await db.professor().all()
        const { conteudo } = await db.conteudo().all('where eliminado = False')
        
        res.render('listar', { professor: professor, conteudos: conteudo })    
    } catch (error) {
        console.log(error)
    }
})
/* 
router.get('*', function(req, res){
    res.redirect('/');
});
 */
module.exports = router
