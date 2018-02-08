import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {attemptFacebookAuth, attemptLogout, getMemes, getMyMemes} from "../actions"
import Home from '../components/home/Home'
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptFacebookAuth: () => {
      dispatch(attemptFacebookAuth())
    },
    getMemes: (query) => {
      dispatch(getMemes(query))
    },
    getMyMemes: (query) => {
      dispatch(getMyMemes(query))
    },
    onLogoutClick: () => {
      dispatch(attemptLogout())
    }
  }
}

const GlobalContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

export default GlobalContainer