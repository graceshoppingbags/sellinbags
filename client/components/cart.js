import {connect} from 'react-redux'
import React from 'react'
import { Button } from '@material-ui/core'
import { removeItem } from '../store/cart'
import TakeMoney from '../../client/components/checkoutbutton'

export const Cart = props => {
  console.log(props.user, 'FROM CART COMPONENT##########')
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
              <Button onClick={() => {
                props.removeItem(item, props.user.id)
              }}>Remove Item</Button>
            </div>
          )
          
        })}
        <div>TOTAL: {`$${props.cart.total/100}`}</div>
      </ul>
      <div>
        <div>
        <TakeMoney />
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: (item, user) => {
      dispatch(removeItem(item, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
