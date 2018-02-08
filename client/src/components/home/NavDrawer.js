import React, {Component} from 'react';
import {Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import MenuIcon from 'material-ui-icons/Menu';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';

const styles = {
}

class NavDrawer extends Component {

  render() {
    const {classes, open, openRightDrawer} = this.props
    return(
      <div>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={openRightDrawer}
      >
            <MenuIcon/>
        </IconButton>
        <Drawer
          open={open}
          onClose={openRightDrawer}
        >
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="Most Popular" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccessTimeIcon/>
              </ListItemIcon>
              <ListItemText primary="Recently Uploaded" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(NavDrawer)