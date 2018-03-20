import {connect} from 'react-redux'
import {updatedComments} from "../../actions";
import CommentInput from '../../components/memes/comments/CommentInput'

const mapStateToProps = (state, props) => {
  return {
    meme: props.meme,
    parent: props.parent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadedComment: (memeId) => {
      dispatch(updatedComments(memeId))
    }
  }
}

const CommentInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInput);

export default CommentInputContainer