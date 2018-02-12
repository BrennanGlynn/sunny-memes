import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {attemptLogout, fetchAllMemes} from "../actions"
import Home from "../components/home/Home"

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMemes: (query) => {
      dispatch(fetchAllMemes(query))
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