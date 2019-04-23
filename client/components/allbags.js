/* eslint-disable react/no-array-index-key */
/* eslint-disable complexity */
/* eslint-disable react/no-multi-comp */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BagThumbnail from './bagthumbnail'
import Axios from 'axios'
import { getBagsData, getBagsAttributes, getSelectedBag, deleteBag } from '../store/bags'
import { addToCart } from '../store/cart'

//import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import TableHead from '@material-ui/core/TableHead'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
})

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    )
  }

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
              <KeyboardArrowLeft />
            )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
              <KeyboardArrowRight />
            )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

const headerText = {
  style: 'Style',
  material: 'Material',
  stripeOneColor: 'Stripe One Color',
  stripeTwoColor: 'Stripe Two Color',
  stripeThreeColor: 'Stripe Three Color'
}

class AllBags extends React.Component {

  state = {
  }

  buildQueryString(pageLimit, pageIndex, query) {
    const style = query.style ? `style=${query.style}` : 'style='
    const material = query.material ? `material=${query.material}` : 'material='
    const stripeOneColor = query.stripeOneColor ? `stripeOneColor=${query.stripeOneColor}` : 'stripeOneColor='
    const stripeTwoColor = query.stripeTwoColor ? `stripeTwoColor=${query.stripeTwoColor}` : 'stripeTwoColor='
    const stripeThreeColor = query.stripeThreeColor ? `stripeThreeColor=${query.stripeThreeColor}` : 'stripeThreeColor='
    const queryString = `/${pageLimit}/${pageIndex}?${style}&${material}&${stripeOneColor}&${stripeTwoColor}&${stripeThreeColor}`
    return queryString
  }

  componentDidMount() {
    try {
      console.log(`CLIENT -> AllBags -> componentDidMount -> this.props ->`, this.props)

      // load the filter data
      this.props.bagsDispatch(getBagsAttributes('style'))
      this.props.bagsDispatch(getBagsAttributes('stripecolor'))
      this.props.bagsDispatch(getBagsAttributes('material'))

      // extract the query string from the url
      let pageQueryString = this.props.location.pathname.substring('/thebags'.length) + this.props.location.search;
      console.log(`CLIENT -> AllBags -> componentDidMount -> pageQueryString ->`, pageQueryString)

      if (pageQueryString.length === 0) {
        // build the query string
        const pageLimit = this.props.bags.bagsData.pageLimit
        const pageIndex = this.props.bags.bagsData.pageIndex
        const query = this.props.bags.query;
        pageQueryString = this.buildQueryString(pageLimit, pageIndex, query)
      }

      // perform the query
      this.props.bagsDispatch(getBagsData(pageQueryString))

      // set the new url
      const location = "/thebags" + pageQueryString
      console.log(`CLIENT -> AllBags -> handleChangePage -> location ->`, location)
      this.props.history.replace(location)

    } catch (error) {
      console.log(error)
    }
  }


  handleChangePage = (event, page) => {
    try {

      // build the query string
      const pageLimit = this.props.bags.bagsData.pageLimit
      const pageIndex = Number(page)
      const query = this.props.bags.query;
      const pageQueryString = this.buildQueryString(pageLimit, pageIndex, query)

      // perform the query
      this.props.bagsDispatch(getBagsData(pageQueryString))

      // set the new url
      const location = "/thebags" + pageQueryString
      console.log(`CLIENT -> AllBags -> handleChangePage -> location ->`, location)
      this.props.history.replace(location)

    } catch (error) {
      console.log(error)
    }
  }

  handleChangeRowsPerPage = event => {

    // build the query string
    const pageLimit = Number(event.target.value)
    const pageIndex = 0
    const query = this.props.bags.query;
    const pageQueryString = this.buildQueryString(pageLimit, pageIndex, query)

    try {

      // perform the query
      this.props.bagsDispatch(getBagsData(pageQueryString))

      // set the new url
      const location = "/thebags" + pageQueryString
      console.log(`CLIENT -> AllBags -> handleChangePage -> location ->`, location)
      this.props.history.replace(location)

    } catch (error) {
      console.log(error)
    }
  }

  handleChangeFilter = event => {

    const targetName = event.target.name
    const targetValue = event.target.value

    let newQuery = { ...this.props.bags.query }

    if (targetValue !== headerText[targetName]) {
      newQuery[targetName] = targetValue;
    } else {
      newQuery[targetName] = ''
    }

    // build the query string
    const pageLimit = this.props.bags.bagsData.pageLimit
    const pageIndex = 0
    const query = newQuery;
    const pageQueryString = this.buildQueryString(pageLimit, pageIndex, query)

    try {

      // perform the query
      this.props.bagsDispatch(getBagsData(pageQueryString))

      // set the new url
      const location = "/thebags" + pageQueryString
      console.log(`CLIENT -> AllBags -> handleChangePage -> location ->`, location)
      this.props.history.replace(location)

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log(`CLIENT -> AllBags -> render -> this.props ->`, this.props)

    const { classes } = this.props

    const bags = this.props.bags;
    const bagsData = this.props.bags.bagsData;
    const query = this.props.bags.query;

    const pageLimit = bagsData.pageLimit
    const pageIndex = bagsData.pageIndex

    const rows = bagsData.pageRows ? bagsData.pageRows : []
    const rowsCount = bagsData.count ? bagsData.count : 0
    const rowsCountEmpty = pageLimit - rows.length

    const styles = bags.style
      ? [headerText.style].concat(bags.style)
      : [headerText.style]

    const materials = bags.material
      ? [headerText.material].concat(bags.material)
      : [headerText.material]

    const stripeOneColors = bags.stripecolor
      ? [headerText.stripeOneColor].concat(bags.stripecolor)
      : [headerText.stripeOneColor]

    const stripeTwoColors = bags.stripecolor
      ? [headerText.stripeTwoColor].concat(bags.stripecolor)
      : [headerText.stripeTwoColor]

    const stripeThreeColors = bags.stripecolor
      ? [headerText.stripeThreeColor].concat(bags.stripecolor)
      : [headerText.stripeThreeColor]

    let filter = {}
    let filterFields = ['style', 'material', 'stripeOneColor', 'stripeTwoColor', 'stripeThreeColor']

    filterFields.forEach(element => {
      if (query[element] && query[element] !== '') {
        filter[element] = query[element]
      } else {
        filter[element] = headerText[element]
      }
    })

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Select
                    value={filter.style}
                    onChange={this.handleChangeFilter}
                    inputProps={{
                      name: 'style',
                      id: 'style-simple'
                    }}
                  >
                    {styles.map((style, index) => {
                      return <MenuItem key={index} value={style}>{style}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell allign="left" scope="row">
                  <Select
                    value={filter.material}
                    onChange={this.handleChangeFilter}
                    inputProps={{
                      name: 'material',
                      id: 'material-simple'
                    }}
                  >
                    {materials.map((material, index) => {
                      return <MenuItem key={index} value={material}>{material}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell align="left">
                  <Select
                    value={filter.stripeOneColor}
                    onChange={this.handleChangeFilter}
                    inputProps={{
                      name: 'stripeOneColor',
                      id: 'stripeOneColor-simple'
                    }}
                  >
                    {stripeOneColors.map((color, index) => {
                      return <MenuItem key={index} value={color}>{color}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell align="left">
                  <Select
                    value={filter.stripeTwoColor}
                    onChange={this.handleChangeFilter}
                    inputProps={{
                      name: 'stripeTwoColor',
                      id: 'stripeTwoColor-simple'
                    }}
                  >
                    {stripeTwoColors.map((color, index) => {
                      return <MenuItem key={index} value={color}>{color}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell align="left">
                  <Select
                    value={filter.stripeThreeColor}
                    onChange={this.handleChangeFilter}
                    inputProps={{
                      name: 'stripeThreeColor',
                      id: 'stripeThreeColor-simple'
                    }}
                  >
                    {stripeThreeColors.map((color, index) => {
                      return <MenuItem key={index} value={color}>{color}</MenuItem>
                    })}
                  </Select>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, pageLimit).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.style}
                  </TableCell>
                  <TableCell align="left">{row.material}</TableCell>
                  <TableCell align="left">{row.stripeOneColor}</TableCell>
                  <TableCell align="left">{row.stripeTwoColor}</TableCell>
                  <TableCell align="left">{row.stripeThreeColor}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        this.props.addToCart(row)
                      }}>Add To Cart</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        this.props.getSelectedBag(row)
                      }}
                      component={Link}
                      to={`/singlebag/${row.id}`}>View Bag</Button>
                  </TableCell>
                  {(this.props.user.roles === 'admin') ?
                    <TableCell align="left">
                      <Button
                        onClick={() => {
                          this.props.deleteBag(row)
                        }}>Delete Bag</Button>
                    </TableCell> : ''
                  }
                </TableRow>
              ))}
              {rowsCountEmpty > 0 && (
                <TableRow style={{ height: 48 * rowsCountEmpty }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={5}
                  count={rowsCount}
                  rowsPerPage={pageLimit}
                  page={pageIndex}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

AllBags.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  console.log(`CLIENT -> AllBags -> mapStateToProps -> state`, state)
  return {
    bags: state.bags,
    orders: state.user.orders,
    wishlist: state.user.wishlistentries,
    user: state.user
    // isAdmin: !!(state.user.role === 'admin')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bagsDispatch: dispatch,
    addToCart: (item, user) => dispatch(addToCart(item, user)),
    getSelectedBag: (bag) => dispatch(getSelectedBag(bag)),
    deleteBag: (bag) => dispatch(deleteBag(bag))
  }
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllCampuses)
//export default AllCampuses
const NewComponent = connect(mapStateToProps, mapDispatchToProps)(AllBags)

export default withStyles(styles)(NewComponent)

