import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_BAGS_COUNT = 'SET_BAGS_COUNT'
const SET_BAGS_PAGE = 'SET_BAGS_PAGE'

/**
 * INITIAL STATE
 */

const defaultBags = {
  query: {},
  count: 0,
  page: [],
  pageLimit: 0,
  pageIndex: 0
}

/**
 * ACTION CREATORS
 */

// query should be an object with the following possible keys
// query.style
// query.material
// query.stripeOneColor
// query.stripeTwoColor
// query.stripeThreeColor

const setBagsCount = (query, count) => ({
  type: SET_BAGS_COUNT,
  query,
  count
})

const setBagsPage = (query, pageLimit, pageIndex, pageData) => ({
  type: SET_BAGS_PAGE,
  query,
  pageLimit,
  pageIndex,
  pageData
})

/**
 * THUNK CREATORS
 */

export const getBagsCount = (query) => {
  return async (dispatch) => {
    try {
      const result = await axios.get('/api/bags/count')
      dispatch(setBagsCount(query, result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBagsPage = (query, pageLimit, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      dispatch(setBagsPage(query, pageLimit, pageIndex, result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */

export default function (state = defaultBags, action) {
  switch (action.type) {

    case SET_BAGS_COUNT:
      {
        let newState = {}
        newState.query = action.query;
        newState.count = action.count;
        newState.pageLimit = state.pageLimit
        newState.pageIndex = state.pageIndex;
        newState.pageData = state.pageData;
        return newState;
      }

    case SET_BAGS_PAGE:
      {
        let newState = {}
        newState.query = action.query;
        newState.count = state.count;
        newState.pageLimit = action.pageLimit
        newState.pageIndex = action.pageIndex;
        newState.pageData = action.pageData;
        return newState;
      }

    default:
      return state
  }
}
