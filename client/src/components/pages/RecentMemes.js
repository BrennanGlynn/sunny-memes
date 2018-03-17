import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
// import queryString from 'query-string';
import MemeCardContainer from "../../containers/memes/MemeCardContainer"
import Masonry from "react-masonry-component"
import Grid from "material-ui/Grid";
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";

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
    let memeArray = [];
    let masonry = this.masonry
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memeArray.push(memes[key])
      }
    }

    return (
      <div>
        <FilterModalContainer/>
        {memeArray[0] ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Masonry
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >
              {memeArray.map((meme, i) =>
                <MemeCardContainer meme={meme} index={i} memeArray={memeArray} key={meme._id} masonry={masonry}/>
              )}
            </Masonry>
          </Grid>
        </Grid>) : (
          <div>loading...</div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(RecentMemes);
