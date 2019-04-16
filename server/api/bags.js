const router = require('express').Router()
const { Bags } = require('../db/models')
module.exports = router

console.log("BAGS ROUTES")
router.get('/', async (req, res, next) => {

    try {
        const bags = await Bags.findAll()
        res.json(bags)
    } catch (error) {
        next(error)
    }
})

// eslint-disable-next-line complexity
router.get('/page/:pageLimit/:pageIndex', async (req, res, next) => {
    console.log("SERVER -> ROUTE -> page -> req.params", req.params)
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
    console.log("SERVER -> ROUTE -> count")
    try {
        const response = await Bags.count();
        res.json(response)
    } catch (error) {
        next(error)
    }
})
