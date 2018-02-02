import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {Grid, Button, Divider, ListItemIcon, Modal, Typography} from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import MemeComments from '../MemeComments';

const styles = {
  openModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '32',
    minWidth: '50%',
    maxWidth: '90%',
    height: '50%',
  },
  fullImage: {
    minWidth: 325,
    width: '100%',
  },
}


class MemePopup extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {classes, data, openModal, zoomed} = this.props;
    const { anchorEl } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={zoomed}
        onClose={openModal}
      >
        <div className={classes.openModal}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Button onClick={openModal}>Close</Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <RemoveRedEyeIcon/>
                  </ListItemIcon>Hide
                </MenuItem>
                <Divider/>
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <HighlightOffIcon/>
                  </ListItemIcon>Delete
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <div style={{width: '100%'}}>
                <Typography type="title" id="modal-title">
                  {data.title}
                </Typography>
                <Typography type="subheading" id="simple-modal-description">
                  {data.uploaded_by}
                </Typography>
                <img className={classes.fullImage} src={data.url} alt="fullMeme" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <MemeComments />
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(MemePopup)
