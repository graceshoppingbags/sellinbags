const router = require('express').Router()
const { Bags } = require('../db/models')
const {User} = require('../db/models')
module.exports = router

function requireAdmin (req, res, next) {
    if (req.user && req.user.roles === 'admin') {
      next()
    } else {
      res.sendStatus(401)
    }
  }


//eslint-disable-next-line complexity
router.get('/data/:pageLimit/:pageIndex/', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags/data/:pageLimit/:pageIndex -> req.params`, req.params)

    try {
        const query = {}
        for (let k in req.query) {
            if (req.query[k] !== '') {
                query[k] = req.query[k]
            }
        }

        console.log(`SERVER -> ROUTE -> /api/bags/data/:pageLimit/:pageIndex -> req.query`, query)
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
            const responseCount = await Bags.count({ where: query })
            const responsePage = await Bags.findAll({ where: query, offset, limit })
            if (0 < responsePage.length) {

                const response = {
                    pageQuery: query,
                    pageLimit,
                    pageIndex,
                    pageRows: responsePage,
                    count: responseCount
                }
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

// eslint-disable-next-line complexity
router.get('/page/:pageLimit/:pageIndex/', async (req, res, next) => {
    console.log(`SERVER -> ROUTE -> /api/bags/page/:pageLimit/:pageIndex -> req.params`, req.params)

    try {
        const query = {}
        for (let k in req.query) {
            if (req.query[k] !== '') {
                query[k] = req.query[k]
            }
        }

        console.log(`SERVER -> ROUTE -> /api/bags/page/:pageLimit/:pageIndex -> req.query`, query)
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
            const response = await Bags.findAll({ where: query, offset, limit })
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
    console.log(`SERVER -> ROUTE -> /api/bags/count -> req.query`, req.query)
    const query = {}
    for (let k in req.query) {
        if (req.query[k] !== '') {
            query[k] = req.query[k]
        }
    }
    try {
        const response = await Bags.count({ where: query });
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// GET DISTINCT COLUMNS FOR MATERIAL, COLOR, STYLE

router.get('/material', async (req, res, next) => {
    try {
        const response = await Bags.aggregate('material', 'DISTINCT', {
            plain: false
        })
        let returnArr = response.map(obj => {
            let materials = Object.values(obj)
            return materials.toString();
        })
        res.json(returnArr)
    } catch (error) {
        next(error)
    }
})

router.get('/stripecolor', async (req, res, next) => {
    try {
        const response = await Bags.aggregate('stripeOneColor', 'DISTINCT', {
            plain: false
        })
        let returnArr = response.map(obj => {
            let colors = Object.values(obj)
            return colors.toString();
        })
        res.json(returnArr)
    } catch (error) {
        next(error)
    }
})

router.get('/style', async (req, res, next) => {
    try {
        const response = await Bags.aggregate('style', 'DISTINCT', {
            plain: false
        })
        let returnArr = response.map(obj => {
            let styles = Object.values(obj)
            return styles.toString();
        })
        res.json(returnArr)
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

router.delete('/:id', requireAdmin, async (req, res, next) => {
    try {
        const id = req.params.id
        console.log()
        await Bags.destroy({ where: {id} })
    } catch (error) {
        next(error)
    }
})
