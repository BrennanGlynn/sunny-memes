import React, { Component } from 'react';
import { Grid, Paper, Typography } from 'material-ui/';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
    minWidth: '300px',
    margin: 'auto',
  },
  commentContainer: {
    paddingLeft: 5,
    paddingRight: 5,
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
    marginLeft: '10px',
    marginRight: '10px',
    padding: 10,
  },
  triangleLeft: {
    position: 'relative',
    top: 40,
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid rgba(0,0,0,.2)',
  },
  triangleRight: {
    position: 'relative',
    top: '-70px',
    left: '95%',
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid rgba(0,0,0,.2)',
  },
  commentBottom: {
    fontSize: 10,
    marginLeft: 15,
    paddingTop: 5,
  },
  atag: {
    textDecoration: 'none',
  },
}

class MemeComments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return(
      <Grid container className={classes.root}>
        <Grid item xs={6} sm={5} md={3} lg={2} xl={1}>
          <Paper className={classes.root} elevation={4}>
            <Grid container className={classes.commentContainer}>
              <Grid item xs={2} sm={3} className={classes.avatar}>
                  <a>
                    <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13907208_10155130051273508_4390268290353924855_n.jpg?oh=533cdb8478393477373035d285877209&oe=5AE15928" className={classes.picture} alt="profile" />
                  </a>
              </Grid>
              <Grid item xs={10} sm={9}>
                <div className={classes.triangleLeft}></div>
                <div className={classes.comment}>
                  <h4>Ben Jeske</h4>
                  <p>They took you nightman and you dont belong to them. They locked me in a world</p>
                </div>
                <div className={classes.commentBottom}>
                  <a className={classes.atag} href={'#'}>
                    Reply
                  </a>
                </div>
              </Grid>
            </Grid>

            <Grid container >
              <Grid item xs={10} sm={9}>
                <div className={classes.comment}>
                  <h4>Brennan Glynn</h4>
                  <p>Kill yourself</p>
                </div>
                <div className={classes.triangleRight}></div>
              </Grid>

              <Grid item xs={2} sm={3} className={classes.avatar}>
                  <a>
                    <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13907208_10155130051273508_4390268290353924855_n.jpg?oh=533cdb8478393477373035d285877209&oe=5AE15928" className={classes.picture} alt="profile" />
                  </a>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MemeComments);
