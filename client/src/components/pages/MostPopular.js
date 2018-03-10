import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
// import queryString from 'query-string';
import MemeContainer from "../../containers/memes/MemeCardContainer";
import Masonry from "react-masonry-component";
import Grid from "material-ui/Grid";
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";
import LeftPanel from "../home/LeftPanel";
import FilterCharacterList from "../../containers/sorting/FilterCharacterListContainer";

const styles = {
  root: {
    flexGrow: 1,
  },
  memeWrapper: {
    margin: 'auto',
  },
  masonry: {
    margin: 'auto'
  },
  memes: {
    position: 'relative',
    margin: 'auto',
  },
}

class MostPopular extends Component {
  //
  // componentDidMount() {
  //   this.setState({masonry: this.masonry})
  // }

  render() {
    const {classes, memes} = this.props;
    let masonry = this.masonry
    let memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }
    return (
      <div>
        <FilterModalContainer/>
        <Grid container spacing={0}>
          <Grid item lg={3}>
            <LeftPanel />
            <FilterCharacterList />
          </Grid>
          <Grid item lg={6} className={classes.memes}>
            {/*}<Masonry
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >*/}
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id} masonry={masonry}/>
              )}
            {/*}</Masonry>*/}
          </Grid>
          <Grid item lg={3}>
          test
          </Grid>
        </Grid>
      </div>
    )
  }
}

MostPopular.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MostPopular);
