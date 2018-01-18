import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

var FontAwesome = require('react-fontawesome');

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
    faIcon: {
        marginLeft: '5px',
        paddingRight: '5px'
    }
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
                    <a href="#">
                        <List>
                            <FontAwesome className={classes.faIcon}
                                         name='star'/>
                            Favorites
                        </List>
                    </a>
                    <Divider/>
                    <a href="#">
                        <List>
                            <FontAwesome className={classes.faIcon}
                                         name='upload'/>
                            My Uploads
                        </List>
                    </a>
                    <Divider/>
                    <a href="http://localhost:3001/auth/logout">
                        <List>
                            <FontAwesome className={classes.faIcon}
                                         name='sign-out'/>
                            Logout
                        </List>
                    </a>
                    <Divider/>
                </div>
            </div>
        );
        return (
            <div>
                <Button onClick={this.toggleDrawer('right', true)}>MENU</Button>

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
