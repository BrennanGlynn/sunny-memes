import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  desktopHide: {
    [theme.breakpoints.between('md', 'xl')]: {
      display: 'none',
    },
  },
  uploadButton: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 15,
    right: 15,
    top: 'auto',
    left: 'auto',
    backgroundColor: '#2c8943',
    color: '#fff',
  },
});

class MobileUploadButton extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.desktopHide}>
        <Button variant="fab" aria className={classes.desktopHide + " " + classes.uploadButton} href="/addmeme">
          <AddIcon />
        </Button>
      </div>
    )
  }
}

MobileUploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MobileUploadButton);
