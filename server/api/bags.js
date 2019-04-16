const router = require('express').Router()
const { Bags } = require('../db/models')
module.exports = router

console.log("BAGS ROUTES")
router.get('/', async (req, res, next) => {
    
    try {
        const bags = await Bags.findAll()
        res.json(bags)
    } catch(error) {
        next(error)
    }
})


router.get('/')