import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const isLoggedIn = props.isLoggedIn
  const handleClick = props.handleClick
  const cartButton = props.cart.items.length ? `Cart(${props.cart.items.length})` : 'Cart'
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SellinBags
          </Typography>
          <Button color="inherit" component={Link} to={'/thebags'}>The Bags</Button>
          <Button color="inherit" component={Link} to={'/cart'}>{cartButton}</Button>
          {/* {(props.user.roles === 'admin') ?
          <Button color="inherit" component={Link} to='/admin'>Admin</Button> : <div></div>} */}
          {
            (isLoggedIn) ?
              <Button color="inherit" component={Link} to={'/home'}>Home</Button> :
              <Button color="inherit" component={Link} to={'/login'}>Login</Button>
          }
          {
            (isLoggedIn) ?
              <Button color="inherit" component={Link} to={'/'} onClick={handleClick}>Logout</Button> :
              <Button color="inherit" component={Link} to={'/signup'}>Sign-up</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

const NewComponent = connect(mapState, mapDispatch)(ButtonAppBar)
export default withStyles(styles)(NewComponent)

//export default connect(mapState, mapDispatch)(withStyles(styles)(ButtonAppBar));
