import React, {Component} from "react"
import {Route, Switch} from "react-router-dom"
import PropTypes from "prop-types"
import {withStyles} from "material-ui/styles"
import withWidth from "material-ui/utils/withWidth"
import compose from "recompose/compose"
import {AppBar, Button, Grid, Toolbar} from "material-ui"
import LoginModal from "../login/LoginModal"
import PleaseLogin from "../pages/PleaseLogin"
import MemePage from "../pages/MemePage"
import MostPopularContainer from "../../containers/pages/MostPopularContainer"
import MyMemesContainer from "../../containers/pages/MyMemesContainer"
import AdminInterface from "../admin/AdminInterface"
import UploadContainer from "../../containers/upload/UploadContainer"
import LeftDrawer from "./drawers/LeftDrawer"
import RecentMemesContainer from "../../containers/pages/RecentMemesContainer"
import PageNotFound from "../pages/PageNotFound"
import FavoriteMemesContainer from "../../containers/pages/FavoriteMemesContainer"
import RightDrawerContainer from "../../containers/home/drawers/RightDrawerContainer";
import WrapperPanels from "./panels/WrapperPanels";
import UserPageContainer from "../../containers/pages/UserPageContainer";
import SingleMemeContainer from "../../containers/pages/SingleMemeContainer";
import { subscribeToNews } from "../../api";

const styles = theme => ({
  [theme.breakpoints.between("xs", "md")]: {
    desktopMenu: {
      display: "none",
    },
    mobileLogo: {
      textAlign: "center",
      position: "relative",
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
    backgroundColor: '#fff',
  },
  desktopMenu: {
    backgroundColor: '#fff',
  },
  mobileLogin: {
    marginTop: 10,
  },
  label: {
    color: "white",
  },
  uploadButton: {
    color: '#2c8943',
    backgroundColor: "#fff",
  },
});


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: false,
      userDrawerOpen: false,
    }
    subscribeToNews()
  }

  componentWillMount() {
    this.props.clearAll()
  }

  toggleNavDrawer() {
    this.setState({navDrawerOpen: !this.state.navDrawerOpen})
  }

  toggleUserDrawer() {
    this.setState({userDrawerOpen: !this.state.userDrawerOpen})
  }

  render() {
    const {classes, auth} = this.props
    return (
      <div>
        {!auth.pending &&
        <div>
          <AppBar position="sticky" className={classes.mobileMenu}>
            <Toolbar>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={4} className={classes.leftIcon}>
                  <LeftDrawer open={this.state.navDrawerOpen} openRightDrawer={this.toggleNavDrawer.bind(this)}/>
                </Grid>
                <Grid item xs={4} className={classes.mobileLogo}>
                  <Button href='/'>
                    <img src="/images/dayman-nightman.png" alt="Nightmeme"/>
                  </Button>
                </Grid>
                <Grid item xs={4} className={classes.rightIcon}>
                  {auth.loggedIn ?
                    <RightDrawerContainer open={this.state.userDrawerOpen}
                                          openUserDrawer={this.toggleUserDrawer.bind(this)}/> :
                    <LoginModal className={classes.mobileLogin}/>}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <WrapperPanels>
            {/*// Pages //*/}
            <Switch>
              <Route path='/' exact component={MostPopularContainer}/>
              <Route path='/mostpopular' exact component={MostPopularContainer}/>
              <Route path='/mostrecent' exact component={RecentMemesContainer}/>
              <Route path='/favorites'
                     component={!auth.pending && auth.loggedIn ? FavoriteMemesContainer : PleaseLogin}/>
              <Route path='/addmeme' component={!auth.pending && auth.loggedIn ? UploadContainer : PleaseLogin}/>
              <Route path='/mymemes' component={!auth.pending && auth.loggedIn ? MyMemesContainer : PleaseLogin}/>
              <Route path='/admin' component={AdminInterface}/>
              <Route path='/memepage' component={MemePage}/>
              <Route path='/meme/:id' component={SingleMemeContainer}/>
              <Route path='/user/:id' component={UserPageContainer}/>
              <Route component={PageNotFound}/>
            </Switch>
          </WrapperPanels>
        </div>
        }
      </div>)
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withWidth())(Home);
