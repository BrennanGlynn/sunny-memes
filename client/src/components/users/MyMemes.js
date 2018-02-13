import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
//import queryString from 'query-string';
import MemeContainer from '../../containers/memes/MemeContainer'
import Masonry from 'react-masonry-component'
import FilterModalContainer from "../../containers/sorting/FilterModalContainer";

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
    const memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }

    return (
      <div>
        <Grid container justify="flex-end" spacing={0}>
          <Grid item xs={2}>
            <FilterModalContainer/>
          </Grid>
        </Grid>
        {memesArray[0] ? (
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div className="center">
                  <Masonry
                    options={{fitWidth: true}}
                    className={classes.masonry}
                  >
                    {memesArray.map((meme) =>
                      <MemeContainer meme={meme} key={meme._id}/>
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
  memes: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(MyMemes);
