const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  review: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
})

module.exports = Reviews
