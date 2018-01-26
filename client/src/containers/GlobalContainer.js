import { connect } from 'react-redux'
import { attemptLogout } from "../actions"
import Home from '../components/Home'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => {
      dispatch(attemptLogout())
    }
  }
}

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default GlobalContainer