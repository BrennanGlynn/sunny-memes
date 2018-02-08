import React, {Component} from 'react';
import {Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';

const styles = {
  list: {
    width: 300
  }
}

class NavDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDrawer() {
    this.setState({open: !this.state.open})
  }

  render() {
    const {classes} = this.props
    return(
      <div>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleDrawer.bind(this)}
      >
        <PersonIcon/>
      </IconButton>
        <Drawer
          open={this.state.open}
          onClose={this.toggleDrawer.bind(this)}
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