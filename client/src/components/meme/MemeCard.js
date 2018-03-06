import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Avatar, Chip, Divider, ListItemIcon, Typography} from 'material-ui/';
import Fade from 'material-ui/transitions/Fade';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui-icons/Star';
import classnames from 'classnames';
import ShareIcon from 'material-ui-icons/Share';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import ReportProblemIcon from 'material-ui-icons/ReportProblem';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import CommentsIcon from 'material-ui-icons/Forum';
import Collapse from 'material-ui/transitions/Collapse';
import MemePopupContainer from '../../containers/memes/MemePopupContainer';
import MemeComments from '../comments/MemeComments';

const styles = theme => ({
  frontCardWrapper: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    // borderTop: '5px solid #2C8943'
  },
  collapse: {
    marginBottom: 10
  },
  chipContainer: {
    alignItems: 'center',
    padding: 5,
  },
  chip: {
    margin: '2.5px',
    textTransform: 'capitalize',
    textDecoration: 'none',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
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
  favoriteNumber: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  vertIcon: {
    float: 'right',
    marginTop: -8,
    marginRight: -24
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
  },
});

class MemeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      favorite: this.props.data.favorites.includes(this.props.user.id),
      zoomed: false,
      expanded: false,
    }
  }

  handleExpandClick = () => {
    let masonry = this.props.masonry
    this.setState({expanded: !this.state.expanded}, function () {
      setTimeout(function () {
        if (masonry) masonry.layout()
      }, 300)
    });
  };

  handleVertClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleDelete(memeId) {
    this.props.deleteMeme(memeId)
    this.setState({anchorEl: null})
  }

  handleFavorite = (memeId) => {
    this.setState({favorite: !this.state.favorite})
    this.props.onFavorite(memeId);
  }

  toggleFullMeme = () => {
    this.props.changeCurrentIndex(this.props.index)
    this.setState({zoomed: !this.state.zoomed})
  }

  static dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  static formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()]
    const day = MemeCard.getOrdinalNum(date.getDate());
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`;
  }

  static getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  render() {
    const {classes, data, user, loggedIn, admin, memeArray, index, toggleCharacter} = this.props;
    const {anchorEl} = this.state;
    const contentStyle = {transition: 'margin-top 450ms cubic-bezier(0.23, 1, 0.32, 1)'};
    const characterNames = {
      dennis: "Dennis",
      mac: "Mac",
      charlie: "Charlie",
      dee: "Dee",
      frank: "Frank",
      waitress: "The Waitress",
      cricket: "Cricket",
      artemis: "Artemis",
      lawyer: "Lawyer",
      lilkev: "Lil Kev",
      countrymac: "Country Mac",
      gailthesnail: "Gail the Snail",
      unclejack: "Uncle Jack",
      bonnie: "Bonnie",
      luther: "Luther",
      mrsmac: "Mrs. McDonald",
      barbara: "Barbara Reynolds",
      ben: "Ben the Soldier",
      pondy: "Pondy",
      maureen: "Maureen Ponderosa",
      therapist: "Therapist",
      liam: "Liam McPoyle",
      ryan: "Ryan McPoyle",
      margaret: "Margaret McPoyle",
      pappy: "Pappy McPoyle",
      roxy: "Roxy",
      gladys: "Gladys",
      z: "Z",
      duncan: "Duncan",
      maniac: "Da' Maniac",
      rex: "Rex",
      hwang: "Hwang",
      ingrid: "Ingrid Nelson",
      ruby: "Ruby Taft"
    }

    return (
      <div style={contentStyle} className={classes.root}>
        {data._id && (
          <div className={classes.frontCardWrapper}>
            <Card raised={true} className={classes.card}>
              <CardContent style={{minHeight: 20}}>
                <CardActions className={classes.vertIcon}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleVertClick.bind(this)}>
                    <MoreVertIcon/>
                  </IconButton>
                </CardActions>
                <a className={classes.link} href={`/meme/${data._id}`}><Typography type="subheading"
                                                                                   className={classes.title}>{data.title || 'Loading Title...'}</Typography></a>
                <Typography
                  type="caption">{MemeCard.formatDate(MemeCard.dateFromObjectId(data._id)) || 'January, 1st, 2018'}</Typography>
              </CardContent>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                transition={Fade}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <RemoveRedEyeIcon/>
                  </ListItemIcon>Hide
                </MenuItem>
                <Divider/>
                {(user.id === data.uploaded_by || admin) &&
                <MenuItem onClick={this.handleDelete.bind(this, data._id)}>
                  <ListItemIcon>
                    <HighlightOffIcon/>
                  </ListItemIcon>Delete
                </MenuItem>}
                <Divider/>
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <ReportProblemIcon/>
                  </ListItemIcon>Report
                </MenuItem>
              </Menu>
              <div className={classes.background}>
                <img src={data.url} alt={data.title} className={classes.media}
                     onClick={this.toggleFullMeme.bind(this, index)}/>
              </div>
              {data.characters[0] !== 'undefined' &&
              <div>
                <CardContent className={classes.chipContainer}>
                  {data.characters.map((character, i) =>
                    <Chip
                      key={i}
                      avatar={<Avatar src={"/images/characters/" + character + ".jpg"}/>}
                      label={characterNames[character]}
                      className={classes.chip}
                      onClick={toggleCharacter.bind(this, character)}
                    />
                  )}
                </CardContent>
                <Divider/>
              </div>}
              <CardActions disableActionSpacing>
                <IconButton onClick={this.handleFavorite.bind(this, data._id)} aria-label="Add to favorites">
                  <StarIcon
                    className={loggedIn && (data.favorites.includes(user.id) || this.state.favorite) ? classes.favorite : ''}/><Typography
                  type={'body2'} className={classes.favoriteNumber}>{data.favorites.length}</Typography>
                </IconButton>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <CommentsIcon/>
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon/>
                </IconButton>
                <IconButton aria-label="Download">
                  <a className={classes.download} href={data.url}
                     download=""><FileDownloadIcon/></a>
                </IconButton>
              </CardActions>


              {/*Expanded section*/}
              <Collapse in={this.state.expanded} className={classes.collapse}>
                <CardContent>
                  <MemeComments meme={data} user={user} />
                </CardContent>
              </Collapse>
            </Card>

            {memeArray &&
            <MemePopupContainer memes={memeArray} openModal={this.toggleFullMeme} zoomed={this.state.zoomed}/>}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MemeCard);
