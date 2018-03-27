import React, {Component} from 'react'
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Typography} from "material-ui";

class SingleMemePage extends Component {
  componentDidMount() {
    this.props.getMeme(this.props.match.params.id)
  }

  render() {
    const {memes} = this.props;
    const memesArray = []
    for (const key in memes) {
      if (memes.hasOwnProperty(key)) {
        memesArray.push(memes[key])
      }
    }

    return (
      <div>
        {memesArray.length > 0 ? memesArray.map((meme, i) =>
            <MemeContainer meme={meme} index={i} memeArray={memesArray} key={meme._id}/>
          ) :
          <Typography>You have not uploaded any memes yet!</Typography>}
      </div>)
  }
}

export default SingleMemePage
