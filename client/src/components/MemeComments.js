import React from 'react';
import {Avatar, Button, Grid, Paper, TextField, Typography} from 'material-ui/';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  row: {
    marginTop: 100,
    display: 'flex',
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
  textFieldRoot: {
    padding: 0,
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '5px 12px',
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    root: {
      flexGrow: 1,
    },
  },
})

const MemeComments = ({classes, meme}) => {
  const comments = meme.comments ? meme.comments : false
  return (
    <div>
      {meme && comments ? meme.comments.map((comment) =>
        <Paper key={comment._id} className={classes.root} style={{boxShadow: 'none'}}>
          <Grid container spacing={0} justify="flex-start" wrap="nowrap">
            <Grid item>
              <Avatar className={classes.firstCommentAvatar}>BJ</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" className={classes.firstCommentName}>
                {comment.uploaded_by}
              </Typography>
              <Typography variant="caption" className={classes.firstComment}>
                {comment.text}
              </Typography>
              <div className={classes.firstCommentControls}>
                <Typography variant="caption">
                  {'Like \u00b7 Reply'}
                </Typography>
              </div>
            </Grid>
          </Grid>
          {comment.children && comment.children.map(comment =>
            <div key={comment._id}>
              <Grid container spacing={0} justify="flex-start">
                <Grid item>
                  <Avatar className={classes.replyAvatar}>BG</Avatar>
                </Grid>
                <Grid item xs className={classes.replyWrapper}>
                  <Typography variant="body2" className={classes.replyName}>
                    {comment.uploaded_by}
                  </Typography>
                  <Typography variant="caption" className={classes.replyComment}>
                    {comment.text}
                  </Typography>
                  <div className={classes.replyCommentControls}>
                    <Typography variant="caption">
                      {'Like \u00b7 Reply'}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          <Grid container spacing={0} justify="flex-start" wrap="nowrap">
            <Grid item>
              <Avatar className={classes.addCommentAvatar}>BJ</Avatar>
            </Grid>
            <Grid item xs={10} className={classes.addComment}>
              <TextField
                placeholder="Type a comment"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldFormLabel,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      ) :
        <Grid container spacing={0} justify="flex-start" wrap="nowrap">
          <Grid item xs={12} className={classes.addComment}>
            <TextField
              placeholder="Be first!"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput,
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel,
              }}
            />
          </Grid>
        </Grid>}
    </div>
  )
}

export default withStyles(styles)(MemeComments);
