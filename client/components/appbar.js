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
  const cartButton = props.cart.items.length ? `Cart(${props.cart.items.length})` : 'Cart'
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SellinBags
          </Typography>
          <Button color="inherit" component={Link} to={'/thebags/'}>The Bags</Button>
          {/* <Button component={Link} to={'/Messengers'}>messengers</Button>
          <Button component={Link} to={'/Slings'}>SLINGS</Button>
          <Button component={Link} to={'/bags'}>BAGS</Button> */}
          <Button color="inherit" component={Link} to={'/cart'}>{cartButton}</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign-up</Button>
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
    cart: state.cart
  }
}

export default connect(mapState)(withStyles(styles)(ButtonAppBar));
