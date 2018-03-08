import React from 'react';
import {Grid} from 'material-ui/';
import {withStyles} from 'material-ui/styles';
import CommentInput from "../../containers/comments/CommentInputContainer";
import CommentContainer from "../../containers/comments/CommentContainer";

const styles = {
  addComment: {
    marginTop: 2.5,
  }
}

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
        <Grid item xs={12} className={classes.addComment}>
          <CommentInput meme={meme._id}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MemeComments);
