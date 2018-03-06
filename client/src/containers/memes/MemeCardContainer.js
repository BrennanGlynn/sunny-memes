import { connect } from 'react-redux'
import MemeCard from '../../components/meme/MemeCard'
import {attemptFavorite, attemptDelete, toggleCharacter} from "../../actions/index";
import {changeCurrentIndex} from "../../actions";

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
    admin: state.auth.user.admin,
    memeIndex: props.memeIndex,
    data: props.meme,
    masonry: props.masonry
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

const MemeCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemeCard);

export default MemeCardContainer