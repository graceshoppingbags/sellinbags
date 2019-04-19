import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
  const { classes, wish } = props;
  const bull = <span className={classes.bullet}>•</span>;
  console.log(wish, '###########################INSIDEWISHCARD')
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
        <Button size="small">ADD TO CART</Button>
      </CardActions>
    </Card>
  );
}

SingleWish.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleWish);