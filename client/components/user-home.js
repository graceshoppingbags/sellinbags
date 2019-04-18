import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Orders from './orders'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orders} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <ul>Here are your previous orders:
        <Orders  orders={orders} ></Orders>
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
    orders: state.user.orders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
