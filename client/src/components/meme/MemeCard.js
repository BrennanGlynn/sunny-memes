import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Avatar, Chip, Divider, ListItemIcon, Typography} from 'material-ui/';
import Fade from 'material-ui/transitions/Fade';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui-icons/Star';
import ShareIcon from 'material-ui-icons/Share';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import ReportProblemIcon from 'material-ui-icons/ReportProblem';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import MemePopup from './MemePopup'

const styles = theme => ({
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
    alignItems: 'center',
    height: 50
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
});

class MemeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      expanded: false,
      favorite: this.props.data.favorites.includes(this.props.user),
      zoomed: false
    }
  }

  handleVertClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleDelete(memeId) {
    this.setState({anchorEl: null})
    fetch('/memes/' + memeId, {
      credentials: 'include',
      method: 'delete'
    }).then(response => {
      console.log('deleted meme: ' + memeId)
      return response.json()
    }).then(json =>
      json
    )
  }

  handleFavorite = (memeId) => {
    this.setState({favorite: !this.state.favorite})
    this.props.onFavorite(memeId);
  }

  toggleFullMeme = () => {
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
    const {classes, data, user} = this.props;
    const {anchorEl} = this.state;
    return (
      <div className={classes.root}>
        {data._id && (
          <div className={classes.frontCardWrapper}>
            <Card raised={true} className={classes.card}>
              <CardContent style={{height: 60}}>
                <CardActions className={classes.vertIcon}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleVertClick.bind(this)}>
                    <MoreVertIcon/>
                  </IconButton>
                </CardActions>
                <Typography type="subheading" className={classes.title}>{data.title || 'Loading Title...'}</Typography>
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
                {user === data.uploaded_by && <MenuItem onClick={this.handleDelete.bind(this, data._id)}>
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
              <CardMedia
                className={classes.media}
                image={data.url || '/images/user-icon.png'}
                title={data.title || 'Title'}
                onClick={this.toggleFullMeme}
              />
              <CardContent className={classes.chipContainer}>
                {data.characters[0] !== 'undefined' && data.characters.map((character, i) =>
                    <Chip
                      key={i}
                      avatar={<Avatar src={"/images/" + character + ".jpg"}/>}
                      label={character}
                      className={classes.chip}
                      component={"a"} href={"/memes?chars=" + character}
                    />
                )}
              </CardContent>
              <CardActions disableActionSpacing>
                <IconButton onClick={this.handleFavorite.bind(this, data._id)} aria-label="Add to favorites">
                  <StarIcon
                    className={data.favorites.includes(user) || this.state.favorite ? classes.favorite : ''}/><Typography
                  type={'body2'}>{data.numFaves}</Typography>
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon/>
                </IconButton>
                <IconButton aria-label="Download">
                  <a className={classes.download} href={"http://localhost:3001" + data.url}
                     download=""><FileDownloadIcon/></a>
                </IconButton>
              </CardActions>
            </Card>


            <MemePopup data={data} openModal={this.toggleFullMeme} zoomed={this.state.zoomed}/>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MemeCard);
