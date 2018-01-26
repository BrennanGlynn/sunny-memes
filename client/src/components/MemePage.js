import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
// import queryString from 'query-string';
import MemeContainer from '../containers/MemeContainer'
import Masonry from 'react-masonry-component'

const styles = {
  root: {
    flexGrow: 1,
  },
  memeWrapper: {
    position: 'relative',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
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
    const {memes} = this.props;

    return (
      <Masonry
        className={'memeWrapper'}
      >
        {memes.map((meme,i) =>
            <MemeContainer memeIndex={i} key={meme._id}/>
        )}
      </Masonry>)
  }
}

MemePage.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MemePage);
