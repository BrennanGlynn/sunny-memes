import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
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
});

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
              <Grid container alignItems={'center'} justify={'center'}>
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
                        <CardContent>
                          <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with
                            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                          </Typography>
                        </CardContent>
                        <CardActions disableActionSpacing>
                          <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="Share">
                            <ShareIcon />
                          </IconButton>
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
                          </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph type="body2">
                              Method:
                            </Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                              minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                              cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                              Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                              the rice, and cook again without stirring, until mussels have opened and rice is
                              just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>
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
