const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    // date: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    // },
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Order

