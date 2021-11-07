const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {dinoData, dinoData})
})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// PUT ROUTE (GET UPDATE FORM)
router.get('/edit/:idx', (req, res) => {
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

// UPDATE A DINO
router.put('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // re-assign the name in type fields of the dino to be edited
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    // save the edited dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

// SHOW ROUTE
router.get('/:idx', (req, res) => {
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url param
    let dinoIndex = req.params.idx
    // console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST A NEW DINO ROUTE
router.post('/', (req, res) => {
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to dinoData
    dinoData.push(req.body)

    // save updated dinoData to JSON
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to GET /dinosaurs (index page)
    res.redirect('/dinosaurs')

    console.log('this is req.body\n',req.body)
})

// DELETE ROUTE
router.delete('/:idx', (req, res) => {
    // get array index from url param
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosaur array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})


module.exports = router