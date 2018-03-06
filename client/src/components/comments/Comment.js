import React, {Component} from 'react'
import {Avatar, Grid, Paper, Typography, withStyles} from "material-ui";
import CommentInput from "../../containers/comments/CommentInputContainer";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  firstCommentWrapper: {
    position: 'relative',
    height: 75,
  },
  replyWrapper: {
    marginTop: 2.5,
  },
  firstCommentAvatar: {
    width: 30,
    height: 30,
    margin: 10,
    color: '#fff',
    backgroundColor: '#2c8943',
  },
  replyAvatar: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 60,
    fontSize: 10,
  },
  addCommentAvatar: {
    width: 30,
    height: 30,
    fontSize: 12,
    margin: 10,
    marginLeft: 20,
  },
  firstCommentName: {
    marginTop: 5,
  },
  replyName: {
    marginLeft: 5,
  },
  firstComment: {
    marginRight: 5,
    background: '#e0e0e0',
    borderRadius: '4px 4px',
    padding: '5px',
  },
  replyButton: {
    margin: theme.spacing.unit,
  },
  replyComment: {
    marginRight: 5,
    marginLeft: 5,
    width: '80%',
    background: '#e0e0e0',
    borderRadius: '4px 4px',
    padding: '5px',
  },
  addComment: {
    marginTop: 2.5,
  },
  firstCommentControls: {
    marginTop: 5,
    marginLeft: 5,
  },
  replyCommentControls: {
    marginTop: 5,
    marginLeft: 10,
  },
  commentBottom: {
    fontSize: 11,
    paddingTop: 5,
    paddingBottom: 5,
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    root: {
      flexGrow: 1,
    },
  },
})


class ReplyComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reply: false
    }

    this.openReply = this.openReply.bind(this)
  }

  openReply() {
    this.setState({reply: true})
  }

  render() {
    const {comment, classes, meme, user} = this.props
    return (
      <Paper key={comment._id} className={classes.root} style={{boxShadow: 'none'}}>
        <Grid container spacing={0} justify="flex-start" wrap="nowrap">
          <Grid item>
            <Avatar src={comment.user.picture} className={classes.firstCommentAvatar}/>
          </Grid>
          <Grid item xs>
            <Typography variant="body2" className={classes.firstCommentName}>
              {comment.user.name}
            </Typography>
            <Typography variant="caption" className={classes.firstComment}>
              {comment.text}
            </Typography>
            <div className={classes.firstCommentControls}>
              <Typography variant="caption">
                Like
              </Typography>
              <Typography variant="caption" onClick={this.openReply}>
                Reply
              </Typography>
            </div>
          </Grid>
        </Grid>
        {comment.children && comment.children[0] && comment.children.map(comment =>
          <div key={comment._id}>
            <Grid container spacing={0} justify="flex-start">
              <Grid item>
                <Avatar src={comment.user.picture} className={classes.replyAvatar}/>
              </Grid>
              <Grid item xs className={classes.replyWrapper}>
                <Typography variant="body2" className={classes.replyName}>
                  {comment.user.name}
                </Typography>
                <Typography variant="caption" className={classes.replyComment}>
                  {comment.text}
                </Typography>
                <div className={classes.replyCommentControls}>
                  <Typography variant="caption">
                    Like
                  </Typography>
                  <Typography variant="caption" onClick={this.openReply}>
                    Reply
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        )}

        {/*Show input user has clicked reply*/}
        {this.state.reply &&
        <Grid container spacing={0} justify="flex-start" wrap="nowrap">
          <Grid item>
            <Avatar src={user.picture} className={classes.addCommentAvatar}/>
          </Grid>
          <Grid item xs={10} className={classes.addComment}>
            <CommentInput meme={meme._id} parent={comment._id}/>
          </Grid>
        </Grid>}
      </Paper>
    )
  }
}

export default withStyles(styles)(ReplyComment)