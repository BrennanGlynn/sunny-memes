import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid} from "material-ui/";
import MostPopularContainer from "../../containers/pages/MostPopularContainer";

const styles = theme => ({
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
