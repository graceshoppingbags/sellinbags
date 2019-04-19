import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_BAGS_COUNT = 'SET_BAGS_COUNT'
const SET_BAGS_PAGE = 'SET_BAGS_PAGE'
const SET_BAGS_ATTRIBUTES = 'SET_BAGS_ATTRIBUTES'

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

const setBagsAttributes = (attribute, values) => ({
  type: SET_BAGS_ATTRIBUTES,
  attribute,
  values
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

export const getBagsAttributes = (attribute) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/bags/${attribute}`)
      dispatch(setBagsAttributes(attribute, result.data))
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
        return { ...state, query: action.query, count: action.count }
      }

    case SET_BAGS_PAGE:
      {
        return { ...state, query: action.query, pageLimit: action.pageLimit, pageIndex: action.pageIndex, pageData: action.pageData }
      }

      case SET_BAGS_ATTRIBUTES:
      {
        return { ...state, [action.attribute]: action.values }
      }

    default:
      return state
  }
}