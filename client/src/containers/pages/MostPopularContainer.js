import { connect } from 'react-redux'
import MostPopular from '../../components/pages/MostPopular'
import {attemptLogout, getMemes} from "../../actions";

const mapStateToProps = state => {
  return {
    memes: state.memes.memes,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: () => {
      dispatch(getMemes())
    },
    logout: () => {
      dispatch(attemptLogout())
    }
  }
}

const MostPopularContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MostPopular);

export default MostPopularContainer
