import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer"
import Grid from "material-ui/Grid";
import WrapperPanels from "../home/panels/WrapperPanels";

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

class RecentMemes extends Component {
  componentDidMount() {
    this.props.getMemes()
  }

  render() {
    const {classes, memes} = this.props;
    let memesArray = [];
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
      </div>
    )
  }
}

export default withStyles(styles)(RecentMemes);
