const router = require('express').Router()
const { Cart, CartProduct, Bags } = require('../db/models')
module.exports = router


router.get('/:id', async (req, res, next) => {
    try {
        const cart = await CartProduct.findAll({where: {userId: req.params.id}, include: [ Bags ]}).map(item => item.bag)
        res.json(cart)
    } catch (error) {
        next(error)
    }
})


router.post('/sync/:id', async (req, res, next) => {
    try{
        const createdArr = req.body
        createdArr.map(bag => bag.userId = req.params.id)
        console.log(createdArr)
        const itemAdded = await CartProduct.bulkCreate(createdArr)
        res.json(itemAdded)
    } catch(error) {
        next(error)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        const itemCreated = await CartProduct.create({userId: req.params.id, bagId: req.body.id})
        res.json(itemCreated)
    } catch(error){
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const bagsToDelete = await CartProduct.destroy({where: {
            userId: req.params.id
        }})
        res.json(bagsToDelete)
    } catch(error){
        next(error)
    }
})


router.delete('/', async (req, res, next) => {
    try{
        const bagDeleted = await CartProduct.findByPk(req.body.id)
        bagDeleted.destroy()
        res.json(bagDeleted)
    } catch(error){
        next(error)
    }
})