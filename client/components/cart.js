import {connect} from 'react-redux'
import React from 'react'
import { Button } from '@material-ui/core'
import { removeItem } from '../store/cart'

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
              <Button onClick={() => {
                props.removeItem(item)
                console.log('click works', props)
              }}>Remove Item</Button>
            </div>
          )
          
        })}
        <div>TOTAL: {`$${props.cart.total/100}`}</div>
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: (item) => {
      dispatch(removeItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
