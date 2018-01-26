import { connect } from 'react-redux'
import MemeCard from '../components/MemeCard'
import {attemptFavorite} from "../actions";

const mapStateToProps = (state, props) => {
  const mine = props.mine;
  let data = mine ? state.memes.myMemes[props.memeIndex] : state.memes.memes[props.memeIndex]
  return {
    user: state.auth.user.id,
    data
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