import { connect } from 'react-redux'
import MemePopup from '../../components/meme/MemePopup'
import {attemptFavorite, attemptDelete, toggleCharacter, changeCurrentIndex} from "../../actions/index";

const mapStateToProps = (state, props) => {
  const memeIndex = state.memes.currentIndex || 0
  const lastIndex = props.memes ? props.memes.length : 0
  const data = props.memes ? props.memes[memeIndex] : props.meme
  return {
    user: state.auth.user.id,
    admin: state.auth.user.admin,
    stateIndex: state.memes.currentIndex,
    lastIndex: lastIndex,
    data: props.memes[memeIndex]
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
    changeCurrentIndex: (newIndex, max) => {
      if (newIndex >= 0 && newIndex <= max) dispatch(changeCurrentIndex(newIndex))
    }
  }
}

const MemePopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemePopup);

export default MemePopupContainer