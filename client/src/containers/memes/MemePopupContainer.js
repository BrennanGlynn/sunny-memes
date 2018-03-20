import { connect } from 'react-redux'
import MemePopup from '../../components/memes/MemePopup'
import {attemptFavorite, attemptDelete, toggleCharacter, changeCurrentIndex} from "../../actions/index";

const mapStateToProps = (state, props) => {
  const memeIndex = state.memes.currentIndex || 0
  const lastIndex = props.memes ? props.memes.length : 0
  return {
    user: state.auth.user,
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
      dispatch(changeCurrentIndex(newIndex))
    }
  }
}

const MemePopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemePopup);

export default MemePopupContainer