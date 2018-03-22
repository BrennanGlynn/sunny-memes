import React, {Component} from 'react'
import {Avatar, Grid, Paper, Typography, withStyles} from "material-ui";
import CommentInput from "../../../containers/comments/CommentInputContainer";
import ErrorDialog from "../../upload/ErrorDialog";
import {NavLink} from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  activeLike: {
    fontWeight: 'bold'
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
  link: {
    color: 'inherit',
    textDecoration: 'none'
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
      reply: false,
      dialog: false
    }

    this.openReply = this.openReply.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  openReply() {
    if (this.props.user.id) {
      this.setState({reply: true})
    } else {
      this.openDialog("Upload Error", "You must be logged in to comment!")
    }
  }

  openDialog(title, message) {
    this.setState({dialog: true, error: {title, message}});
  };

  closeDialog() {
    this.setState({dialog: false})
  }

  render() {
    const {comment, likeComment, classes, meme, user} = this.props
    return (
      <Paper key={comment._id} className={classes.root} style={{boxShadow: 'none'}}>
        <Grid container spacing={0} justify="flex-start" wrap="nowrap">
          <Grid item>
            <Avatar src={comment.user.picture} className={classes.firstCommentAvatar}/>
          </Grid>
          <Grid item xs>
            <NavLink className={classes.link} to={`/user/${comment.user._id}`}>
              <Typography variant="body2"
                                                                                           className={classes.firstCommentName}>
              {comment.user.name}
            </Typography>
            </NavLink>
            <Typography variant="caption" className={classes.firstComment}>
              {comment.text}
            </Typography>
            <div className={classes.firstCommentControls}>
              <Typography variant="caption" className={comment.likes.includes(user.id) ? classes.activeLike : ''}
                          onClick={likeComment.bind(this, comment._id)}>
                Like ({comment.likes.length})
              </Typography>
              <Typography variant="caption" onClick={this.openReply}>
                Reply
              </Typography>
            </div>
          </Grid>
        </Grid>
        {comment.children && comment.children[0] && comment.children.map(reply =>
          <div key={reply._id}>
            <Grid container spacing={0} justify="flex-start">
              <Grid item>
                <Avatar src={reply.user.picture} className={classes.replyAvatar}/>
              </Grid>
              <Grid item xs className={classes.replyWrapper}>
                <NavLink className={classes.link} to={`/user/${reply.user._id}`}><Typography variant="body2"
                                                                                             className={classes.replyName}>
                  {reply.user.name}
                </Typography>
                </NavLink>
                <Typography variant="caption" className={classes.replyComment}>
                  {reply.text}
                </Typography>
                <div className={classes.replyCommentControls}>
                  <Typography variant="caption" className={reply.likes.includes(user.id) ? classes.activeLike : ''}
                              onClick={likeComment.bind(this, reply._id)}>
                    Like ({reply.likes.length})
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
            <Avatar src={user.picture || "/images/user-icon.png"} className={classes.addCommentAvatar}/>
          </Grid>
          <Grid item xs={10} className={classes.addComment}>
            <CommentInput meme={meme._id} parent={comment._id}/>
          </Grid>
        </Grid>}

        {/*Show dialog if needed*/}
        {this.state.dialog &&
        <ErrorDialog open={this.state.dialog} error={this.state.error} closeDialog={this.closeDialog}/>}
      </Paper>
    )
  }
}

export default withStyles(styles)(ReplyComment)