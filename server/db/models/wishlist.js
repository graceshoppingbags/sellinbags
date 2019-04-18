const Sequelize = require('sequelize')
const db = require('../db')

const WishList = db.define('wishlist', {
    bag: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})


module.exports = WishList