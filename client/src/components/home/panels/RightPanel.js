import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {Button, Divider, Grid, Typography} from 'material-ui/';
import StarIcon from 'material-ui-icons/Star';
import KeyboardBackspaceIcon from 'material-ui-icons/KeyboardBackspace';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';
import LoginModal from "../../login/LoginModal";
import {NavLink} from "react-router-dom";

const styles = theme => ({
  root: {
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
  },
  navList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listLink: {
    textDecoration: 'none',
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
    marginTop: 12.5,
    marginLeft: 10,
  },
  logout: {
    fontSize: 10,
    marginLeft: 5,
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
  <div className={classes.desktopMenu}>
    {auth.loggedIn ?
      <div>
        <Grid container spacing={8}>
          <Grid item>
            <NavLink to={`/user/${auth.user.id}`} className={classes.listLink}>
              <img src={auth.user.picture} className={classes.picture} alt="profile"/>
            </NavLink>
          </Grid>
          <Grid>
            <NavLink to={`/user/${auth.user.id}`} className={classes.listLink}>
              <Typography type="caption" className={classes.userName}>
                {auth.user.name}
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
        <Divider/>
        <List component="nav" className={classes.navList}>
            <ListItem onClick={logout.bind(this)} button className={classes.icon}>
              <ListItemIcon>
                <KeyboardBackspaceIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout"/>
            </ListItem>
          <Divider/>
          <NavLink to="/favorites" className={classes.listLink}>
            <ListItem button className={classes.icon}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="My Favorites"/>
            </ListItem>
          </NavLink>
          <Divider/>
          <NavLink to="/mymemes" className={classes.listLink}>
            <ListItem button className={classes.icon}>
              <ListItemIcon>
                <PhotoLibraryIcon/>
              </ListItemIcon>
              <ListItemText primary="My Memes"/>
            </ListItem>
          </NavLink>
        </List>
        <Divider/>
        <div style={{marginTop: 10, textAlign: 'center'}}>
          <NavLink to="/addmeme" className={classes.listLink}>
            <Button color="primary" variant="raised">Upload</Button>
          </NavLink>
        </div>
      </div> :
      <div>
        <LoginModal/>
      </div>}
  </div>


export default withStyles(styles)(RightPanel);
