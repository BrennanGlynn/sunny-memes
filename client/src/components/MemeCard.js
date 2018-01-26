import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Fade from 'material-ui/transitions/Fade';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui-icons/Star';
import ShareIcon from 'material-ui-icons/Share';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import MoreVertIcon from 'material-ui-icons/MoreVert';

// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
// import Collapse from 'material-ui/transitions/Collapse';
// import Divider from 'material-ui/Divider';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  card: {
    width: 280,
    marginLeft: '7.5px',
    marginRight: '7.5px',
    marginTop: '15px'
  },
  media: {
    height: 200
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
    marginBottom: '10px',
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
  }
});

function handleClick() {
}

class MemeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleFavorite(memeId) {
    fetch('memes/favorite', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include',
      body: JSON.stringify({
        meme: memeId
      })
    }).then(function (res) {
      console.log(res.json())
    }).catch(function (err) {
      console.log('Error sending favorite')
    })
  }

  // handleExpandClick = () => {
  //   this.setState({expanded: !this.state.expanded});
  // }

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
    const {classes, data, user, onFavorite} = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        {data._id && (
            <div className={classes.frontCardWrapper}>
              <Card raised={true} className={classes.card}>
                <CardHeader
                  //  avatar={
                  //    <Avatar aria-label="Recipe" className={classes.avatar}>
                  //      R
                  //    </Avatar>
                  //  }
                  action={
                    <IconButton
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}>
                     <MoreVertIcon/>
                    </IconButton>
                  }
                  title={data.title || 'Title'}
                  subheader={data.date || 'January, 1st, 2018'}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  transition={Fade}
                >
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <RemoveRedEyeIcon />
                    </ListItemIcon>Hide
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <HighlightOffIcon />
                    </ListItemIcon>Delete
                  </MenuItem>
                </Menu>
                <CardMedia
                  className={classes.media}
                  image={data.url || '/images/user-icon.png'}
                  title={data.title || 'Title'}
                />
                <CardContent className={classes.chipContainer}>
                  {data.characters && data.characters.map(character =>
                    <div key={character + Math.floor(Math.random() * 1000)}>
                      <Chip
                        onClick={handleClick}
                        avatar={<Avatar src={"/images/" + character + ".jpg"}/>}
                        label={character}
                        className={classes.chip}
                        component={"a"} href={"/memes?chars=" + character}
                      />
                    </div>
                  )}


                  {/*  // Add description for meme later if wanted
                          <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with
                            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                          </Typography>*/}
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton onClick={() => onFavorite(data._id)} aria-label="Add to favorites" className={data.favorites.includes(user) ? classes.favorite : ''}>
                    <StarIcon/>
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon/>
                  </IconButton>
                  <IconButton aria-label="Download">
                    <a className={classes.download} href={"http://localhost:3001" + data.url} download=""><FileDownloadIcon/></a>
                  </IconButton>
                  {/* This is for handling the dropdown menu for more information later Part 1/2
                         <div className={classes.flexGrow} />
                          <IconButton
                            className={classnames(classes.expand, {
                              [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>*/}
                </CardActions>

                {/*  // This is for handling the dropdown menu for more information later Part 2/2
                       <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                          <Divider />
                          <CardContent>
                            <Typography paragraph type="body2">
                              Method:
                            </Typography>
                          </CardContent>
                        </Collapse> */}
              </Card>
            </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MemeCard);
