import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid, Button, Divider, ListItemIcon, Modal, Typography} from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import ReportProblemIcon from 'material-ui-icons/ReportProblem';
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
    height: 'auto',
  },
  fullImage: {
    minWidth: 325,
    width: '100%',
  },
  root: {
    width: '100%',
    height: '80%',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftArrow: {
    position: 'fixed',
    top: '40%',
    left: '-6%',
    fontSize: 100,
    color: '#fff',
  },
  rightArrow: {
    position: 'fixed',
    top: '40%',
    right: '-6%',
    fontSize: 100,
    color: '#fff',
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

  handleDelete(memeId) {
    this.props.deleteMeme(memeId)
    this.setState({anchorEl: null})
  }

  render() {
    const { classes, data, changeCurrentIndex, lastIndex, stateIndex, user, admin, openModal, zoomed } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        {data ?
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={zoomed}
            onClose={openModal}
            disableAutoFocus={true}
          >
            <div className={classes.openModal}>
              <Grid container justify="flex-end">
                <IconButton className={classes.leftArrow} aria-label="Previous Meme">
                  <KeyboardArrowLeft onClick={changeCurrentIndex.bind(this, stateIndex - 1, lastIndex)}/>
                </IconButton>
                <IconButton className={classes.rightArrow} aria-label="Next Meme">
                  <KeyboardArrowRight onClick={changeCurrentIndex.bind(this, stateIndex + 1, lastIndex)}/>
                </IconButton>
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
                    {(user === data.uploaded_by || admin) &&
                    <MenuItem onClick={this.handleDelete.bind(this, data._id)}>
                      <ListItemIcon>
                        <HighlightOffIcon/>
                      </ListItemIcon>Delete
                    </MenuItem>}
                    <Divider/>
                    <MenuItem onClick={this.handleClose}>
                      <ListItemIcon>
                        <ReportProblemIcon/>
                      </ListItemIcon>Report
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              <Divider/>

              <div className={classes.root}>
                <Grid container spacing={8} justify="center">
                  <Grid item xs={6}>
                    <Typography type="title" id="modal-title">
                      {data.title}
                    </Typography>
                    <Typography type="subheading" id="simple-modal-description">
                      {data.author_name || data.uploaded_by}
                    </Typography>
                    <img className={classes.fullImage} src={data.url} alt="fullMeme" />
                  </Grid>
                  <Grid item xs={6}>
                    <MemeComments />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Modal> :
          <div></div>}
      </div>
    );
  }
}

export default withStyles(styles)(MemePopup)
