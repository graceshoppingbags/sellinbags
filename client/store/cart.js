import axios from 'axios';
import redux from 'react-redux'

// import Bags from '../../server/db/models/bags'

// ACTION TYPES
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_ITEM = 'REMOVE_ITEM'

// INITIAL STATE
const initialState = {
  items: [],
  total: 0
}

// ACTION CREATORS
export const addedToCart = (item) => ({
  type: ADD_TO_CART,
  item
})

export const removedItem = (item) => ({
  type: REMOVE_ITEM,
  item
})

// THUNKS

export const addToCart = (item, user) => {
  return (dispatch) => {
    if (!user) {
      dispatch(addedToCart(item))
    }
    else {

    }
    
  }
}

export const removeItem = (item, user) => {
  return (dispatch) => {
    if (!user) {
      dispatch(removedItem(item))
    }
  }
}


// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.item ], total: state.total + action.item.price }
    case REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.item.id), total: state.total - action.item.price}
    default:
      return state
  }
}

export default cartReducer


