import React, {Component} from 'react'
import {Avatar, Grid, Paper, Typography, withStyles} from "material-ui";
import CommentInput from "../../../containers/comments/CommentInputContainer";
import ErrorDialog from "../../upload/ErrorDialog";
import {NavLink} from "react-router-dom";
import ThumbUpIcon from 'material-ui-icons/ThumbUp';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  likeButton: {
    cursor: 'pointer',
    borderRadius: 5,
    border: '1px solid #e0e0e0',
    position: 'relative',
    display: 'inline-block',
    marginRight: 5,
    padding: 5,
  },
  activeLike: {
    color: '#43a047',
  },
  likeNumber: {
    border: '1px solid #e0e0e0',
    paddingLeft: '3px',
    paddingRight: '3px',
    borderRadius: '50%',
  },
  thumbsUp: {
    position: 'relative',
    top: '2px',
    marginRight: 2.5,
    fontSize: 14,
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
  addReplyAvatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    margin: 5,
    marginTop: 10,
    marginLeft: 60,
  },
  firstCommentName: {
    marginTop: 5,
  },
  replyName: {
    marginLeft: 5,
  },
  firstComment: {
    marginRight: 15,
    background: '#e0e0e0',
    borderRadius: '4px 4px',
    padding: '5px',
  },
  replyButton: {
    margin: theme.spacing.unit,
  },
  replyComment: {
    marginLeft: 5,
    width: '98%',
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
  [theme.breakpoints.down('xs')]: {
    firstCommentWrapper: {
      marginLeft: 20
    },
    replyComment: {
      width: '96%',
    },
  },
  [theme.breakpoints.up('sm')]: {
    replyComment: {
      width: '97%',
    },
  },
  [theme.breakpoints.up('md')]: {
    replyComment: {
      width: '98%',
    },
    firstCommentWrapper: {
      marginLeft: 5
    },
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
          <Grid item xs={1}>
            <Avatar src={comment.user.picture} className={classes.firstCommentAvatar}/>
          </Grid>
          <Grid item xs={10} sm={11} className={classes.firstCommentWrapper}>
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
              <Typography variant="caption" className={comment.likes.includes(user.id) ? [classes.likeButton,classes.activeLike].join(' ') : classes.likeButton}
                          onClick={likeComment.bind(this, comment._id)}>
                <ThumbUpIcon className={classes.thumbsUp} />
                Like {comment.likes.length}
              </Typography>
              <span style={{ position: 'relative', top: 2.5 }}>&bull;</span>
              <Typography variant="caption" style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }} onClick={this.openReply}>
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
              <Grid item xs={8} lg={9} className={classes.replyWrapper}>
                <NavLink className={classes.link} to={`/user/${reply.user._id}`}><Typography variant="body2"
                                                                                             className={classes.replyName}>
                  {reply.user.name}
                </Typography>
                </NavLink>
                <Typography variant="caption" className={classes.replyComment}>
                  {reply.text}
                </Typography>
                <div className={classes.replyCommentControls}>
                  <Typography variant="caption" className={reply.likes.includes(user.id) ? [classes.likeButton,classes.activeLike].join(' ') : classes.likeButton}
                              onClick={likeComment.bind(this, reply._id)}>
                    <ThumbUpIcon className={classes.thumbsUp} />
                    Like {reply.likes.length}
                  </Typography>
                  <span style={{ position: 'relative', top: 2.5 }}>&bull;</span>
                  <Typography style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }} variant="caption" onClick={this.openReply}>
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
            <Avatar src={user.picture || "/images/user-icon.png"} className={classes.addReplyAvatar}/>
          <Grid item xs={8} lg={9} className={classes.addComment}>
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
