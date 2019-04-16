const Sequelize = require('sequelize')
const db = require('../db')

const Bags = db.define('bags', {
    style: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stripeOneColor: {
        type: Sequelize.STRING,
    },
    stripeTwoColor: {
        type: Sequelize.STRING
    },
    stripeThreeColor: {
        type: Sequelize.STRING
    },
    material: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Bags


