const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})




module.exports = OrderProduct