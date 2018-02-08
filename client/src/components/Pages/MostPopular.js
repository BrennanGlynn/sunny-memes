import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
// import queryString from 'query-string';
import MemeContainer from '../../containers/memes/MemeContainer'
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

class MostPopular extends Component {
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
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <Masonry
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >
                  {memes.map((meme) =>
                      <MemeContainer key={meme._id} meme={meme}/>
                  )}
            </Masonry>
        </Grid>
      </Grid>
    )
  }
}

MostPopular.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MostPopular);