import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Typography} from "material-ui";

const styles = {
  root: {
    flexGrow: 1,
  },
  siteBackground: {
    backgroundColor: 'rgba(245,245,245,.9)',
  },
  memeWrapper: {
    margin: 'auto',
  },
  masonry: {
    margin: 'auto'
  },
  leftPanelContainer: {
    top: 0,
    minHeight: "100vh",
  },
  leftPanel: {
    minHeight: "100vh",
    marginTop: 0,
  },
  rightPanelContainer: {
    minHeight: "100%",
  },
  rightPanel: {
    top: 50,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  memes: {
    backgroundColor: "#fff",
    position: 'relative',
  },
}

class MostPopular extends Component {

  componentDidMount() {
    this.props.getMemes()
  }

  render() {
    const {memes} = this.props;
    let memesArray = []
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
          <Typography>Trouble loading memes...</Typography>}
      </div>
    )
  }
}

export default withStyles(styles)(MostPopular);
