import { connect } from 'react-redux'
import MemePage from '../../components/home/MemePage'

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

const MemesContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(MemePage);

export default MemesContainer
