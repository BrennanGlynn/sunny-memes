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
      <WrapperPanels className={classes.siteBackground}>
          <Grid container spacing={0}>
            <Grid item className={classes.memes}>
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
              )}
            </Grid>
          </Grid>
      </WrapperPanels>
    )
  }
}

export default withStyles(styles)(Favorites);
