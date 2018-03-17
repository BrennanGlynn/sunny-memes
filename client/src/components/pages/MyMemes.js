import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
//import queryString from 'query-string';
import MemeContainer from '../../containers/memes/MemeCardContainer'
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
  componentDidMount() {
    this.props.getMemes()
  }

  render() {
    const {classes, memes} = this.props;
    const memesArray = []
    const masonry = this.masonry
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }

    return (
      <div>
        <FilterModalContainer/>
        {memesArray[0] ? (
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div className="center">
                  <Masonry
                    ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                    options={{fitWidth: true}}
                    className={classes.masonry}
                  >
                    {memesArray.map((meme, i) =>
                      <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id} masonry={masonry}/>
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

export default withStyles(styles)(MyMemes);
