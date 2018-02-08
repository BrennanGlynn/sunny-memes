import React, {Component} from 'react';
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';
import UploadIcon from 'material-ui-icons/Publish'

const styles = {}

class UserDrawer extends Component {

  goTo(route) {
    window.location.assign(route)
  }

  render() {
    const {open, openUserDrawer} = this.props
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
          anchor="right"
          open={open}
          onClose={openUserDrawer}
        >
          <List component="nav">
            <ListItem button onClick={this.goTo.bind(this, 'addmeme')}>
              <ListItemIcon>
                <UploadIcon/>
              </ListItemIcon>
              <ListItemText primary="Upload Meme"/>
            </ListItem>
            <ListItem button onClick={this.goTo.bind(this, 'favorites')}>
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