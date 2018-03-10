import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Grid, Divider} from 'material-ui/';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';

const styles = theme => ({
  root: {
    textAlign: 'right',
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
});

class LeftPanel extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Trending" />
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
              </ListItem>
              <a href="/mostpopular">
                <ListItem button>
                  <ListItemText primary="Top Favorites" />
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                </ListItem>
              </a>
              <a href="mostRecent">
                <ListItem button>
                  <ListItemText primary="Most Recent" />
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                </ListItem>
              </a>
            </List>
          </Grid>
        </Grid>
        <Divider />
      </div>
    )
  }
}

export default withStyles(styles) (LeftPanel);
