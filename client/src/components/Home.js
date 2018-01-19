import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar, Button, Toolbar} from 'material-ui';
import LoginModal from './LoginModal';
import AddMeme from './AddMeme';
import FrontBanner from './FrontBanner';
import RightDrawer from './RightDrawer';
import PleaseLogin from './PleaseLogin';
import MemePage from './MemePage';
import MemeCard from './MemeCard';

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
      picture: '/images/user-icon.png',
      ready: false,
    }
  }

  componentDidMount() {
    // Get the current users details from the backend server
    this.callApi('auth/me')
      .then(res => {
        if (this.state.facebookId !== res.id) {
          this.setState({facebookId: res.id, name: res.name, picture: res.picture})
        }
        this.setState({ready: true})
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
    const {classes} = this.props;

    return (
      <div>
        {/*// Navbar //*/}
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex}>
              <img src="/images/sunny-logo.png" alt="logo"/>
            </div>
            {!this.state.name && <LoginModal/>}
            {this.state.name && <Button href="/addmeme" raised className={classes.button}>
              Upload
            </Button>}
            {this.state.name && <RightDrawer name={this.state.name} picture={this.state.picture}/>}
          </Toolbar>
        </AppBar>

        {/*// Pages //*/}
        <Switch>
          <Route path='/' component={this.state.name === '' && this.state.ready ? FrontBanner : ''}/>
          <Route path='/memes' component={MemePage}/>
          <Route path='/addMeme' component={this.state.name ? AddMeme : PleaseLogin}/>}
        </Switch>

        <MemeCard data={{
          "_id": "5a6162fc94387f127c7bc94a",
          "title": "Cultivating Mass",
          "url": "/images/memes/1015659325615994796748.jpg",
          "uploaded_by": "10156593256159947",
          "favorites": 0,
          "visits": 0,
          "tags": [],
          "characters": ["mac"],
          "__v": 0
        }
        }/>

      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
