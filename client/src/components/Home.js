import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar, Toolbar} from 'material-ui';
import LoginModal from './LoginModal';
import FrontBanner from './FrontBanner';
import RightDrawer from './RightDrawer';
import PleaseLogin from './PleaseLogin';
import Memes from '../containers/Memes';
import MyMemes from '../containers/MyMemes';
import Empty from './Empty';
import NavMenu from './NavMenu';
import AdminInterface from './admin/AdminInterface'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  logo: {
    width: 100
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


const Home = ({classes, onLogoutClick, auth}) => (
  <div>
    {!auth.pending &&
    <div>
      {/*// Navbar //*/}
      <AppBar position="static">
        <Toolbar>
          <div className={classes.flex}>
            <img className={classes.logo} src="/images/sunny-logo.png" alt="logo"/>
          </div>
          {!auth.loggedIn && <LoginModal/>}
          {auth.loggedIn && <RightDrawer/>}
          {auth.loggedIn && <NavMenu name={auth.user.name} picture={auth.user.picture} logout={onLogoutClick}/>}
        </Toolbar>
      </AppBar>

      {/*// Pages //*/}
      <Switch>
        <Route path='/' exact component={!auth.pending && !auth.loggedIn ? FrontBanner : Empty}/>
        <Route path='/memes' exact component={Memes}/>
        <Route path='/mymemes' component={!auth.pending && auth.loggedIn ? MyMemes : PleaseLogin}/>
      </Switch>

      {/*Placeholder for admin interface move later*/}
      <AdminInterface/>
    </div>
    }
  </div>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default withStyles(styles)(Home)
