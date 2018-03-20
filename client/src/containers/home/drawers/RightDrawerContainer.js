import {connect} from 'react-redux'
import RightDrawer from '../../../components/home/drawers/RightDrawer'

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    open: props.open,
    openUserDrawer: props.openUserDrawer

  }
}

const RightDrawerContainer = connect(
  mapStateToProps,
)(RightDrawer);

export default RightDrawerContainer