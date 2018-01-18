import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar, Toolbar} from 'material-ui';
import LoginModal from './LoginModal';
import AddMeme from './AddMeme';
import Banner from './FrontBanner';
import MemeCard from './MemeCard';
import RightDrawer from './RightDrawer';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebookId: '',
            name: '',
            picture: 'http://localhost:3001/images/user-icon.png',
        }
    }

    componentDidMount() {
        // Get the current users details from the backend server
        this.callApi('auth/me')
            .then(res => {
                if (this.state.facebookId !== res.id) {
                    this.setState({facebookId: res.id, name: res.name, picture: res.picture})
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    // method to call api
    callApi = async (route) => {
        const response = await fetch(route, {credentials: 'include'});
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/*// Navbar //*/}
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.flex}>
                            <img src="http://localhost:3001/images/sunny-logo.png" alt="logo"/>
                        </div>
                        {!this.state.name && <LoginModal/>}
                        {this.state.name && <RightDrawer name={this.state.name} picture={this.state.picture} />}
                    </Toolbar>
                </AppBar>

                {/*// Pages //*/}
                <Switch>
                    <Route path='/' exact component={Banner} />
                    <Route path='/addMeme' component={AddMeme} />
                </Switch>

                {/*// Example of a meme card. //*/}
                {/*// Will move once completed // */}
                <MemeCard memeData={{
                    "url" : "/images/memes/10156593256159947cold.jpg",
                    "uploaded_by" : "10156593256159947",
                    "favorites" : 0,
                    "visits" : 0,
                    "tags" : [ ],
                    "characters" : [
                    "charlie"
                    ],
                }}
                />

            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
