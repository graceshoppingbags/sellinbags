import {connect} from 'react-redux'
import React from 'react'
import {removedUser, gaveAdmin} from '../store/user'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {

    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    userId: null
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDelete(evt) {
    evt.preventDefault()
    this.props.deleteUser(this.state.userId)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.gaveAdmin(this.state.userId)

  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1>Admin Page</h1>
        <h2>Delete User:</h2>
        <form onSubmit={this.handleDelete} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-number"
          label="User Id"
          value={this.state.userId}
          onChange={this.handleChange('userId')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <Button type='submit' variant="contained" className={this.props.button}>Delete User</Button>
        </form>

        <h2>Give User Admin Access</h2>
        <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-number"
          label="User Id"
          value={this.state.user}
          onChange={this.handleChange('user')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <Button type='submit' variant="contained" className={this.props.button}>Give Admin Access</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (userId) => dispatch(removedUser(userId)),
    gaveAdmin: (userId) => dispatch(gaveAdmin(userId))
  }
}

const AComponent = connect(null, mapDispatchToProps)(Admin)


export default withStyles(styles)(AComponent);
