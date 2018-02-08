import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {attemptLogout, getMemes, getMyMemes, getRecentMemes} from "../actions"
import Home from "../components/home/Home"

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: (query) => {
      dispatch(getMemes(query))
    },
    getMyMemes: (query) => {
      dispatch(getMyMemes(query))
    },
    getRecentMemes: (query) => {
      dispatch(getRecentMemes(query))
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