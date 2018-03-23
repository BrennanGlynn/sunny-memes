import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import WbSunnyIcon from 'material-ui-icons/WbSunny';

const styles = {
  sunnyStatus: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  sunnyIcon: {
    marginRight: 2.5,
    color: 'gold',
  },
  sunnyTotal: {
    paddingLeft: 0,
  },
}

class FavoritesTotal extends Component {
  render() {
    return(
      <div>
        <ListItem button className={classes.sunnyStatus}>
          <ListItemIcon className={classes.sunnyIcon}>
            <WbSunnyIcon/>
          </ListItemIcon>
          <ListItemText className={classes.sunnyTotal} primary="5"/>
        </ListItem>
      </div>
    )
  }
}

export default FavoritesTotal;
