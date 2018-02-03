import React, {Component} from 'react'
import StarIcon from 'material-ui-icons/Star'
import ShareIcon from 'material-ui-icons/Share'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import {
  Avatar, Card, CardActions, CardContent, CardMedia, Chip, IconButton, TextField, Typography,
  withStyles
} from "material-ui";

const styles = theme => ({
  dimmed: {
    opacity: 0.4,
    filter: 'alpha(opacity=40)'
  },
  card: {
    width: 335,
    marginLeft: '7.5px',
    marginRight: '7.5px',
    marginTop: '15px',
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 500,
  },
  media: {
    width: '100%',
    minHeight: 275,
  },
  frontCardWrapper: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  chipContainer: {
    alignItems: 'center'
  },
  chip: {
    marginLeft: '2.5px',
    marginRight: '2.5px',
    textTransform: 'capitalize',
    textDecoration: 'none',
  },
  download: {
    color: 'inherit',
    textDecoration: 'inherit',
    width: '1em',
    height: '1em'
  },
  favorite: {
    color: '#fed035'
  },
  vertIcon: {
    float: 'right',
    marginTop: -8,
    marginRight: -24
  },
  masonry: {
    margin: 'auto'
  },
  textField: {
    marginTop: -8,
    width: '100%',
  },
});

class UploadPreviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      characters: []
    }
  }

  handleTitleChange(file, e) {
    let title = e.target.value
    this.setState({
      title
    }, function () {
      file.title = title
    });
  }

  toggleChar(file, character) {
    let newChars = this.state.characters.slice()
    let charIndex = newChars.indexOf(character)

    // check character status
    charIndex === -1 ?
      newChars.push(character) :
      newChars.splice(charIndex, 1)
    this.setState({characters: newChars}, function () {
      file.characters = newChars
    })
  }

  render() {
    const {file, classes} = this.props
    const charEnum = ['charlie', 'dee', 'dennis', 'frank', 'mac']

    return (
      <Card key={file.name} raised={true} className={classes.card}>
        <CardContent style={{height: 60}}>
          <TextField
            label="Title"
            placeholder="Give your meme a title"
            className={classes.textField}
            value={this.state.title.value}
            onChange={this.handleTitleChange.bind(this, file)}
            margin="normal"
          />
          <Typography
            type="caption">{"January, 1st 2018"}</Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={file.preview}
          title={file.title || 'Title'}
        />
        <CardContent className={classes.chipContainer}>
          {charEnum.map((charName) =>
            <Chip
              key={charName}
              avatar={<Avatar src={"/images/" + charName + ".jpg"}/>}
              label={charName}
              className={!this.state.characters.includes(charName) ? classes.dimmed + " " + classes.chip : classes.chip}
              onClick={this.toggleChar.bind(this, file, charName)}
            />
          )}
        </CardContent>
      </Card>)
  }
}

export default withStyles(styles)(UploadPreviewCard)