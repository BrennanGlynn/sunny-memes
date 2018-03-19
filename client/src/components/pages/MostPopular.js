import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Grid} from "material-ui/";
import LeftPanel from "../home/LeftPanel";
import RightPanelContainer from "../../containers/panels/RightPanelContainer";

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
              {memesArray.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
              )}
          </Grid>
          <Grid item md={3} lg={2} className={classes.rightPanelContainer}>
            <Grid container spacing={0} className={classes.rightPanel}>
              <Grid item>
                <RightPanelContainer/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(MostPopular);
