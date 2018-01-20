import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
// import Collapse from 'material-ui/transitions/Collapse';
// import Divider from 'material-ui/Divider';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import MoreVertIcon from 'material-ui-icons/MoreVert';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  card: {
    width: 275,
  },
  media: {
    height: 200
  },
  frontCardWrapper: {
    marginTop: '25px',
    position: 'relative',
    marginLeft: '0 auto',
    marginRight: '0 auto',
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
  center: {
    alignItems: 'center',
  },
  chip: {
    marginBottom: '10px',
    marginLeft: '2.5px',
    marginRight: '2.5px',
    textTransform: 'capitalize',
    textDecoration: 'none',
  },
});

function handleClick() {
}

class MemeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      title: this.props.data.title,
      date: this.formatDate(this.dateFromObjectId(this.props.data._id)),
      characters: this.props.data.characters,
      url: this.props.data.url
    }
  }

  // handleExpandClick = () => {
  //   this.setState({expanded: !this.state.expanded});
  // }

  dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()]
    const day = this.getOrdinalNum(date.getDate());
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`;
  }

  getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0} alignItems={'center'} justify={'center'}>
          <div className={classes.frontCardWrapper}>
            <Card className={classes.card}>
              <CardHeader
                //  avatar={
                //    <Avatar aria-label="Recipe" className={classes.avatar}>
                //      R
                //    </Avatar>
                //  }
                // action={
                //   <IconButton>
                //     <MoreVertIcon/>
                //   </IconButton>
                // }
                title={this.state.title}
                subheader={this.state.date}
              />
              <CardMedia
                className={classes.media}
                image={this.state.url}
                title={this.state.title}
              />
              <CardContent className={classes.center}>
                {this.state.characters && this.state.characters.map(character =>
                  <div key={character + Math.floor(Math.random() * 1000)}>
                    <Chip
                      onClick={handleClick}
                      avatar={<Avatar src={"/images/" + character + ".jpg"}/>}
                      label={'#' + character}
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
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon/>
                </IconButton>
                <IconButton aria-label="Download">
                  <FileDownloadIcon/>
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MemeCard);
