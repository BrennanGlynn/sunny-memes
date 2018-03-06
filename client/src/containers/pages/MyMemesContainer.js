import { connect } from 'react-redux'
import MyMemes from '../../components/pages/MyMemes'

const mapStateToProps = state => {
  return {
    memes: state.memes.myMemes,
    user: state.auth.user.id
  }
}

const MyMemesContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(MyMemes);

export default MyMemesContainer
