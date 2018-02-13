import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {attemptLogout, fetchAllMemes, updateFilter} from "../actions"
import Home from "../components/home/Home"

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMemes: () => {
      dispatch(fetchAllMemes())
    },
    onLogoutClick: () => {
      dispatch(attemptLogout())
    },
    updateFilter: (characterArray) => {
      dispatch(updateFilter(characterArray))
    }
  }
}

const GlobalContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

export default GlobalContainer