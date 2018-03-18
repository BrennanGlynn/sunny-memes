import { connect } from 'react-redux'
import MostPopular from '../../components/pages/MostPopular'
import {getMemes} from "../../actions";

const mapStateToProps = state => {
  return {
    memes: state.memes.memes,
    user: state.auth.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: () => {
      dispatch(getMemes())
    }
  }
}

const MostPopularContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MostPopular);

export default MostPopularContainer
