import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Grid} from "material-ui/";
import WrapperPanels from "../home/panels/WrapperPanels";

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
    position: "-webkit-sticky",
    position: "sticky",
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
    position: "-webkit-sticky",
    position: "sticky",
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
    const {classes, memes} = this.props;
    let memesArray = []
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

export default withStyles(styles)(MostPopular);
