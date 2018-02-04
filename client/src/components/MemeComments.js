import React from 'react';
import {Grid} from 'material-ui/';
import {withStyles} from 'material-ui/styles';

const styles = {
  root: {
    flexGrow: 1,
    minWidth: '300px',
    margin: 'auto',
  },
  commentContainer: {
    position: 'relative',
    fontSize: 12,
    border: '1px solid rgba(0,0,0,.2)',
    borderRadius: '5px 5px',
    padding: 10,
    marginTop: 5,
    marginLeft: 5,
    width: '95%',
  },
  picture: {
    height: 50,
    width: 50,
    borderRadius: '50%',
    padding: '5px',
    margin: 'auto',
  },
  avatar: {
    position: 'relative',
    top: '-10px',
    margin: 'auto',
  },
  comment: {
    position: 'relative',
    fontSize: 12,
    border: '1px solid rgba(0,0,0,.2)',
    borderRadius: '5px 5px',
    padding: 10,
  },
  commentBottom: {
    fontSize: 11,
    paddingTop: 5,
    paddingBottom: 5,
  },
  atag: {
    textDecoration: 'none',
    paddingLeft: '2.5px',
    paddingRight: '2.5px',
  },
}

const MemeComments = ({classes}) => {
  return (
    <Grid container className={classes.commentContainer} justify="center">
      <Grid item xs={2} sm={2} className={classes.avatar}>
        <a>
          <img
            src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13907208_10155130051273508_4390268290353924855_n.jpg?oh=533cdb8478393477373035d285877209&oe=5AE15928"
            className={classes.picture} alt="profile"/>
        </a>
      </Grid>
      <Grid item xs={10} sm={10}>
        <h4>Ben Jeske</h4>
        <p>They took you nightman and you dont belong to them. They locked me in a world</p>
        <div className={classes.commentBottom}>
          <a className={classes.atag}>
            Reply
          </a>
          |
          <a className={classes.atag}>
            Salt
          </a>
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MemeComments);
