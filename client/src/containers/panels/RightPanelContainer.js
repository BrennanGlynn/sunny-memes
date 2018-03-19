import { connect } from 'react-redux'
import RightPanel from '../../components/home/RightPanel'
import {attemptLogout} from "../../actions";

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(attemptLogout())
    }
  }
}

const RightPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPanel);

export default RightPanelContainer