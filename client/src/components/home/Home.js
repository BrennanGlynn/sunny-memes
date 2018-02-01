import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar, Button, Toolbar} from 'material-ui';
import HomeIcon from 'material-ui-icons/Home';
import LoginModal from '../login/LoginModal';
import FrontBanner from './FrontBanner';
import UploadModal from '../upload/UploadModal';
import PleaseLogin from '../PleaseLogin';
import Memes from '../../containers/memes/Memes';
import MyMemes from '../../containers/memes/MyMemes';
import Empty from '../Empty';
import NavMenu from './NavMenu';
import AdminInterface from '../admin/AdminInterface'

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
  label: {
    color: 'white'
  }
};


const Home = ({classes, onLogoutClick, auth}) => (
  <div>
    {!auth.pending &&
    <div>
      {/*// Navbar //*/}
      <AppBar position="static">
        <Toolbar>
          <div className={classes.flex}>
            <Button href='/' className={classes.label}><HomeIcon style={{marginRight: 16}}/> Home</Button>
          </div>
          {!auth.loggedIn && <LoginModal/>}
          {auth.loggedIn && <UploadModal/>}
          {auth.loggedIn && <NavMenu name={auth.user.name} picture={auth.user.picture} logout={onLogoutClick}/>}
        </Toolbar>
      </AppBar>

      {/*// Pages //*/}
      <Switch>
        <Route path='/' exact component={!auth.pending && !auth.loggedIn ? FrontBanner : Memes}/>
        <Route path='/memes' exact component={Memes}/>
        <Route path='/mymemes' component={!auth.pending && auth.loggedIn ? MyMemes : PleaseLogin}/>
        <Route path='/admin' component={AdminInterface}/>
      </Switch>
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
