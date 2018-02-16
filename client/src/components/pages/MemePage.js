import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Card, {CardActions, CardContent} from 'material-ui/Card';
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
import MemePopup from '../meme/MemePopup';
import MemeCard from '../meme/MemeCard';

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

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
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
    this.props.deleteMeme(memeId)
    this.setState({anchorEl: null})
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
    const {classes, data, user, admin} = this.props;
    const { anchorEl } = this.state;

    return(
        <div>
          <div className={classes.root}>
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
                    {(user === data.uploaded_by || admin) &&
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
                    <img src={data.url} alt={data.title} className={classes.media} onClick={this.toggleFullMeme}/>
                  </div>
                  {data.characters[0] !== 'undefined' &&
                  <div>
                    <CardContent className={classes.chipContainer}>
                      {data.characters.map((character, i) =>
                        <Chip
                          key={i}
                          avatar={<Avatar src={"/images/" + character + ".jpg"}/>}
                          label={character}
                          className={classes.chip}
                          component={"a"} href={"/memes?chars=" + character}
                        />
                      )}
                    </CardContent>
                    <Divider/>
                  </div>}
                  <CardActions disableActionSpacing>
                    <IconButton onClick={this.handleFavorite.bind(this, data._id)} aria-label="Add to favorites">
                      <StarIcon
                        className={data.favorites.includes(user) || this.state.favorite ? classes.favorite : ''}/><Typography
                      type={'body2'} className={classes.favoriteNumber}>{data.numFaves}</Typography>
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
        </div>
    );
  }
}

export default withStyles(styles) (MemePage);
