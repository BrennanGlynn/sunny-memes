import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import {Grid, AppBar, Button, Toolbar} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import PersonIcon from 'material-ui-icons/Person';
import StarIcon from 'material-ui-icons/Star';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import LoginModal from '../login/LoginModal';
import FrontBanner from './FrontBanner';
import PleaseLogin from '../PleaseLogin';
import Memes from '../../containers/memes/Memes';
import MyMemes from '../../containers/memes/MyMemes';
import Empty from '../Empty';
import NavMenu from './NavMenu';
import AdminInterface from '../admin/AdminInterface'
import UploadForm from "../upload/UploadForm";
import UploadContainer from '../../containers/UploadContainer'
import MemeComments from '../MemeComments';
import NavDrawer from './NavDrawer'
import UserDrawer from './UserDrawer'

const styles = theme => ({
  [theme.breakpoints.between('xs', 'md')]: {
    desktopMenu: {
      display: 'none',
    },
    mobileLogo: {
      textAlign: 'center',
      position: 'relative',
      top: 7.5,
    },
    mobileMenuButton: {
      color: '#fff',
    },
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    mobileMenu: {
      display: 'none',
    },
  },
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  leftIcon: {
    textAlign: 'left',
  },
  rightIcon: {
    textAlign: 'right',
  },
  logo: {
    width: 100
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  mobileLogin: {
    marginTop: 10,
  },
  label: {
    color: 'white'
  }
});


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: false,
      userDrawerOpen: false
    }
  }

  toggleNavDrawer() {
    this.setState({navDrawerOpen: !this.state.navDrawerOpen})
  }

  toggleUserDrawer() {
    this.setState({userDrawerOpen: !this.state.userDrawerOpen})
  }

  render() {
    const {classes, onLogoutClick, auth} = this.props
    return (
      <div>
        {!auth.pending &&
        <div>
          <AppBar position="sticky" className={classes.mobileMenu}>
            <Toolbar>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={4} className={classes.leftIcon}>
                  <NavDrawer open={this.state.navDrawerOpen} openRightDrawer={this.toggleNavDrawer.bind(this)}/>
                </Grid>
                <Grid item xs={4} className={classes.mobileLogo}>
                  <img src="./images/dayman-nightman.png" alt="Sunny Memes"/>
                </Grid>
                <Grid item xs={4} className={classes.rightIcon}>
                  {auth.loggedIn ?
                    <UserDrawer open={this.state.userDrawerOpen} openUserDrawer={this.toggleUserDrawer.bind(this)} logout={onLogoutClick}/> :
                    <LoginModal className={classes.mobileLogin}/>}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          {/*// Desktop Navbar //*/}
          <AppBar position="sticky" className={classes.desktopMenu}>
            <Toolbar>
              <img src="./images/dayman-nightman.png" alt="Sunny Memes"/>
              <div className={classes.flex}>
                <Button href='/' className={classes.label}><HomeIcon style={{marginRight: 16}}/> Home</Button>
                <Button href='/' className={classes.label}><StarIcon style={{marginRight: 16}}/> Most Popular</Button>
                <Button href='/' className={classes.label}><AccessTimeIcon style={{marginRight: 16}}/> Recently
                  Uploaded</Button>
              </div>
              {!auth.loggedIn && <LoginModal/>}
              {auth.loggedIn && <Button className={classes.label} href="/addmeme">Upload</Button>}
              {auth.loggedIn && <NavMenu name={auth.user.name} picture={auth.user.picture} logout={onLogoutClick}/>}
            </Toolbar>
          </AppBar>

          {/*// Pages //*/}
          <Switch>
            <Route path='/' exact component={!auth.pending && !auth.loggedIn ? FrontBanner : Memes}/>
            <Route path='/memes' exact component={Memes}/>
            <Route path='/mymemes' component={!auth.pending && auth.loggedIn ? MyMemes : PleaseLogin}/>
            <Route path='/admin' component={AdminInterface}/>
            <Route path='/addmeme' component={!auth.pending && auth.loggedIn ? UploadContainer : PleaseLogin}/>
            <Route path='/memecomments' exact component={MemeComments}/>
          </Switch>
        </div>
        }
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default compose(withStyles(styles), withWidth())(Home);
