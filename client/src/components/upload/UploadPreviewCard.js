import React, {Component} from 'react'
import {
  Avatar, Card, CardContent, CardMedia, Chip, TextField, Typography,
  withStyles
} from "material-ui";
import IconButton from 'material-ui/IconButton';
import CancelIcon from 'material-ui-icons/Cancel';

const styles = theme => ({
  cancelUploadIcon: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    transition: '.3s',
    '&:hover': {
      color: 'red',
      transition: '.3s',
    },
  },
  card: {
    width: 335,
    marginLeft: '7.5px',
    marginRight: '7.5px',
    marginTop: '15px',
  },
  dimmed: {
    opacity: 0.4,
    filter: 'alpha(opacity=40)'
  },
  frontCardWrapper: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  masonry: {
    margin: 'auto'
  },
  textField: {
    marginTop: -8,
    width: '100%',
  },
  [theme.breakpoints.only('xs')]: {
    card: {
      width: 310,
      margin: "2.5px",
    },
    title: {
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    rootMedia: {
      backgroundSize: '100%',
    },
    media: {
      width: '100%',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    card: {
      width: 225,
      margin: 5,
    },
    title: {
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    rootMedia: {
      backgroundSize: '100%',
    },
    media: {
      width: 225,
    },
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    card: {
      width: 260,
      margin: 5,
    },
    title: {
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    rootMedia: {
      backgroundSize: '100%',
    },
    media: {
      width: 260,
    },
  }
});

class UploadPreviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      characters: [],
      error: true
    }
  }

  handleTitleChange(file, e) {
    const title = e.target.value.trim()
    const error = title.length <= 0 || title.length >= 65
    this.setState({
      title,
      error
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
        <CardContent style={{height: 80}}>
          <IconButton
            className={classes.cancelUploadIcon}
          >
            <CancelIcon/>
          </IconButton>
          <TextField
            label="Give your meme a title"
            placeholder="Give your meme a title"
            className={classes.textField}
            value={this.state.title.value}
            onChange={this.handleTitleChange.bind(this, file)}
            margin="normal"
            error={this.state.error}
            multiline
          />
          <Typography
            type="caption">{"January, 1st 2018"}</Typography>
        </CardContent>
        <div className={classes.background}>
          <img src={file.preview} alt={file.title} className={classes.media} />
        </div>
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
