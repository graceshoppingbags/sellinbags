import React from 'react';
import {connect} from 'react-redux'
import {getSelectedBag} from '../store/bags'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class SingleBag extends React.Component {

  state = {
    multiline: 'Your Review'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    return (
      <div>
        <h1>The {this.props.singlebag.material} {this.props.singlebag.style}</h1>
        <h2>Your Color Selection:</h2>
          <ul>
            <li>{this.props.singlebag.stripeOneColor}</li>
            <li>{this.props.singlebag.stripeTwoColor}</li>
            <li>{this.props.singlebag.stripeThreeColor}</li>
          </ul>
        <h2>Description:</h2>
        <p>{this.props.singlebag.description}</p>
        <h2>Reviews:</h2>
        <form className={this.props.container} noValidate autoComplete="off">
        <TextField
          id="outlined-multiline-flexible"
          label="Review"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={this.props.textField}
          margin="normal"
          helperText="Write your review here"
          variant="outlined"
        />
        <TextField
          id="outlined-helperText"
          label="Your Rating"
          defaultValue="Rate your bag"
          className={this.props.textField}
          helperText="Rate from 0 to 5"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" className={this.props.button}>Submit your review!</Button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    singlebag: state.bags.selectedBag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedBag: (bag) => dispatch(getSelectedBag(bag))
  }
}

const NewComponent = connect(mapStateToProps, mapDispatchToProps)(SingleBag)

export default withStyles(styles)(NewComponent)

