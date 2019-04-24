import axios from 'axios'
import history from '../history'



/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'
const GIVE_ADMIN_ACCESS = 'GIVE_ADMIN_ACCESS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const deleteUser = user => ({ type: DELETE_USER, user })
const adminAccess = user => ({ type: GIVE_ADMIN_ACCESS, user })
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const removedUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/users/${user.id}`)
      dispatch(deleteUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

export const gaveAdmin = (userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/users/${userId}`)
      dispatch(adminAccess(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case DELETE_USER:
      return { ...state, defaultUser: null }
    case GIVE_ADMIN_ACCESS:
      return { ...state, defaultUser: action.user }
    default:
      return state
  }
}
