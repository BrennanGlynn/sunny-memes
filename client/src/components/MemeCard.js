import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  frontCardWrapper: {
    marginTop: '25px',
  },
};

class MemeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.memeData
        }
    }



//when using img use http://localhost:3001/memeData.url
//You can access the properties inside this.state
    //It should have the properties displayed
    //////////////////////////////////////////////
//{this.state.data.url}
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={3}>
                  <div className={classes.frontCardWrapper}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image="/images/memes/10156593256159947cold.jpg"
                        title="Cracking Open A Cold One"
                      />
                      <CardContent>
                        <Typography type="headline" component="h2">
                          Cracking Open A Cold One
                        </Typography>
                        <Typography component="p">
                          Whats with the hot plate?
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button dense color="primary">
                          Share
                        </Button>
                        <Button dense color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <div className={classes.frontCardWrapper}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image="/images/memes/10157285303858508money-me-money-now.png"
                        title="Money Me. Money Now."
                      />
                      <CardContent>
                        <Typography type="headline" component="h2">
                          Money Me. Money Now.
                        </Typography>
                        <Typography component="p">
                          Oh you want something for feeling? Dr. Jinx got something for feelings.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button dense color="primary">
                          Share
                        </Button>
                        <Button dense color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MemeCard);
