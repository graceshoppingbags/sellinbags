const router = require('express').Router()
const { Bags } = require('../db/models')
module.exports = router


// eslint-disable-next-line complexity
router.get('/page/:pageLimit/:pageIndex', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags/page/:pageLimit/:pageIndex -> req.params`, req.params)
    try {
        let pageLimit = undefined;
        let pageIndex = undefined;

        if (req.params.pageLimit && 1 <= req.params.pageLimit && req.params.pageLimit <= 10) {
            pageLimit = req.params.pageLimit;
        }

        if (req.params.pageIndex && 0 <= req.params.pageIndex) {
            pageIndex = req.params.pageIndex;
        }

        if (pageLimit && pageIndex) {
            const offset = pageLimit * pageIndex;
            const limit = pageLimit;
            const response = await Bags.findAll({ offset, limit })
            if (0 < response.length) {
                res.json(response);
            } else {
                // invalid params
                // should this be an 'out of range' status code?
                res.status(400).send();
            }
        } else {
            // invalid params
            res.status(400).send();
        }
    } catch (error) {
        next(error)
    }
})

router.get('/count', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags/count -> req.params`, req.params)
    try {
        const response = await Bags.count();
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get('/:style', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags/:style -> req.params`, req.params)
    try {
        const bags = await Bags.findAll({
            where: {
                style: req.params.style
            }
        })
        res.json(bags)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags -> req.params`, req.params)
    try {
        const bags = await Bags.findAll()
        res.json(bags)
    } catch (error) {
        next(error)
    }
})
