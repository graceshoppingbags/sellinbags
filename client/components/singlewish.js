import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import {addToCart} from '../store/cart'


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SingleWish(props) {
  console.log('############################SINGLEWISH', props)
  const { classes, wish } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Bag Style:
        </Typography>
        <Typography variant="h5" component="h2">
          {wish.bag.style}
        </Typography>
        <ul>
            <li>
                    <Typography component="p">
                {wish.bag.stripeOneColor}
                </Typography>
            </li>
            <li>
                    <Typography component="p">
                {wish.bag.stripeTwoColor}
                </Typography>
            </li>
            <li>
                    <Typography component="p">
                {wish.bag.stripeThreeColor}
                </Typography>
            </li>
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.addToCart(wish.bag, props.user.id)}>ADD TO CART</Button>
      </CardActions>
    </Card>
  );
}

SingleWish.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatch = dispatch => {
  return {
    addToCart: (item, user) => dispatch(addToCart(item, user))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleWish));