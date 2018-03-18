import {connect} from 'react-redux'
import FavoriteMemes from '../../components/pages/FavoriteMemes'
import {getFavoriteMemes} from "../../actions";

const mapStateToProps = state => {
  return {
    memes: state.memes.favoriteMemes,
    user: state.auth.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: () => {
      dispatch(getFavoriteMemes())
    }
  }
}

const FavoriteMemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteMemes);

export default FavoriteMemesContainer