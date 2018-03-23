import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from 'material-ui/';
import StarIcon from 'material-ui-icons/Star';
import IconButton from 'material-ui/IconButton';

const styles = {
  favoritesTotal: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  favoriteIcon: {
    color: '#fed035',
  },
  favoriteNumber: {
    color: '#fff',
  },
}

class FavoritesTotal extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div>
        <IconButton aria-label="Total Favorites">
          <StarIcon className={classes.favoriteIcon} />
          <Typography type={'body2'} className={classes.favoriteNumber}>
            568
          </Typography>
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles) (FavoritesTotal);
