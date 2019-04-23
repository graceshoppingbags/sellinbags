import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { addToCart } from '../store/cart'
import { connect } from 'react-redux'

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

function SingleOrder(props) {
  const { classes, order } = props;
  const bull = <span className={classes.bullet}>•</span>;
  const bag = order.orderproducts[0].bag
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Bag Style:
        </Typography>
        <Typography variant="h5" component="h2">
          {bag.style}
        </Typography>
        <ul>
            <li>
                    <Typography component="p">
                {bag.stripeOneColor}
                </Typography>
            </li>
            <li>
                    <Typography component="p">
                {bag.stripeTwoColor}
                </Typography>
            </li>
            <li>
                    <Typography component="p">
                {bag.stripeThreeColor}
                </Typography>
            </li>
        </ul>
        <br></br>
        <div>Ordered: {order.createdAt.split('T')[0]}</div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.addToCart(bag, props.user.id)}>PURCHASE AGAIN</Button>
      </CardActions>
    </Card>
  );
}

SingleOrder.propTypes = {
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

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleOrder));