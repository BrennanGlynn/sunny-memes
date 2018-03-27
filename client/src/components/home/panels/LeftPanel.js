import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {Divider} from 'material-ui/';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import FilterCharacterList from "../../../containers/sorting/FilterCharacterListContainer";
import {NavLink} from "react-router-dom";

const styles = theme => ({
  // [theme.breakpoints.down('xs')]: {
  //   desktopMenu: {
  //     display: 'none',
  //   },
  // },
  leftPanel: {
    textAlign: 'right',
    width: 250,
    backgroundColor: "#fff",
    height: '100%',
  },
  leftPanelStick: {
    // position: 'fixed',
    // top: 0,
    // backgroundColor: "#fff",
  },
  icon: {
    marginRight: -7,
  },
  listLink: {
    color: '#43a047',
  },
  navList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

class LeftPanel extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.leftPanel + " " + classes.desktopMenu}>
        <List component="nav" className={classes.navList}>
          {/*<ListItem button>*/}
          {/*<ListItemText primary="Trending" />*/}
          {/*<ListItemIcon className={classes.icon}>*/}
          {/*<TrendingUpIcon />*/}
          {/*</ListItemIcon>*/}
          {/*</ListItem>*/}
          <NavLink to="/mostpopular" style={{textDecoration: 'none'}} className={classes.listLink}>
            <ListItem button>
              <ListItemText primary="Top Favorites"/>
              <ListItemIcon className={classes.icon}>
                <StarIcon/>
              </ListItemIcon>
            </ListItem>
          </NavLink>
          <Divider/>
          <NavLink to="/mostRecent" style={{textDecoration: 'none'}} className={classes.listLink}>
            <ListItem button>
              <ListItemText primary="Most Recent"/>
              <ListItemIcon className={classes.icon}>
                <AccessTimeIcon/>
              </ListItemIcon>
            </ListItem>
          </NavLink>
          <Divider/>
        </List>

        <FilterCharacterList/>
        <Divider/>
      </div>
    )
  }
}

export default withStyles(styles)(LeftPanel);
