const router = require('express').Router()
const { Cart, CartProduct } = require('../db/models')
module.exports = router


router.get('/:id', async (req, res, next) => {
    try {
        const cart = await CartProduct.findAll({where: {userId: req.params.id}})
        res.json(cart)
    } catch (error) {
        next(error)
    }
})


router.post('/:id', async (req, res, next) => {
    try{
        const itemAdded = await CartProduct.create({userId: req.params.id, bagId: req.body.bagId})
        res.json(itemAdded)
    } catch(error) {
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