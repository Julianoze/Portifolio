const db = require('../../services/postgresql/')
const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs-extra')
const util = require('util')
let path = require('path')

router.get('/cadastrar', async (req, res, next) => {
    const { professor } = await db.professor().all()
    res.render('cadastrar', {professor: professor, conteudo: ""})
})

router.get('/cadastrar/:id', async (req, res, next) => {
    const { id } = req.params
    const { professor } = await db.professor().all()
    const { conteudo } = await db.conteudo().all('where idconteudo = ' + id)

    res.render('cadastrar', {professor: professor, conteudo: conteudo})
})

router.post('/cadastrar', async (req, res, next) => {
    try{

        var form = new formidable.IncomingForm()
        form.parse(req, async(err, fields, files) => {
            const {idconteudo, titulo, professor, conteudo} = fields
            if(files.upload.name != ""){
                const oldpath = files.upload.path
                let newpath = path.join(__dirname, '/../../server/public/style/img/'+professor+'/')
                newpath = newpath.replace(/\u005c/g, "/")
                const filename = files.upload.name
                const src = '/style/img/'+ professor+'/' + filename
                fs.copy(oldpath, newpath + filename, async (err) => { 
                    if (err) {
                        console.error(err)
                    } else {
                        if (idconteudo == '') {
                            await db.conteudo().save(titulo, conteudo, professor, src)
                        } else {
                            await db.conteudo().update(idconteudo, titulo, conteudo, professor, src)
                        }
                    }
                })
            } else {
                if (idconteudo == '') {
                    await db.conteudo().save(titulo, conteudo, professor, "")
                } else {
                    await db.conteudo().update(idconteudo, titulo, conteudo, professor, "")
                }
            }
        })
        
        res.redirect('/cadastrar')
    } catch(error) {
        console.error(error)
    }
})

module.exports = router