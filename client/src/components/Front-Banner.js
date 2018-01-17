import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = {
  center: {
    textAlign: 'center',
  },
};


class Banner extends Component {
    render() {
        return(
          <div className>
            <h1>Banner</h1>
          </div>
        );
    }
}

export default Banner;
