import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles';
import {Button, Drawer, Divider, Typography} from 'material-ui';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import AddMeme from "./AddMeme";

const styles = {
  listFull: {
    width: '250px',
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  marginRight: {
    marginRight: '5px',
  },
};

class RightDrawer extends Component {

  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open: open,
    });
  };

  render() {
    const {classes} = this.props;

    const fullList = (
      <div className={classes.listFull}>
        <div className={classes.center}>
          <Typography component="h2" type="display">Upload Meme</Typography>
          <Divider/>
        </div>
        <div className={classes.left}>
          <AddMeme/>
        </div>
      </div>
    );
    return (
      <div>
        <Button raised onClick={this.toggleDrawer(true)}>
          Upload
        </Button>

        <Drawer anchor="right" open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
          >
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(RightDrawer);
