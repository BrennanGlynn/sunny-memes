import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import MemeContainer from "../../containers/memes/MemeContainer";
import Masonry from "react-masonry-component"
import {Grid} from "material-ui";

const styles = {}

class Favorites extends Component {
  render() {
    const {classes, memes} = this.props;
    let memesArray = Object.keys(memes).map(key => memes[key])

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Masonry
            options={{fitWidth: true}}
            className={classes.memeWrapper}
          >
            {memesArray.map((meme) =>
              <MemeContainer key={meme._id} meme={meme}/>,
            )}
          </Masonry>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Favorites);