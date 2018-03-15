import React, {Component} from 'react';
import {Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';
import UploadIcon from 'material-ui-icons/Publish';
import RightPanel from '../home/RightPanel';

const styles = theme => ({
});

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
        {/*}  <List component="nav">
            <Divider />
            <ListItem button onClick={this.goTo.bind(this, 'addmeme')}>
              <ListItemIcon>
                <UploadIcon/>
              </ListItemIcon>
              <ListItemText primary="Upload Meme"/>
            </ListItem>
            <Divider />
            <ListItem button onClick={this.goTo.bind(this, 'favorites')}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary="Favorites"/>
            </ListItem>
            <Divider />
            <ListItem button onClick={this.goTo.bind(this, 'mymemes')}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="My Memes"/>
            </ListItem>
            <Divider />
            <ListItem button onClick={this.props.logout}>
              <ListItemIcon>
                <PowerIcon/>
              </ListItemIcon>
              <ListItemText primary="Log out"/>
            </ListItem>
            <Divider />
          </List>*/}
          <RightPanel />
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(UserDrawer)
