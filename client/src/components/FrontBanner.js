import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Paper, Typography} from 'material-ui';

let bannerBackgroundUrl = '/images/dayman-nightman.png'
const styles = theme => ({
  bannerWrapper: {
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '350px',
    paddingTop: '5px',
    backgroundColor: '#2f8a45',
    backgroundImage: 'url(' + bannerBackgroundUrl + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
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
    const introP = "This you should upload. I leave memes. Good. Thank you, thank you. " +
      "If you share me, I'm hot. What? Taxes, they'll be lower... son. The meme" +
      " upload is the right thing to do Philadelphia, so do."
    return (
      <div className={classes.bannerWrapper}>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h1" className={classes.h1}>
            Hello Fellow American
          </Typography>
          <Typography component="p" className={classes.p}>
            {introP}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(FrontBanner)
