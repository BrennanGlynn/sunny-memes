import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import Masonry from "react-masonry-component";
import { Grid } from "material-ui/";
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";
import LeftPanel from "../home/LeftPanel";
import RightPanel from "../home/RightPanel";

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
    let masonry = this.masonry
    let memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }
    return (
      <div className={classes.siteBackground}>
        <Grid container spacing={0}>
          <Grid item md={3} lg={4} className={classes.leftPanelContainer}>
            <Grid container spacing={0} justify="flex-end" className={classes.leftPanel}>
              <Grid item>
                <LeftPanel />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.memes}>
            {/*}<Masonry
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              options={{fitWidth: true}}
              className={classes.memeWrapper}
            >*/}
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
              )}
            {/*}</Masonry>*/}
          </Grid>
          <Grid item md={3} lg={2} className={classes.rightPanelContainer}>
            <Grid container spacing={0} className={classes.rightPanel}>
              <Grid item>
                <RightPanel />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(MostPopular);
