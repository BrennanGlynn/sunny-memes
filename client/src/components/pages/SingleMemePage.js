import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class SingleMemePage extends Component {

  render() {
    const { classes } = this.props;
    const exampleData = {
      _id: "5a837c342e0c281450425cf0",
      title: "Raise a glass for the man in the room",
      url: "/images/memes/1015659325615994758942.jpg",
      uploaded_by: "10156593256159947",
      favorites: [
        "10156593256159947",
        "10157285303858508"
      ],
      characters: [
        "charlie",
        "frank"
      ],
      numFaves: 2
    }

    return(
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={6}>
            Meme card here
          </Grid>
          <Grid item xs={12} sm={12} md={6}>

          </Grid>
        </Grid>
        Use this to design the single meme page.
        Title: {exampleData.title}

      </div>
    )
  }
}

export default SingleMemePage
