import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Typography} from "material-ui";

const styles = {
  warning: {
    color: 'black'
  }
}

class Favorites extends Component {
  componentDidMount() {
    this.props.getMemes()
  }

  render() {
    const {classes, memes} = this.props;
    let memesArray = Object.keys(memes).map(key => memes[key])


    return (
      <div>
        {memesArray.length > 0 ? memesArray.map((meme, i) =>
          <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
        ) :
        <Typography className={classes.warning}>You have not favorited any memes yet!</Typography>}
      </div>
    )
  }
}

export default withStyles(styles)(Favorites);
