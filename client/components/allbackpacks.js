/* eslint-disable react/no-multi-comp */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BagThumbnail from './bagthumbnail'
import Axios from 'axios';

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

class AllBackpacks extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    rowsCount: 0
  };

  async componentDidMount() {
    try {
      const responseCount = await Axios.get('/api/bags/count')
      const rowsCount = Number(responseCount.data);

      const pageLimit = this.state.rowsPerPage
      const pageIndex = this.state.page
      const responseRows = await Axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      const rows = responseRows.data;
      this.setState({ rows, rowsCount })
    } catch (error) {
      console.log(error)
    }
  }

  handleChangePage = async (event, page) => {
    //    this.setState({ page });

    try {
      const pageLimit = this.state.rowsPerPage
      const pageIndex = page
      const response = await Axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      const rows = response.data;
      this.setState({ rows, page })
      console.log(this.state, "CLIENT -> AllBackpacks -> handleChangePage -> this.state", this.state)
    } catch (error) {
      console.log(error)
    }


  };

  handleChangeRowsPerPage = async event => {

    try {
      const pageLimit = Number(event.target.value)
      const pageIndex = 0
      const response = await Axios.get(`/api/bags/page/${pageLimit}/${pageIndex}`)
      const rows = response.data;
      this.setState({ rows, page: pageIndex, rowsPerPage: pageLimit })
      console.log(this.state, "CLIENT -> AllBackpacks -> handleChangeRowsPerPage -> this.state", this.state)
    } catch (error) {
      console.log(error)
    }

    //this.setState({ rows: [], page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const emptyRows = rowsPerPage - this.state.rows.length;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">Material</TableCell>
                <TableCell align="left">Stripe One Color</TableCell>
                <TableCell align="left">Stripe Two Color</TableCell>
                <TableCell align="left">Stripe Three Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => ( */}
              {rows.slice(0, rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.material}
                  </TableCell>
                  <TableCell align="left">{row.stripeOneColor}</TableCell>
                  <TableCell align="left">{row.stripeTwoColor}</TableCell>
                  <TableCell align="left">{row.stripeThreeColor}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={4}
                  // count={rows.length}
                  count={this.state.rowsCount}
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

AllBackpacks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllBackpacks);

/*
//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(material, stripeOneColor, stripeTwoColor, stripeThreeColor) {
  id += 1;
  return { id, material, stripeOneColor, stripeTwoColor, stripeThreeColor };
}

const rows = [
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
  createData('M', '1', '2', '3'),
];

function AllBackpacks(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Material</TableCell>
            <TableCell align="left">Stripe 1 Color</TableCell>
            <TableCell align="left">Stripe 2 Color</TableCell>
            <TableCell align="left">Stripe 3 Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.material}</TableCell>
              <TableCell align="left">{row.stripeOneColor}</TableCell>
              <TableCell align="left">{row.stripeTwoColor}</TableCell>
              <TableCell align="left">{row.stripeThreeColor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

AllBackpacks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllBackpacks);
*/
/*
class AllBackpacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bags: [] };
  }
  async componentDidMount() {
    const getBags = await Axios.get(`/api/bags/Backpack`)
    this.setState({ bags: getBags.data })
    console.log(this.state, "getBags in componenet did mount")
  }
  render() {*/
/*
const noBags = <div>No Bags Here</div>
const thereAreBags = <div>
  {this.state.bags.map(bag => (
    <div id={bag.id}>
      <BagThumbnail style={bag.style} color1={bag.stripeOneColor} color2={bag.stripeTwoColor} color3={bag.stripeThreeColor} />
    </div>
  ))}
</div>

return (this.state.bags.length ? thereAreBags : noBags)
  *//*
return (
<div>
<h6>BACKPACKS</h6>
</div>
)
}
}
export default AllBackpacks
*/


