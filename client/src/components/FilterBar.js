import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class FilterBar extends Component {
  render() {
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            <IconButton
              aria-haspopup="true"
              onClick={this.handleOpen}
            >
              <Typography variant="caption" className={classes.filterText}>
                Filter
              </Typography>
              <FilterList/>
            </IconButton>
          </Toolbar>
        </AppBar>
      <Grid container className={classes.root} justify="flex-end" alignItems="center" spacing={0}>
        <Grid item xs={12} md={10} lg={5} xl={4}>
            <IconButton
              aria-haspopup="true"
              onClick={this.handleOpen}
            >
              <Typography variant="caption" className={classes.filterText}>
                Filter
              </Typography>
              <FilterList/>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default FilterBar;
