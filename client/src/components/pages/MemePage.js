import React, {Component} from 'react';
import {withStyles} from "material-ui/styles";
import MemeCard from "../meme/MemeCard";

const styles = theme => ({
  marginTop: {
    marginTop: 100,
  },
  fullImage: {
    minWidth: 325,
    width: '100%',
  },
  root: {
    width: '100%',
    height: '80%',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

class MemePage extends Component {

  render() {
    return(
      <MemeCard />
    );
  }
}

export default withStyles(styles) (MemePage);
