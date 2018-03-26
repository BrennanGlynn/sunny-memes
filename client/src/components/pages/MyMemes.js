import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from 'material-ui';
import MemeContainer from '../../containers/memes/MemeCardContainer'

const styles = {
  root: {
    flexGrow: 1
  },
  masonry: {
    margin: 'auto'
  },
}

class MyMemes extends Component {
  componentDidMount() {
    this.props.getMemes()
  }

  render() {
    const {memes} = this.props;
    const memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }

    return (
      <div>
        {memesArray.length > 0 ? memesArray.map((meme, i) =>
            <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
          ) :
          <Typography>You have not uploaded any memes yet!</Typography>}
      </div>)
  }
}

export default withStyles(styles)(MyMemes);
