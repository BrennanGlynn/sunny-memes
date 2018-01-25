import { connect } from 'react-redux'
import MyMemes from '../components/MyMemes'

const mapStateToProps = state => {
  return {
    memes: state.memes.myMemes,
    user: state.auth.user.id
  }
}

const MyMemesContainer = connect(
  mapStateToProps,
)(MyMemes);

export default MyMemesContainer