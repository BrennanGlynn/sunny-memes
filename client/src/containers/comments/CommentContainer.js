import {connect} from 'react-redux'
import {likeComment, updatedComments} from "../../actions";
import Comment from '../../components/memes/comments/Comment'

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadedComment: (memeId) => {
      dispatch(updatedComments(memeId))
    },
    likeComment: (commentId) => {
      dispatch(likeComment(commentId))
    }
  }
}

const CommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);

export default CommentContainer