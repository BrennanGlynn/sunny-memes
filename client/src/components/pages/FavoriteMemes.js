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
    let masonry = this.masonry
    let memesArray = Object.keys(memes).map(key => memes[key])

    return (
      <div>
        <FilterModalContainer/>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Masonry
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id} masonry={masonry}/>
              )}
            </Masonry>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Favorites);
