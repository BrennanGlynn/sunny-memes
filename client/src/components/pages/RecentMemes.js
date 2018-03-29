import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer"
import {Typography} from "material-ui";

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
    const {memes} = this.props;
    let memesArray = [];
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
          <Typography>Loading recent memes...</Typography>}
      </div>
    )
  }
}

export default withStyles(styles)(RecentMemes);
