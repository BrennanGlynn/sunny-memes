import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
//import queryString from 'query-string';
import MemeContainer from '../../containers/memes/MemeContainer'
import Masonry from 'react-masonry-component'

const styles = {
  root: {
    flexGrow: 1
  },
  masonry: {
    margin: 'auto'
  },
}

class MyMemes extends Component {
  render() {
    const {classes, memes} = this.props;

    return (
      <div>
        {memes[0] ? (
            <Grid container>
              <Grid item xs={12}>
                <div className="center">
                  <Masonry
                    options={{fitWidth: true}}
                    className={classes.masonry}
                  >
                    {memes.map((meme,i) =>
                      <MemeContainer memeIndex={i} key={meme._id} mine={true}/>
                    )}
                  </Masonry>
                </div>
              </Grid>
            </Grid>
        ) : (
          //TODO: change this
          <div>You havent uploaded any memes</div>
        )}
      </div>)
  }
}

MyMemes.propTypes = {
  classes: PropTypes.object.isRequired,
  memes: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MyMemes);
