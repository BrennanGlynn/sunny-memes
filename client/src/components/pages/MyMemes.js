import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
import MemeContainer from '../../containers/memes/MemeCardContainer'
import Masonry from 'react-masonry-component'
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";
import WrapperPanels from "../home/panels/WrapperPanels";

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
    const {classes, memes} = this.props;
    const memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }

    return (
      <div>
        {memesArray.map((meme, i) =>
          <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
        )}
      </div>)
  }
}

export default withStyles(styles)(MyMemes);
