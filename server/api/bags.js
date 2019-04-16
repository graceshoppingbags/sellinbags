const router = require('express').Router()
const { Bags } = require('../db/models')
module.exports = router

router.get('/:style', async (req, res, next) => {
    console.log(req.params)
    try {
        const bags = await Bags.findAll({
            where: {
                style: req.params.style
            }
        })
        res.json(bags)
    } catch(error){
        next(error)
    }
})


router.get('/', async (req, res, next) => {   
    try {
        const bags = await Bags.findAll()
        res.json(bags)
    } catch(error) {
        next(error)
    }
})


