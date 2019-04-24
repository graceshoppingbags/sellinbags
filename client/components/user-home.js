import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Orders from './orders'
import WishList from './wishlist'
import { syncCart, syncedCart } from '../store/cart'
/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, orders, wishlist} = props
  console.log('###################USER HOME PROPS', props)
  if (props.user){
    props.syncCart(props.user.id, props.cart.items)
  }

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <ul>PREVIOUS ORDERS:
        <Orders  orders={orders}></Orders>
      </ul>
      <ul>WISHLIST:
        <WishList wishlist={wishlist}></WishList>
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    orders: state.user.orders,
    wishlist: state.user.wishlistentries,
    user: state.user, 
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    syncCart: (userId, cart) => dispatch(syncCart(userId, cart))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
