import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography, Grid, Paper} from "material-ui/";
import MostPopularContainer from "../../containers/pages/MostPopularContainer";

let bannerBackgroundUrl = '/images/front-page-dayman-nightman.png'
const styles = theme => ({
  // bannerWrapper: {
  //   textAlign: 'center',
  //   position: 'relative',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   height: '350px',
  //   paddingTop: '5px',
  //   backgroundColor: '#2f8a45',
  //   backgroundImage: 'url(' + bannerBackgroundUrl + ')',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'center',
  // },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 12,
    marginLeft: "35%",
    width: "25%",
    backgroundColor: 'rgba(255,255,255,.7)',
  }),
  h1: {
    color: '#2f8a45',
  },
  p: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});


class FrontBanner extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <MostPopularContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FrontBanner)
