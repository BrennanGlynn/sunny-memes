import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const styles = theme => ({
  root: {
    textAlign: 'right',
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
  },
});

class LeftPanel extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Inbox" />
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Drafts" />
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default withStyles(styles) (LeftPanel);
