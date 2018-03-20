import React, {Component} from 'react';
import {Drawer, IconButton, withStyles} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu';
import LeftPanel from '../panels/LeftPanel';

const styles = {
}

class LeftDrawer extends Component {

  goTo(route) {
    window.location.assign(route)
  }

  render() {
    const {open, openRightDrawer} = this.props
    return(
      <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={openRightDrawer}
      >
            <MenuIcon/>
        </IconButton>
        <Drawer
          open={open}
          onClose={openRightDrawer}
        >
          <LeftPanel />
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(LeftDrawer)
