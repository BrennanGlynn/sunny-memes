import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    width: 300,
    height: 200,
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
  },
});

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class MemeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.memeData
        }
    }

    state = { expanded: false };

    handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded });
    };



//when using img use http://localhost:3001/memeData.url
//You can access the properties inside this.state
    //It should have the properties displayed
    //////////////////////////////////////////////
//{this.state.data.url}
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
              <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Grid
                    container
                    alignItems={'center'}
                    justify={'center'}
                  >
                    <div className={classes.frontCardWrapper}>
                      <Card className={classes.card}>
                        <CardHeader
                        //  avatar={
                        //    <Avatar aria-label="Recipe" className={classes.avatar}>
                        //      R
                        //    </Avatar>
                        //  }
                          action={
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title="He's Lying."
                          subheader="January 14th, 2018"
                        />
                        <CardMedia
                          className={classes.media}
                          image="/images/memes/10157285303858508hes-lying.png"
                          title="Cracking Open A Cold One With The Boys"
                        />
                        <CardContent className={classes.center}>
                          <Chip
                            avatar={<Avatar src="/images/dennis.jpg" />}
                            label="Dennis"
                            onClick={handleClick}
                            className={classes.chip}
                          />

                          <Chip
                            avatar={<Avatar src="/images/charlie.jpg" />}
                            label="Charlie"
                            onClick={handleClick}
                            className={classes.chip}
                          />

                          <Chip
                            avatar={<Avatar src="/images/frank.jpg" />}
                            label="Frank"
                            onClick={handleClick}
                            className={classes.chip}
                          />

                          <Chip
                            avatar={<Avatar src="/images/mac.jpg" />}
                            label="Mac"
                            onClick={handleClick}
                            className={classes.chip}
                          />

                          <Chip
                            avatar={<Avatar src="/images/dee.jpg" />}
                            label="Dee"
                            onClick={handleClick}
                            className={classes.chip}
                          />
                        {/*  // Add description for meme later if wanted
                          <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with
                            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                          </Typography>*/}
                        </CardContent>
                        <CardActions disableActionSpacing>
                          <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="Share">
                            <ShareIcon />
                          </IconButton>
                          <IconButton aria-label="Download">
                            <FileDownloadIcon />
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
                </Grid>
              </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MemeCard);
