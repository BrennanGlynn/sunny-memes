import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
// import queryString from 'query-string';
import MemeContainer from '../containers/MemeContainer'

const styles = {
  card: {},
  root: {
    flexGrow: 1
  }
}

class MemePage extends Component {
  // todo fix character sorting
  // componentDidMount() {
  //   // Get the current users details from the backend server
  //   const chars = queryString.parse(this.props.location.search).chars
  //   let query = 'memes';
  //   if (typeof chars === 'object') {
  //     query = query + '?chars=' + chars.join('&chars=');
  //   } else if (typeof chars === 'string') {
  //     query = query + '?chars=' + chars;
  //   }
  // }

  render() {
    const {classes, memes} = this.props;

    return (
      <Grid container className={classes.root} spacing={0}>
        {memes.map(meme =>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={meme._id}>
            <MemeContainer className={classes.card} data={meme}/>
          </Grid>
        )}
      </Grid>)
  }
}

MemePage.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MemePage);