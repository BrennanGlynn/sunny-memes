import {connect} from 'react-redux'
import {getMyMemes, getSingleMeme} from "../../actions";
import SingleMemePage from "../../components/pages/SingleMemePage";

const mapStateToProps = state => {
  return {
    memes: state.memes.singleMeme,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeme: (id) => {
      dispatch(getSingleMeme(id))
    }
  }
}

const SingleMemeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleMemePage);

export default SingleMemeContainer