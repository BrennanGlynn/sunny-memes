import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Grid} from "material-ui";
import WrapperPanels from "../home/panels/WrapperPanels";

const styles = {}

class Favorites extends Component {
  render() {
    const {classes, memes} = this.props;
    let memesArray = Object.keys(memes).map(key => memes[key])

    return (
      <div>
        {memesArray.map((meme, i) =>
          <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Favorites);
