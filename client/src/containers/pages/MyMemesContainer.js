import {connect} from 'react-redux'
import MyMemes from '../../components/pages/MyMemes'
import {getMyMemes} from "../../actions";

const mapStateToProps = state => {
  return {
    memes: state.memes.myMemes,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: () => {
      dispatch(getMyMemes())
    }
  }
}

const MyMemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMemes);

export default MyMemesContainer
