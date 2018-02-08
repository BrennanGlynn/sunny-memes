import React, {Component} from 'react';
import {Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import MenuIcon from 'material-ui-icons/Menu';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';
import {withRouter} from 'react-router-dom'
import {Link} from "react-router-dom";

const styles = {}

class UserDrawer extends Component {

  goTo(route) {
    window.location.assign(route)
  }

  render() {
    const {classes, open, openUserDrawer} = this.props
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open user drawer"
          onClick={openUserDrawer}
        >
          <PersonIcon/>
        </IconButton>
        <Drawer
          open={open}
          onClose={openUserDrawer}
        >
          <List component="nav">
            <ListItem button button onClick={this.goTo.bind(this, 'favorites')}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="Favorites"/>
            </ListItem>
            <ListItem button onClick={this.goTo.bind(this, 'mymemes')}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="My Memes"/>
            </ListItem>
            <ListItem button onClick={this.props.logout}>
              <ListItemIcon>
                <PowerIcon/>
              </ListItemIcon>
              <ListItemText primary="Log out"/>
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(UserDrawer)