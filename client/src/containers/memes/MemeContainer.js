import { connect } from 'react-redux'
import MemeCard from '../../components/meme/MemeCard'
import {attemptFavorite, attemptDelete} from "../../actions/index";

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user.id,
    admin: state.auth.user.admin,
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
    }
  }
}

const MemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemeCard);

export default MemesContainer