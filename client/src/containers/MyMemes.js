import { connect } from 'react-redux'
import MyMemes from '../components/MyMemes'

const mapStateToProps = state => {
  return {
    memes: state.memes.myMemes
  }
}

const GlobalContainer = connect(
  mapStateToProps,
)(MyMemes);

export default GlobalContainer