import {connect} from 'react-redux'
import {uploadedComment} from "../../actions";
import CommentInput from '../../components/comments/CommentInput'

const mapStateToProps = (state, props) => {
  return {
    meme: props.meme,
    parent: props.parent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadedComment: (memeId) => {
      dispatch(uploadedComment(memeId))
    }
  }
}

const CommentInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInput);

export default CommentInputContainer