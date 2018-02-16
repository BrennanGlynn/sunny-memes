import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";

const styles = theme => ({
  marginTop: {
    marginTop: 100,
  },
})

class MemePage extends Component {

  render() {
    const { classes } = this.props;

    return(
      <div>
        this is the meme page
      </div>
    )
  }
}

export default withStyles(styles) (MemePage);
