import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

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
        const {classes} = this.props;

        const fullList = (
            <div className={classes.listFull}>
                <div className={classes.center}>
                    <h2>hi {this.props.name.substr(0, this.props.name.indexOf(' '))}</h2> <img src={this.props.picture} alt="profile"/>
                    <Divider/>
                </div>
                <div className={classes.left}>
                  <List>
                    <ListItem button component="a" href="#">
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Favorites" />
                    </ListItem>

                    <ListItem button component="a" href="#">
                      <ListItemIcon>
                        <CloudUploadIcon />
                      </ListItemIcon>
                      <ListItemText primary="My Memes" />
                    </ListItem>

                    <ListItem button component="a" href="http://localhost:3001/auth/logout">
                      <ListItemIcon>
                        <PowerSettingsNewIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </div>
            </div>
        );
        return (
            <div>
                <IconButton style={{color: '#fff'}} aria-label="Menu" onClick={this.toggleDrawer('right', true)}>
                  <MenuIcon />
                </IconButton>

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
