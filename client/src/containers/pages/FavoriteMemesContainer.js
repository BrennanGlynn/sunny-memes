import { connect } from 'react-redux'
import FavoriteMemes from '../../components/pages/FavoriteMemes'

const mapStateToProps = state => {
  return {
    memes: state.memes.favoriteMemes,
    user: state.auth.user.id
  }
}

const FavoriteMemesContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(FavoriteMemes);

export default FavoriteMemesContainer