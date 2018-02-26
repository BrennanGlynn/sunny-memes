import { connect } from 'react-redux'
import MemeCard from '../../components/meme/MemeCard'
import {attemptFavorite, attemptDelete, toggleCharacter} from "../../actions/index";
import {changeCurrentIndex} from "../../actions";

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user.id,
    loggedIn: state.auth.loggedIn,
    admin: state.auth.user.admin,
    memeIndex: props.memeIndex,
    data: props.meme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFavorite: (memeId) => {
      dispatch(attemptFavorite(memeId))
    },
    deleteMeme: (memeId) => {
      dispatch(attemptDelete(memeId))
    },
    toggleCharacter: (character) => {
      dispatch(toggleCharacter(character))
    },
    changeCurrentIndex: (newIndex) => {
      dispatch(changeCurrentIndex(newIndex))
    }
  }
}

const MemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemeCard);

export default MemesContainer