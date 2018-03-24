import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from 'material-ui/';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';
import IconButton from 'material-ui/IconButton';

const styles = {
  uploadsTotal: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  uploadsTotalIcon: {
    color: '#fed035',
  },
  uploadsTotalNumber: {
    color: '#fff',
    marginLeft: 5,
  },
}

class UploadsTotal extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div>
        <IconButton aria-label="Total Favorites">
          <PhotoLibraryIcon className={classes.uploadsIcon} />
          <Typography type={'body2'} className={classes.uploadsTotalNumber}>
            568
          </Typography>
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles) (UploadsTotal);
