import React, {Component} from "react"
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Grid} from "material-ui/";
import MostPopularContainer from "../../containers/pages/MostPopularContainer";
import FilterModal from "../FilterModal.js";

const styles = theme => ({
  root: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  chip: {
    marginTop: 5,
    marginRight: 5,
  },
  details: {
    alignItems: 'center',
    verticalAlign: 'center',
    display: 'flex',
  },
  column: {
    flexBasis: '50%',
    textAlign: 'center',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class FrontPage extends Component {
  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Grid container justify="flex-end" spacing={0}>
          <Grid item xs={3}>
            <FilterModal />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <MostPopularContainer />
          </Grid>
        </Grid>
      </div>
    )
  }
}

FrontPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(FrontPage);
