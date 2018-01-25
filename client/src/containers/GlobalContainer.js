import { connect } from 'react-redux'
import { logout } from "../actions"
import Home from '../components/Home'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => {
      dispatch(logout)
    }
  }
}

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default GlobalContainer