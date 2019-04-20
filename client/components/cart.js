import {connect} from 'react-redux'
import React from 'react'

export const Cart = props => {
  return (
    <div>
      <ul>
        {props.cart.items.map(item => {
          return (
            <div key={item.id}>
              <div>{item.style}</div>
              <li>{item.material}</li>
              <li>{item.stripeOneColor}</li>
              <li>{item.stripeTwoColor}</li>
              <li>{item.stripeThreeColor}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
export default connect(mapStateToProps)(Cart)
