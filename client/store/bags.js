import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_BAGS_COUNT = 'SET_BAGS_COUNT'
const SET_BAGS_PAGE = 'SET_BAGS_PAGE'
const SET_BAGS_DATA = 'SET_BAGS_DATA'
const SET_BAGS_ATTRIBUTES = 'SET_BAGS_ATTRIBUTES'
const SET_SELECTED_BAG = 'SET_SELECTED_BAG'
const DELETE_SELECTED_BAG = 'DELETE_SELECTED_BAG'

/**
 * INITIAL STATE
 */

const defaultBags = {
  selectedBag: {},
  query: {},
  queryString: '',
  bagsData: {
    pageLimit: 5,
    pageIndex: 0,
    pageData: [],
    count: 0
  },
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

const setBagsData = (queryString, bagsData) => ({
  type: SET_BAGS_DATA,
  queryString,
  bagsData
})

const setBagsAttributes = (attribute, values) => ({
  type: SET_BAGS_ATTRIBUTES,
  attribute,
  values
})

const setSelectedBag = (bag) => ({
  type: SET_SELECTED_BAG,
  bag
})

const deleteSelectedBag = (bag) => ({
  type: DELETE_SELECTED_BAG,
  bag
})

/**
 * THUNK CREATORS
 */

export const getBagsCount = (query) => {
  console.log(`CLIENT -> REDUX -> getBagsCount -> query ->`, query)
  return async (dispatch) => {
    try {

      const style = `style=${query.style}`
      const material = `material=${query.material}`
      const stripeOneColor = `stripeOneColor=${query.stripeOneColor}`
      const stripeTwoColor = `stripeTwoColor=${query.stripeTwoColor}`
      const stripeThreeColor = `stripeThreeColor=${query.stripeThreeColor}`
      const queryString = `/count/?${style}&${material}&${stripeOneColor}&${stripeTwoColor}&${stripeThreeColor}`

      const result = await axios.get(`/api/bags${queryString}`)
      dispatch(setBagsCount(query, result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBagsPage = (query, pageLimit, pageIndex, pageQueryString) => {
  console.log(`CLIENT -> REDUX -> getBagsPage -> query ->`, query)
  console.log(`CLIENT -> REDUX -> getBagsPage -> pageQueryString ->`, pageQueryString)
  return async (dispatch) => {
    try {
      const style = `style=${query.style}`
      const material = `material=${query.material}`
      const stripeOneColor = `stripeOneColor=${query.stripeOneColor}`
      const stripeTwoColor = `stripeTwoColor=${query.stripeTwoColor}`
      const stripeThreeColor = `stripeThreeColor=${query.stripeThreeColor}`
      const queryString = pageQueryString.length !== 0 ?
        pageQueryString :
        `/page/${pageLimit}/${pageIndex}?${style}&${material}&${stripeOneColor}&${stripeTwoColor}&${stripeThreeColor}`

      const result = await axios.get(`/api/bags${queryString}`)
      dispatch(setBagsPage(query, pageLimit, pageIndex, result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBagsData = (queryString) => {
  console.log(`CLIENT -> REDUX -> getBagsData -> queryString ->`, queryString)
  return async (dispatch, getState) => {
    try {
      const result = await axios.get(`/api/bags/data${queryString}`)
      const pageQuery = result.data.pageQuery
      const pageLimit = Number(result.data.pageLimit)
      const pageIndex = Number(result.data.pageIndex)
      const pageRows = result.data.pageRows;
      const count = Number(result.data.count);

      const bagsData = { pageQuery, pageLimit, pageIndex, pageRows, count }
      dispatch(setBagsData(queryString, bagsData))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBagsAttributes = (attribute) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().attribute) {
        const result = await axios.get(`/api/bags/${attribute}`)
        dispatch(setBagsAttributes(attribute, result.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSelectedBag = (bag) => {
  return (dispatch) => {
    dispatch(setSelectedBag(bag))
  }
}

export const deleteBag = (bag) => {
  return async (dispatch) => {
    try {
      const theBag = await axios.delete(`/api/bags/${bag.id}`)
      dispatch(deleteSelectedBag(theBag))
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

    case SET_BAGS_DATA:
      {
        const newState = { ...state, query: action.bagsData.pageQuery, queryString: action.queryString, bagsData: action.bagsData }
        console.log(`CLIENT -> REDUX -> reducer -> SET_BAGS_DATA -> newState`, newState)
        return newState;
      }

    case SET_BAGS_ATTRIBUTES:
      {
        return { ...state, [action.attribute]: action.values }
      }

    case SET_SELECTED_BAG:
      {
        return { ...state, selectedBag: action.bag }
      }
    case DELETE_SELECTED_BAG:
      {
        return { ...state, selectedBag: null }
      }

    default:
      return state
  }
}
