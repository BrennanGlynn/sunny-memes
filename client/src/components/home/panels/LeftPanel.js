import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Grid, Divider} from 'material-ui/';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import FilterCharacterList from "../../../containers/sorting/FilterCharacterListContainer";

const styles = theme => ({
  // [theme.breakpoints.down('xs')]: {
  //   desktopMenu: {
  //     display: 'none',
  //   },
  // },
  root: {
    textAlign: 'right',
    width: 250,
    minHeight: "100%",
    marginRight: 5,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 0,
  },
});

class LeftPanel extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root + " " + classes.desktopMenu}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <List component="nav">
              {/*<ListItem button>*/}
                {/*<ListItemText primary="Trending" />*/}
                {/*<ListItemIcon className={classes.icon}>*/}
                  {/*<TrendingUpIcon />*/}
                {/*</ListItemIcon>*/}
              {/*</ListItem>*/}
              <a href="/mostpopular">
                <ListItem button>
                  <ListItemText primary="Top Favorites" />
                  <ListItemIcon className={classes.icon}>
                    <StarIcon />
                  </ListItemIcon>
                </ListItem>
              </a>
              <a href="mostRecent">
                <ListItem button>
                  <ListItemText primary="Most Recent" />
                  <ListItemIcon className={classes.icon}>
                    <AccessTimeIcon />
                  </ListItemIcon>
                </ListItem>
              </a>
            </List>

            <FilterCharacterList />
          </Grid>
        </Grid>
        <Divider />
      </div>
    )
  }
}

export default withStyles(styles) (LeftPanel);
