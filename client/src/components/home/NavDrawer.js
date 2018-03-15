import React, {Component} from 'react';
import {Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import HomeIcon from 'material-ui-icons/Home';
import MenuIcon from 'material-ui-icons/Menu';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import LeftPanel from '../home/LeftPanel';

const styles = {
}

class NavDrawer extends Component {

  goTo(route) {
    window.location.assign(route)
  }

  render() {
    const {open, openRightDrawer} = this.props
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
        {/*  <List component="nav">
            <Divider />
            <ListItem
              button
              onClick={this.goTo.bind(this, '/')}
            >
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={this.goTo.bind(this, '/mostPopular')}
            >
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="Most Popular" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={this.goTo.bind(this, '/mostRecent')}
            >
              <ListItemIcon>
                <AccessTimeIcon/>
              </ListItemIcon>
              <ListItemText primary="Recently Uploaded" />
            </ListItem>
            <Divider />
          </List>*/}
          <LeftPanel />
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(NavDrawer)
