import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import CameraRollIcon from 'material-ui-icons/CameraRoll';
import ImageIcon from 'material-ui-icons/Image';

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
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Upload a Meme</DialogTitle>
        <div>
          <List>
              <ListItem button>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Single Meme" />
              </ListItem>
            <ListItem button>
              <ListItemIcon>
                  <CameraRollIcon />
              </ListItemIcon>
              <ListItemText primary="Multiple Memes" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class MobileUploadButton extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const {classes} = this.props;
    return(
      <div className={classes.desktopHide}>
        <Button variant="fab" className={classes.desktopHide + " " + classes.uploadButton} onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    )
  }
}

MobileUploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};


export default withStyles(styles)(MobileUploadButton);
