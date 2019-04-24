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
    if (user){
      async () => {
        try {
          Axios.post(`/api/cart/`, {userId: user.id, bagId: item.id})
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
      Axios.delete(`/api/cart/${item.id}/${user}`)
    }
    dispatch(removedItem(item))
  }
}

export const syncCart = (userId, cart) => {
  return async dispatch => {
    try{
        let bagsFromDB = await Axios.get(`/api/cart/${userId}`)
        bagsFromDB = bagsFromDB.data
        let bagsFromState = cart

        if (bagsFromDB.length && !bagsFromState.length){
          dispatch(syncedCart(bagsFromDB))
        }
        else if (!bagsFromDB.length && bagsFromState.length){
          await Axios.post(`/api/cart/sync/${userId}`, bagsFromState.map(bag => ({userId, bagId: bag.id})))
        }
        else {
          let bagsToAxiosPost = bagsFromState.filter(item => !bagsFromDB.map(bag => bag.id).includes(item.id))
          let bagsToAddToState = bagsFromDB.filter(item => !bagsFromState.map(bag => bag.id).includes(item.id))
          console.log(bagsFromDB, bagsFromState)
          await Axios.post(`/api/cart/sync/${userId}`, bagsToAxiosPost.map(bag => ({userId, bagId: bag.id})))
          if (bagsToAddToState.length){
            dispatch(syncedCart(bagsToAddToState))
          } 
        } 
      } catch(error){
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
      return { ...state, items: [...state.items, ...action.items], total: state.total + action.items.reduce((a, b) => { return a + b.price}, 0)}  
    default:
      return state
  }
}

export default cartReducer


