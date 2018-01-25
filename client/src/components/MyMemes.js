import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
import queryString from 'query-string';
import MemeCard from './MemeCard';

const styles = {
  card: {},
  root: {
    flexGrow: 1
  }
}

class MyMemes extends Component {
  render() {
    const {classes, memes, user} = this.props;

    return (
      <div>
        {memes[0]._id ? (
          <Grid container className={classes.root} spacing={0}>
            {memes.map(meme =>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={meme._id}>
                <MemeCard className={classes.card} data={meme} user={user} />
              </Grid>
            )}
          </Grid>
        ) : (
          //TODO: change this
          <div>You haven't uploaded any memes</div>
        )}
      </div>)
  }
}

MyMemes.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MyMemes);