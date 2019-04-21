const User = require('./user')
const Bags = require('./bags')
const Order = require('./order')
const Cart = require('./cart')
const CartProduct = require('./cartproduct')
const OrderProduct = require('./orderproduct')
const WishListEntries = require('./wishlistentries')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User)
User.hasMany(Order)

OrderProduct.belongsTo(Order)
Order.hasMany(OrderProduct)

OrderProduct.belongsTo(Bags)

WishListEntries.belongsTo(User)
WishListEntries.belongsTo(Bags)
Bags.hasMany(WishListEntries)
User.hasMany(WishListEntries)

Cart.hasMany(Bags)
Cart.belongsTo(User)
User.hasOne(Cart)

CartProduct.belongsTo(Cart)
CartProduct.belongsTo(Bags)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Bags, Order, OrderProduct, WishListEntries
}
