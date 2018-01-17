import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
  listFull: {
    width: '250px',
  },
  center: {
    textAlign: 'center',
  },
};

class RightDrawer extends Component {

    state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };

    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    render() {
      const { classes } = this.props;

      const fullList = (
      <div className={classes.listFull}>
        <div className={classes.center}>
          <h2>Profile Pic Here</h2>
          <Divider />
        </div>
        <div className={classes.center}>
          <List>
            <FontAwesome name='rocket' />
            Favorites
          </List>
          <Divider />
          <List>My Uploads</List>
          <Divider />
          <List>Logout</List>
          <Divider />
        </div>
      </div>
    );
      return (
        <div>
          <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>

          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
              {fullList}
            </div>
          </Drawer>
        </div>
      );
    }
}

export default withStyles(styles)(RightDrawer);
