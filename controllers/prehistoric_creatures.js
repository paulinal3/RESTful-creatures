const express = require('express')
const router = express.Router()
const fs = require('fs')

// PREHISTORIC INDEX ROUTE
router.get('/', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)
    // console.log(oldDinoData)
    let typeFilter = req.query.typeFilter
    if (typeFilter) {
        oldDinoData = oldDinoData.filter((oldDino) => {
            return oldDino.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }
    res.render('prehistoric_creatures/index.ejs', {oldDinoData: oldDinoData})
})

// PREHISTORIC NEW ROUTE
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// PREHISTORIC PUT ROUTE (EDIT)
router.get('/edit/:idx', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    res.render('prehistoric_creatures/edit.ejs', {oldDinoId: req.params.idx, oldDino: oldDinoData[req.params.idx]})
})

// UPDATE A PREHISTORIC DINO
router.put('/:idx', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    oldDinoData[req.params.idx].type = req.body.type
    oldDinoData[req.params.idx].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric_creatures.jsonn', JSON.stringify(oldDinoData))
    res.redirect('/prehistoric_creatures')
})

// PREHISTORIC SHOW ROUTE
router.get('/:idx', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    let oldDinoIndex = req.params.idx
    res.render('prehistoric_creatures/show.ejs', {myOldDino: oldDinoData[oldDinoIndex]})
})

// POST A NEW PREHISTORIC ROUTE
router.post('/', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    oldDinoData.push(req.body)
    console.log('this is oldDinoData\n', oldDinoData)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(oldDinoData))

    res.redirect('/prehistoric_creatures')
})

// PREHISTORIC DELETE ROUTE
router.delete('/:idx', (req, res) => {
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    oldDinoData.splice(req.params.idx, 1)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(oldDinoData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router