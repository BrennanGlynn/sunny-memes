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

const styles = theme => ({
  [theme.breakpoints.only('xs')]: {
    openModal: {
      minWidth: '95%',
      width: '95%',
      padding: 0,
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
  },
  picture: {
    position: 'relative',
    top: 2,
    width: 40,
    height: 40,
    marginLeft: 5,
    borderRadius: '50%',
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
    width: '50%',
    maxWidth: '90%',
    height: 'auto',
  },
  fullImage: {
    width: '94%',
  },
  fullImageContainer: {
    textAlign: 'center',
  },
  root: {
    width: '100%',
    height: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
  modalTitle: {
    textAlign: 'left',
  },
  flex: {
    flexGrow: 1,
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
    const { classes, data, user, admin, openModal, zoomed } = this.props;
    const { anchorEl } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={zoomed}
        onClose={openModal}
        disableAutoFocus={true}
      >
        <div className={classes.openModal}>
          <Grid container alignItems="center" justify="flex-start">
            <IconButton className={classes.leftArrow} aria-label="Previous Meme">
              <KeyboardArrowLeft/>
            </IconButton>
            <IconButton className={classes.rightArrow} aria-label="Next Meme">
              <KeyboardArrowRight/>
            </IconButton>
            <Grid item className={classes.flex}>
              <a>
                <img
                  src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13907208_10155130051273508_4390268290353924855_n.jpg?oh=533cdb8478393477373035d285877209&oe=5AE15928"
                  className={classes.picture} alt="profile"/>
              </a>
            </Grid>
            <Grid item className={classes.modalTitle + classes.flex}>
              <Typography type="title" id="modal-title">
                {data.title}
              </Typography>
              <Typography type="subheading" id="simple-modal-description">
                {data.uploaded_by}
              </Typography>
            </Grid>
            <Grid item className={classes.flex}>
              <IconButton
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
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
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} md={6} className={classes.fullImageContainer}>
                    <img className={classes.fullImage} src={data.url} alt="fullMeme" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MemeComments />
                </Grid>
              </Grid>
            </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(MemePopup)
