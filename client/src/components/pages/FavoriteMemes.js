import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import MemeContainer from "../../containers/memes/MemeContainer";
import Masonry from "react-masonry-component"
import {Grid} from "material-ui";
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";

const styles = {}

class Favorites extends Component {
  render() {
    const {classes, memes} = this.props;
    let memesArray = Object.keys(memes).map(key => memes[key])

    return (
      <div>
        <FilterModalContainer/>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Masonry
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
              )}
            </Masonry>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Favorites);
