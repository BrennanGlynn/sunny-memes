import React from 'react';
import {Grid, Paper, Button, Avatar, Typography, TextField} from 'material-ui/';
import {withStyles} from 'material-ui/styles';

const styles = theme =>  ({
  root: {
    flexGrow: 1,
    marginRight: 20,
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
    margin: 10,
    color: '#fff',
    backgroundColor: '#2c8943',
  },
  replyAvatar: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 60,
    fontSize: 12,
  },
  addCommentAvatar: {
    width: 30,
    height: 30,
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
    marginLeft: 65,
  },
  replyCommentControls: {
    marginTop: 5,
    marginLeft: 90,
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
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
})

const MemeComments = ({classes}) => {
  return (
    <div>
      <Grid container spacing={0} wrap="nowrap">
        <Grid item xs={12} md={12} zeroMinWidth>
          <Paper className={classes.root} elevation={4}>
            <Grid container spacing={0} justify="flex-start" wrap="nowrap">
              <Grid item>
                <Avatar className={classes.firstCommentAvatar}>BJ</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" className={classes.firstCommentName}>
                  Ben Jeske
                </Typography>
                <Typography variant="caption" className={classes.firstComment}>
                  This is a comment by someone and Im making it longer for demonstration. Here is some typed words.
                  And an additional line of text. Looking good!
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} justify="flex-start" wrap="nowrap">
              <Grid item className={classes.firstCommentControls}>
                <Typography variant="caption">
                  {'Like \u00b7 Reply'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} justify="flex-start">
              <Grid item>
                <Avatar className={classes.replyAvatar}>BG</Avatar>
              </Grid>
              <Grid item xs className={classes.replyWrapper}>
                <Typography variant="body2" className={classes.replyName}>
                  Brennan Glynn
                </Typography>
                <Typography variant="caption" className={classes.replyComment}>
                  This is a nested reply! It should appear a little less wide on the page than the first comment
                  in a meme thread.
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} justify="flex-start" wrap="nowrap">
              <Grid item className={classes.replyCommentControls}>
                <Typography variant="caption">
                  {'Like \u00b7 Reply'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} justify="flex-start" wrap="nowrap">
              <Grid item>
                <Avatar className={classes.addCommentAvatar}>BJ</Avatar>
              </Grid>
              <Grid item xs={10} className={classes.addComment}>
                <TextField
                  defaultValue="Type a comment"
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
                <Button size="small" className={classes.replyButton}>
                  Reply
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MemeComments);
