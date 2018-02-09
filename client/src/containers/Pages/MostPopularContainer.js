import { connect } from 'react-redux'
import MostPopular from '../../components/pages/MostPopular'

const mapStateToProps = state => {
  return {
    memes: state.memes.memes,
    user: state.auth.user.id
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onFavorite: (memeId) => {
//       dispatch(attemptFavorite(memeId))
//     }
//   }
// }

const MostPopularContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(MostPopular);

export default MostPopularContainer
