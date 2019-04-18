/* eslint-disable react/no-multi-comp */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BagThumbnail from './bagthumbnail'
import Axios from 'axios';
import { getBackpacksCount, getBackpacksPage } from '../store/bags'

//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

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
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(material, stripeOneColor, stripeTwoColor, stripeThreeColor) {
  counter += 1;
  return { id: counter, material, stripeOneColor, stripeTwoColor, stripeThreeColor };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class AllBags extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    try {
      this.props.reduxDispatch(getBackpacksCount());
      this.props.reduxDispatch(getBackpacksPage(this.state.rowsPerPage, this.state.page));
      // const responseCount = await Axios.get('/api/bags/count')
      // const rowsCount = Number(responseCount.data);

      // const pageLimit = this.state.rowsPerPage
      // const pageIndex = this.state.page
      // const responseRows = await Axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      // const rows = responseRows.data;
      // this.setState({ rows, rowsCount })
    } catch (error) {
      console.log(error)
    }
  }

  handleChangePage = (event, page) => {
    try {
      const pageLimit = this.state.rowsPerPage
      const pageIndex = page
      this.props.reduxDispatch(getBackpacksPage(pageLimit, pageIndex));
      this.setState({ page: pageIndex })
    } catch (error) {
      console.log(error)
    }
  };

  handleChangeRowsPerPage = event => {
    try {
      const pageLimit = Number(event.target.value)
      const pageIndex = 0
      this.props.reduxDispatch(getBackpacksPage(pageLimit, pageIndex));
      this.setState({ page: pageIndex, rowsPerPage: pageLimit })
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    console.log(`CLIENT -> AllBags -> render -> this.props`, this.props)
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const rows = this.props.reduxRows ? this.props.reduxRows : []
    const rowsCount = this.props.reduxRowsCount ? this.props.reduxRowsCount : 0
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const emptyRows = rowsPerPage - rows.length;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">Style</TableCell>
                <TableCell allign="left" scope="row">Material</TableCell>
                <TableCell align="left">Stripe One Color</TableCell>
                <TableCell align="left">Stripe Two Color</TableCell>
                <TableCell align="left">Stripe Three Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => ( */}
              {rows.slice(0, rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.style}</TableCell>
                  <TableCell align="left">{row.material}</TableCell>
                  <TableCell align="left">{row.stripeOneColor}</TableCell>
                  <TableCell align="left">{row.stripeTwoColor}</TableCell>
                  <TableCell align="left">{row.stripeThreeColor}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={5}
                  // count={rows.length}
                  count={rowsCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
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
    );
  }
}

AllBags.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(`CLIENT -> AllBags -> mapStateToProps -> state`, state)
  return {
    reduxRowsCount: state.bags.count,
    reduxRows: state.bags.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxDispatch: dispatch
  }
  /*
    fetchCampuses: () => { dispatch(fetchCampuses()) },
    fetchStudents: () => { dispatch(fetchStudents()) },
  */
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllCampuses)
//export default AllCampuses
const NewComponent = connect(mapStateToProps, mapDispatchToProps)(AllBags)

export default withStyles(styles)(NewComponent);

