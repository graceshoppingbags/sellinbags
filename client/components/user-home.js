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
  console.log(props)
  props.syncCart(props.user.id)

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
  console.log(state)
  return {
    email: state.user.email,
    orders: state.user.orders,
    wishlist: state.user.wishlistentries,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    syncCart: (userId) => dispatch(syncCart(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
