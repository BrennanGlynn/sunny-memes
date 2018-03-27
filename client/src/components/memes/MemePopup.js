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
    textDecoration: 'none',
    display: 'inline-block',
    marginLeft: 10,
    position: 'relative',
    top: '-15px',
  },
  picture: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginTop: 5,
    marginLeft: 5,
    display: 'inline-block',
  },
  description: {
    padding: 10,
    paddingBottom: 15,
  },
  uploadedByName: {
    fontWeight: 500,
    color: '#343434',
  },
  [theme.breakpoints.only('xs')]: {
    link: {
      position: 'relative',
      top: '0px',
    },
    titleContainer: {
      padding: 4,
      marginRight: 20,
    },
    openModal: {
      top: '0%',
      margin: '0 auto',
      width: '98%',
      height: '100%',
      overflow: 'scroll',
    },
    picture: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      display: 'inline-block',
    },
    fullImageContainer: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: 'black',
      position: 'relative',
      marginTop: 50,
    },
    fullImage: {
      maxHeight: 500,
      maxWidth: '100%'
    },
    fullImageComments: {
      background: '#fff',
    },
    leftArrow: {
      display: 'none',
    },
    rightArrow: {
      display: 'none',
    },
  },
  [theme.breakpoints.between('sm', 'xl')]: {
    leftArrow: {
      position: 'fixed',
      top: '40%',
      left: '-5%',
      transform: 'scale(4.5)',
      color: '#fff',
    },
    rightArrow: {
      position: 'fixed',
      top: '40%',
      right: '-5%',
      transform: 'scale(4.5)',
      color: '#fff',
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
      minHeight: 800,
    },
    fullImageContainer: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: 'black',
      position: 'relative',
      height: 800,
    },
    fullImage: {
      maxHeight: 500,
      maxWidth: '100%'
    },
    fullImageComments: {
      padding: 10,
      marginTop: 20,
    },
    memeCommentsWrapper: {
      width: '100%',
    },
    root: {
      width: '100%',
      height: '100%',
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    menuContainer: {
      textAlign: 'right',
    },
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
    const { classes, data, changeCurrentIndex, lastIndex, stateIndex, admin, auth, openModal, zoomed } = this.props;
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
                  <Grid item xs={12} md={7} className={classes.fullImageContainer}>
                    <Grid container spacing={0} justify="center" alignItems="center">
                      <Grid item>
                          <img className={classes.fullImage} src={data.url} alt="fullMeme" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5} className={classes.fullImageComments}>
                    <Grid container spacing={0} wrap="nowrap">
                      <Grid item xs={7} md={8} className={classes.titleContainer}>
                        {/*Meme Author*/}
                        <img src={data.uploaded_by.picture || "/images/user-icon.png"} className={classes.picture} alt="profile"/>
                        <NavLink className={classes.link} to={`/user/${data.uploaded_by._id}`}>
                          <Typography type="subheading" id="simple-modal-description">
                            <span className={classes.uploadedByName}>{data.uploaded_by.name}</span><br /> on March 11th, 2018
                          </Typography>
                        </NavLink>
                      </Grid>
                      <Grid item md={4}>
                        {/*Popup Modal Header Row*/}
                        <Grid container justify="flex-end">
                          {/*Options Menu and Close Button*/}
                          <Grid item>

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
                              {(auth.user._id === data.uploaded_by._id || admin) &&
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
                    </Grid>
                    <Grid container spacing={0}>
                      <Grid item className={classes.description}>
                        {/*Title*/}
                        <Typography variant="caption" type="caption" id="modal-title">
                          {data.title}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <div className={classes.memeCommentsWrapper}>
                      <MemeComments meme={data} user={auth.user} />
                    </div>
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
