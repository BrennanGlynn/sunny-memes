import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
// import queryString from 'query-string';
import MemeContainer from '../containers/MemeContainer'
import Masonry from 'react-masonry-component'
import Grid from 'material-ui/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  memeWrapper: {
    margin: 'auto',
  },
  masonry: {
    margin: 'auto'
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
      <Grid container>
        <Grid item xs={12}>
          <div className="center">
            <Masonry
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >
                  {memes.map((meme,i) =>
                      <MemeContainer memeIndex={i} key={meme._id}/>
                  )}
            </Masonry>
          </div>
        </Grid>
      </Grid>
    )
  }
}

MemePage.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MemePage);
