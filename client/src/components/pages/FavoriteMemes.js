import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import MemeContainer from "../../containers/memes/MemeContainer";
import Masonry from "react-masonry-component"
import {Grid} from "material-ui";

const styles = {}

class Favorites extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   memes: [{
    //     _id: "",
    //     title: "",
    //     url: "",
    //     uploaded_by: "",
    //     favorites: [],
    //     numFaves: 0,
    //   }],
    // }
  }

  // todo fix character sorting
  // componentDidMount() {
    // Get the current users details from the backend server
    // const chars = queryString.parse(this.props.location.search).chars
    // let query = 'memes';
    // if (typeof chars === 'object') {
    //   query = query + '?chars=' + chars.join('&chars=');
    // } else if (typeof chars === 'string') {
    //   query = query + '?chars=' + chars;
    // }

  //   fetch('/memes/favorites', {credentials: "include"})
  //     .then(
  //       res => res.json(),
  //       error => console.log(error),
  //     ).then(json => {
  //     if (json) this.setState({memes: json.documents})
  //   })
  // }

  render() {
    const {classes, memes} = this.props;
    let memesArray = Object.keys(memes).map(key => memes[key])

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Masonry
            options={{fitWidth: true}}
            className={classes.memeWrapper}
          >
            {memesArray.map((meme) =>
              <MemeContainer key={meme._id} meme={meme}/>,
            )}
          </Masonry>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Favorites);