import React, {Component} from "react"
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from "material-ui/ExpansionPanel";
import {Avatar, Chip, Divider, Grid, Typography} from "material-ui/";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import MostPopularContainer from "../../containers/Pages/MostPopularContainer";
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

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class FrontPage extends Component {
  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Grid container justify="flex-right" spacing="0">
          <Grid xs={3}>
            <FilterModal />
          </Grid>
        </Grid>




        <Grid container justify="center" align="center" spacing="0">
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Select Characters</Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails className={classes.details}>
              <Grid item xs={12} sm={12} md={12}>
                <Chip
                  avatar={<Avatar src="/images/dennis.jpg" />}
                  label="Dennis"
                  onClick={handleClick}
                  className={classes.chip}
                />
                <Chip
                  avatar={<Avatar src="/images/mac.jpg" />}
                  label="Mac"
                  onClick={handleClick}
                  className={classes.chip}
                />
                <Chip
                  avatar={<Avatar src="/images/charlie.jpg" />}
                  label="Charlie"
                  onClick={handleClick}
                  className={classes.chip}
                />
                <Chip
                  avatar={<Avatar src="/images/dee.jpg" />}
                  label="Dee"
                  onClick={handleClick}
                  className={classes.chip}
                />
                <Chip
                  avatar={<Avatar src="/images/frank.jpg" />}
                  label="Frank"
                  onClick={handleClick}
                  className={classes.chip}
                />
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
