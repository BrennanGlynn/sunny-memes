import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import {Grid} from "material-ui/";
import LeftPanel from "./LeftPanel";
import RightPanelContainer from "../../../containers/home/panels/RightPanelContainer";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  memeWrapper: {
    margin: 'auto',
  },
  leftPanel: {
    marginTop: 0,
  },
  rightPanel: {
    paddingTop: 10,
    width: 250,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  [theme.breakpoints.down('xs')]: {
    panelContainer: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('md')]: {
    leftPanelContainer: {
      display: 'none',
    },
  },
})

class WrapperPanels extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={'center'} spacing={0}>
        <Grid item className={classes.panelContainer + ' ' + classes.leftPanelContainer}>
          <Grid container spacing={0} justify="flex-end" className={classes.leftPanel}>
            <Grid item>
              <LeftPanel/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} lg={4}>
          {this.props.children}
        </Grid>
        <Grid item className={classes.panelContainer}>
          <Grid container spacing={0} justify="center" className={classes.rightPanel + " " +  classes.rightPanelStick}>
            <Grid item>
              <RightPanelContainer/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(WrapperPanels);
