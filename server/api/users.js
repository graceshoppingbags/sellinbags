const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function requireAdmin (req, res, next) {
  if (req.user && req.user.admin) {
    next()
  } else {
    req.sendStatus(401)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// ADMIN ROUTES

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    let user = await User.findOne({ where: { id } })
    if (user) {
      user.roles = 'admin'
      res.status(200)
    } else {
      res.status(404)
    }
  } catch (err) {
    next(err)
  }
})
