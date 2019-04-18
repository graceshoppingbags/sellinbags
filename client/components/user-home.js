import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Orders from './orders'
import WishList from './wishlist'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orders, wishlist} = props
  console.log(props)

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <ul>Here are your previous orders:
        <Orders  orders={orders}></Orders>
      </ul>
      <ul>Here is your wishlist:
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
    wishlist: state.user.wishlistentries
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
