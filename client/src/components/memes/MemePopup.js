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
import MemeComments from './comments/MemeComments';
import {NavLink} from "react-router-dom";

const styles = theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  [theme.breakpoints.only('xs')]: {
    openModal: {
      width: '95%',
    },
    leftArrowContainer: {
      backgroundColor: 'red',
    },
    leftArrow: {
      position: 'fixed',
      top: '100%',
      left: '-2.5%',
      fontSize: 100,
      color: '#fff',
    },
    rightArrow: {
      position: 'fixed',
      top: '100%',
      right: '-2.5%',
      fontSize: 100,
      color: '#fff',
    },
  },
  [theme.breakpoints.between('sm', 'xl')]: {
    leftArrow: {
      position: 'fixed',
      top: '40%',
      left: '-4%',
      fontSize: 100,
      color: '#fff',
    },
    rightArrow: {
      position: 'fixed',
      top: '40%',
      right: '-4%',
      fontSize: 100,
      color: '#fff',
    },
  },
  openModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '32',
    width: '90%',
    height: '95%',
  },
  fullImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  fullImage: {
    maxHeight: 500,
    maxWidth: '100%'
  },
  root: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalTitle: {
    textAlign: 'left',
  },
  titleContainer: {
    textAlign: 'left',
  },
  menuContainer: {
    textAlign: 'right',
  },
})

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
    const { classes, data, changeCurrentIndex, lastIndex, stateIndex, user, admin, auth, openModal, zoomed } = this.props;
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

              {/*previous meme button*/}
              <div className={classes.leftArrowContainer} onClick={changeCurrentIndex.bind(this, stateIndex - 1, lastIndex)}>
                <IconButton className={classes.leftArrow} aria-label="Previous Meme">
                  <KeyboardArrowLeft />
                </IconButton>
              </div>
              {/*next meme button*/}
              <div className={classes.rightArrowContainer} onClick={changeCurrentIndex.bind(this, stateIndex + 1, lastIndex)}>
                <IconButton className={classes.rightArrow} aria-label="Next Meme">
                  <KeyboardArrowRight />
                </IconButton>
              </div>
              <Divider/>

              {/*Popup Modal Body*/}
                <Grid container spacing={0} justify="center">
                  <Grid item xs={12} md={6}>
                    <div className={classes.fullImageContainer}>
                      <img className={classes.fullImage} src={data.url} alt="fullMeme" />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={0}>
                      <Grid item className={classes.titleContainer}>
                        {/*Meme Author*/}
                        <NavLink className={classes.link} to={`/user/${data.uploaded_by._id}`}>
                          <Typography type="subheading" id="simple-modal-description">
                            {data.uploaded_by.name}
                          </Typography>
                        </NavLink>

                        {/*Title*/}
                        <Typography variant="title" type="title" id="modal-title">
                          {data.title}
                        </Typography>
                      </Grid>

                      {/*Popup Modal Header Row*/}
                      <Grid container justify="flex-end">
                        {/*Options Menu and Close Button*/}
                        <Grid item md={6} className={classes.menuContainer}>

                          {/*options menu button*/}
                          <IconButton
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          {/*close button*/}
                          <Button onClick={openModal}>Close</Button>

                          {/*options menu*/}
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                          >

                            {/*hide button*/}
                            <MenuItem onClick={this.handleClose}>
                              <ListItemIcon>
                                <RemoveRedEyeIcon/>
                              </ListItemIcon>Hide
                            </MenuItem>
                            <Divider/>

                            {/*delete button*/}
                            {(user === data.uploaded_by || admin) &&
                            <MenuItem onClick={this.handleDelete.bind(this, data._id)}>
                              <ListItemIcon>
                                <HighlightOffIcon/>
                              </ListItemIcon>Delete
                            </MenuItem>}
                            <Divider/>

                            {/*report button*/}
                            <MenuItem onClick={this.handleClose}>
                              <ListItemIcon>
                                <ReportProblemIcon/>
                              </ListItemIcon>Report
                            </MenuItem>
                          </Menu>
                        </Grid>
                      </Grid>
                    </Grid>
                    <MemeComments meme={data} user={user} />
                  </Grid>
                </Grid>
            </div>
          </Modal> :
          <div></div>}
      </div>
    );
  }
}

export default withStyles(styles)(MemePopup)
