import { connect } from 'react-redux'
import MemeCard from '../components/MemeCard'
import {attemptFavorite} from "../actions";

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user.id,
    data: props.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFavorite: (memeId) => {
      dispatch(attemptFavorite(memeId))
    }
  }
}

const MemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemeCard);

export default MemesContainer