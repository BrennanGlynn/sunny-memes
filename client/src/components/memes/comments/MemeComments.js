import React from 'react';
import {Avatar, Grid} from 'material-ui/';
import {withStyles} from 'material-ui/styles';
import CommentInput from "../../../containers/comments/CommentInputContainer";
import CommentContainer from "../../../containers/comments/CommentContainer";

const styles = theme => ({
  addComment: {
    marginTop: 10,
    width: '100%'
  },
  addCommentAvatar: {
    width: 30,
    height: 30,
    margin: 10,
  },
  commentInput: {
    margin: 10,
  },
  [theme.breakpoints.down('xs')]: {
    addComment: {
      marginLeft: 20
    }
  },
})

const MemeComments = ({classes, meme, user}) => {
  const comments = meme && meme.comments ? meme.comments : false
  return (
    <div>
      {comments && comments.map((comment) => {
          if (comment.user) return (
            <CommentContainer key={comment._id} meme={meme} comment={comment} user={user}/>
          )
        }
      )}
      <Grid container spacing={0} justify="flex-start" wrap="nowrap">
        <Grid item xs={1}>
          <Avatar src={user.picture} className={classes.addCommentAvatar}/>
        </Grid>
        <Grid item xs={10} sm={11} className={classes.addComment}>
          <div style={{
            marginRight: 15,
          }}>
            <CommentInput meme={meme._id} className={classes.commentInput}/>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MemeComments);
