import React, {Component} from 'react';
import {Drawer, IconButton, withStyles} from 'material-ui'
import PersonIcon from 'material-ui-icons/Person';
import RightPanelContainer from "../../../containers/home/panels/RightPanelContainer";

const styles = theme => ({
  picture: {
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'inline-block',
  },
});

class RightDrawer extends Component {

  goTo(route) {
    window.location.assign(route)
  }

  render() {
    const {classes, open, openUserDrawer, auth} = this.props
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open user drawer"
          onClick={openUserDrawer}
        >
          <img src={auth.user.picture} className={classes.picture} alt="profile"/>
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={openUserDrawer}
        >
          <RightPanelContainer/>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(RightDrawer)
