import Axios from 'axios';
import redux from 'react-redux'
import store  from '../store'
// const db =  require('../../server/db')


// import Bags from '../../server/db/models/bags'

// ACTION TYPES
// import { CartProducts } from '../../server/db/'
import { runInNewContext } from 'vm';
import bags from './bags';
import { Cart } from '../components/cart';

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SYNC_CART = 'SYNC_CART'
// export const UPDATE_CART_TOTAL = 'UPDATE_CART_TOTAL'

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

export const syncedCart = (items) => ({
  type: SYNC_CART,
  items
})


// THUNKS

export const addToCart = (item, user) => {
  return (dispatch) => {
    console.log(item, user)
    if (user){
      async () => {
        try {
          Axios.post(`/api/cart/${user}`, item.id)
        } catch(error){
          console.log(error)
        }
      }
    }
    dispatch(addedToCart(item))
  }
}

export const removeItem = (item, user) => {
  return (dispatch) => {
    if (user) {
      Axios.delete(`/api/cart/`, item.id)
    }
    dispatch(removedItem(item))
  }
}


export const syncCart = (userId) => {
  return async (dispatch) => {
    try{
      let cartItems = await Axios.get(`/api/cart/${userId}`)
      dispatch(syncedCart(cartItems.data))
      cartItems = cartItems.data.map(item => item.id)
      let bagsToPost = store.getState().cart.items.filter(bag => !cartItems.includes(bag.id)).map(bag => ({bagId: bag.id}))
      if (bagsToPost.length){
        // await Axios.delete(`api/cart/${userId}`)

        await Axios.post(`api/cart/sync/${userId}`, bagsToPost)
      }
    }catch(error){
      console.log(error)
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
    case SYNC_CART:
      return { ...state, items: [...state.items, ...action.items.filter(item => (!state.items.map(stateItem => stateItem.id).includes(item.id)))], total: state.total + action.items.length ? action.items.filter(item => (!state.items.map(stateItem => stateItem.id).includes(item.id))).map(item => item.price).reduce((a, b) => a + b) : 0}
    default:
      return state
  }
}

export default cartReducer


