import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import withWidth from "material-ui/utils/withWidth";
import compose from "recompose/compose";
import {AppBar, Button, Grid, Toolbar} from "material-ui";
import StarIcon from "material-ui-icons/Star";
import AccessTimeIcon from "material-ui-icons/AccessTime";
import LoginModal from "../login/LoginModal";
import FrontBanner from "../pages/FrontBanner";
import PleaseLogin from "../pages/PleaseLogin";
import MemePage from "../pages/MemePage";
import MostPopularContainer from "../../containers/pages/MostPopularContainer";
import MyMemesContainer from "../../containers/pages/MyMemesContainer";
import NavMenu from "./NavMenu";
import MobileUploadButton from "./MobileUploadButton";
import AdminInterface from "../admin/AdminInterface"
import UploadContainer from "../../containers/UploadContainer"
import NavDrawer from "./NavDrawer"
import UserDrawer from "./UserDrawer"
import FrontPage from "../pages/FrontPage";
import SingleMemePage from "../pages/SingleMemePage"
import RecentMemesContainer from "../../containers/pages/RecentMemesContainer";
import PageNotFound from "../pages/PageNotFound";
import FavoriteMemesContainer from "../../containers/pages/FavoriteMemesContainer";
import FilterModalContainer from "../../containers/sorting/FilterModalContainer"

const styles = theme => ({
  [theme.breakpoints.between("xs", "md")]: {
    desktopMenu: {
      display: "none",
    },
    mobileLogo: {
      textAlign: "center",
      position: "relative",
      top: 7.5,
    },
    mobileMenuButton: {
      color: "#fff",
    },
  },
  [theme.breakpoints.between("lg", "xl")]: {
    mobileMenu: {
      display: "none",
    },
  },
  root: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  leftIcon: {
    textAlign: "left",
  },
  rightIcon: {
    textAlign: "right",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  mobileMenu: {
    backgroundColor: '#2c8943',
  },
  desktopMenu: {
    backgroundColor: '#2c8943',
  },
  mobileLogin: {
    marginTop: 10,
  },
  label: {
    color: "white",
  },
  uploadButton: {
    color: '#2c8943',
    textShadow: '1px 1px 2px rgba(0,0,0,.3)',
    backgroundColor: "rgba(255,255,255,1)",
  },
});


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: false,
      userDrawerOpen: false,
    }
  }

  componentDidMount() {
    this.props.fetchAllMemes()
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
                  <Button href='/'>
                    <img src="./images/dayman-nightman.png" alt="Sunny Memes"/>
                  </Button>
                </Grid>
                <Grid item xs={4} className={classes.rightIcon}>
                  {auth.loggedIn ?
                    <UserDrawer open={this.state.userDrawerOpen} openUserDrawer={this.toggleUserDrawer.bind(this)}
                                logout={onLogoutClick}/> :
                    <LoginModal className={classes.mobileLogin}/>}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          {/*// Desktop Navbar //*/}
          <AppBar position="sticky" className={classes.desktopMenu}>
            <Toolbar>
              <Button href='/'>
                <img src="./images/dayman-nightman.png" alt="Sunny Memes"/>
              </Button>
              <div className={classes.flex}>
                <Button href='/mostpopular' className={classes.label}><StarIcon style={{marginRight: 16}}/> Most Popular</Button>
                <Button href='/mostRecent' className={classes.label}><AccessTimeIcon
                  style={{marginRight: 16}}/> Recently
                  Uploaded</Button>
              </div>
              {!auth.loggedIn && <LoginModal/>}
              {auth.loggedIn && <Button variant="raised" className={classes.uploadButton} href="/addmeme">Upload</Button>}
              {auth.loggedIn && <NavMenu name={auth.user.name} picture={auth.user.picture} logout={onLogoutClick}/>}
            </Toolbar>
          </AppBar>

          {/*// Pages //*/}
          <Switch>
            <Route path='/' exact component={!auth.pending && !auth.loggedIn ? FrontBanner : FrontPage}/>
            <Route path='/mostpopular' exact component={MostPopularContainer}/>
            <Route path='/mostrecent' exact component={RecentMemesContainer}/>
            <Route path='/favorites' component={!auth.pending && auth.loggedIn ? FavoriteMemesContainer : PleaseLogin}/>
            <Route path='/addmeme' component={!auth.pending && auth.loggedIn ? UploadContainer : PleaseLogin}/>
            <Route path='/mymemes' component={!auth.pending && auth.loggedIn ? MyMemesContainer : PleaseLogin}/>
            <Route path='/admin' component={AdminInterface}/>
            <Route path='/memepage' component={MemePage}/>
            <Route path='/meme/:id' component={SingleMemePage} />
            <Route component={PageNotFound} />
          </Switch>

          {auth.loggedIn &&
            <MobileUploadButton />
          }
        </div>
        }
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withWidth())(Home);
