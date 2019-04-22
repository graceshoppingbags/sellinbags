import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_BAGS_COUNT = 'SET_BAGS_COUNT'
const SET_BAGS_PAGE = 'SET_BAGS_PAGE'
const SET_BAGS_ATTRIBUTES = 'SET_BAGS_ATTRIBUTES'
const SET_SELECTED_BAG = 'SET_SELECTED_BAG'
const DELETE_SELECTED_BAG = 'DELETE_SELECTED_BAG'

/**
 * INITIAL STATE
 */

const defaultBags = {
  query: {
    style: '',
    material: '',
    stripeOneColor: '',
    stripeTwoColor: '',
    stripeThreeColor: ''
  },
  count: 0,
  pageLimit: 5,
  pageIndex: 0,
  pageData: [],
  selectedBag: {},
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
      const queryString = `?${style}&${material}&${stripeOneColor}&${stripeTwoColor}&${stripeThreeColor}`

      const result = await axios.get(`/api/bags/count${queryString}`)
      dispatch(setBagsCount(query, result.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBagsPage = (query, pageLimit, pageIndex) => {
  console.log(`CLIENT -> REDUX -> getBagsPage -> query ->`, query)
  return async (dispatch) => {
    try {
      const style = `style=${query.style}`
      const material = `material=${query.material}`
      const stripeOneColor = `stripeOneColor=${query.stripeOneColor}`
      const stripeTwoColor = `stripeTwoColor=${query.stripeTwoColor}`
      const stripeThreeColor = `stripeThreeColor=${query.stripeThreeColor}`
      const queryString = `?${style}&${material}&${stripeOneColor}&${stripeTwoColor}&${stripeThreeColor}`

      const result = await axios.get(`/api/bags/page/${pageLimit}/${pageIndex}${queryString}`)
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
