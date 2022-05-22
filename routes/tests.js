const {Router} = require('express')
const Test = require('../models/Test')
const router = Router()

router.get('/', async (req, res) => {
    const tests = await Test.find({})

    res.render('index', {
        title: 'Tests list',
        isIndex: true,
        tests
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create test',
        isCreate: true
    })
})

router.post('/create', async (request, response) => {
    const test = new Test({
        title: request.body.title
    })

    await test.save(function (e) {
        if(e) return console.log(e);
        console.log("Сохранен объект", test);
    })
    
    response.redirect('/')
})

module.exports = router