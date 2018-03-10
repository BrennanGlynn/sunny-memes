import React, { Component } from 'react';
import PropTypes from "prop-types"
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Button, Typography, Grid, Avatar, Divider } from 'material-ui/';
import LoginModal from "../login/LoginModal";
import NavMenu from "./NavMenu"
import StarIcon from 'material-ui-icons/Star';
import WbSunnyIcon from 'material-ui-icons/WbSunny';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';

const styles = theme => ({
  root: {
    textAlign: 'right',
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
  rightPanel: {
    paddingLeft: 5,
    marginTop: 5,
  },
  picture: {
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'inline-block',
  },
  userName: {
    marginLeft: 5,
    position: 'relative',
    top: -25,
    display: 'inline-block',
  },
  logout: {
    fontSize: 10,
    top: -20,
    left: 50,
    position: 'relative',
  },
  sunnyStatus: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  sunnyIcon: {
    marginRight: 2.5,
  },
  sunnyTotal: {
    paddingLeft: 5,
  },
  uploadButton: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: '#2c8943',
    color: '#fff',
  },
  icon: {
    paddingLeft: 5,
  },
});

class RightPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, onLogoutClick, auth } = this.props;
    return(
      <div>
        <Grid container spacing={0} justify="flex-start" className={classes.rightPanel}>
          <Grid item>
            <img src={"../images/characters/dennis.jpg"} className={classes.picture} alt="profile" />
            <Typography type="caption" className={classes.userName}>
              Ben Jeske
            </Typography>
            <Typography type="caption" className={classes.logout}>
              <a onClick={this.props.logout}>
                Logout
              </a>
            </Typography>
            <ListItem button className={classes.sunnyStatus}>
              <ListItemIcon className={classes.sunnyIcon}>
                <WbSunnyIcon />
              </ListItemIcon>
              <ListItemText className={classes.sunnyTotal} primary="5" />
            </ListItem>

            <Divider />
            <List component="nav">
              <a href="/favorites">
                <ListItem button className={classes.icon}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Favorites" />
                </ListItem>
              </a>
              <a href="/mymemes">
                <ListItem button className={classes.icon}>
                  <ListItemIcon>
                    <PhotoLibraryIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Memes" />
                </ListItem>
              </a>
            </List>
            <Divider />
            <Button variant="raised" className={classes.uploadButton} href="/addmeme">Upload</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

RightPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}

export default withStyles(styles) (RightPanel);
