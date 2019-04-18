import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_BACKPACKS_COUNT = 'SET_BACKPACKS_COUNT'
const SET_BACKPACKS_PAGE = 'SET_BACKPACKS_PAGE'

/**
 * INITIAL STATE
 */

const defaultBackpacks = { count: 0, page: [], pageLimit: 0, pageIndex: 0 }

/**
 * ACTION CREATORS
 */

const setBackpacksCount = (count) => ({
  type: SET_BACKPACKS_COUNT,
  count
})

const setBackpacksPage = (page, pageLimit, pageIndex) => ({
  type: SET_BACKPACKS_PAGE,
  page,
  pageLimit,
  pageIndex
})

/**
 * THUNK CREATORS
 */

export const getBackpacksCount = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get('/api/bags/count')
      dispatch(setBackpacksCount(result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBackpacksPage = (pageLimit, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      dispatch(setBackpacksPage(result.data, pageLimit, pageIndex))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */

export default function (state = defaultBackpacks, action) {
  switch (action.type) {

    case SET_BACKPACKS_COUNT:
      {
        let newState = {}
        newState.count = action.count;
        newState.page = state.page;
        newState.pageLimit = state.pageLimit
        newState.pageIndex = state.pageIndex;
        return newState;
      }

    case SET_BACKPACKS_PAGE:
      {
        let newState = {}
        newState.count = state.count;
        newState.page = action.page;
        newState.pageLimit = action.pageLimit
        newState.pageIndex = action.pageIndex;
        return newState;
      }

    default:
      return state
  }
}
