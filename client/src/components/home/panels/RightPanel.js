import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {Button, Divider, Grid, Typography} from 'material-ui/';
import StarIcon from 'material-ui-icons/Star';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';
import LoginModal from "../../login/LoginModal";
import SunnyScore from "../../SunnyScore";
import {NavLink} from "react-router-dom";

const styles = theme => ({
  root: {
    textAlign: 'right',
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  rightPanel: {
    width: 220,
    marginTop: 5,
  },
  navList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listLink: {
    color: '#43a047',
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
    textDecoration: 'none',
  },
  icon: {
    paddingLeft: 5,
  },
});

const RightPanel = ({classes, logout, auth}) =>
  <div className={classes.desktopMenu + ' ' + classes.rightPanel}>
    {auth.loggedIn ?
      <div>
        <img src={auth.user.picture} className={classes.picture} alt="profile"/>
        <NavLink to={`/user/${auth.user.id}`}>
          <Typography type="caption" className={classes.userName}>
            {auth.user.name}
          </Typography>
        </NavLink>
        <Typography type="caption" className={classes.logout}>
          <a onClick={logout.bind(this)}>
            Logout
          </a>
        </Typography>
        <Divider/>
        <List component="nav" className={classes.navList}>
          <NavLink to="/favorites" style={{ textDecoration: 'none' }} className={classes.listLink}>
            <ListItem button className={classes.icon}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="My Favorites"/>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink to="/mymemes" style={{ textDecoration: 'none' }} className={classes.listLink}>
            <ListItem button className={classes.icon}>
              <ListItemIcon>
                <PhotoLibraryIcon/>
              </ListItemIcon>
              <ListItemText primary="My Memes"/>
            </ListItem>
          </NavLink>
        </List>
        <Divider/>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <NavLink to="/addmeme" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="raised">Upload</Button>
          </NavLink>
        </div>
      </div> :
      <div>
        <LoginModal/>
      </div>}
  </div>


export default withStyles(styles)(RightPanel);
