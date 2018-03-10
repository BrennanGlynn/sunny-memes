import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Typography, Grid, Avatar, Divider } from 'material-ui/';
import StarIcon from 'material-ui-icons/Star';

const styles = theme => ({
  root: {
    textAlign: 'right',
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
  rightPanel: {
    marginTop: 5,
  },
  picture: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'inline-block',
  },
  userName: {
    marginLeft: 5,
    position: 'relative',
    top: -25,
    display: 'inline-block',
  },
});

class RightPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Grid container spacing={0} justify="flex-start" className={classes.rightPanel}>
          <Grid item>
            <img src={"../images/characters/dennis.jpg"} className={classes.picture} alt="profile" />
            <Typography type="caption" className={classes.userName}>
              Ben Jeske
            </Typography>
            <Divider />
            <List component="nav">
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Trending" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Top Favorites" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Most Recent" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles) (RightPanel);
