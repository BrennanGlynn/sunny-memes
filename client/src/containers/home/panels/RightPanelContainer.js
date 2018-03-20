import { connect } from 'react-redux'
import RightPanel from '../../../components/home/panels/RightPanel'
import {attemptLogout} from "../../../actions/index";

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