import React, {Component} from "react"
import {Grid} from "material-ui/";
import List, {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Typography} from "material-ui";
import { withStyles } from 'material-ui/styles';
import SunnyScore from '../SunnyScore';
import FavoritesTotal from '../FavoritesTotal';
import UploadsTotal from '../UploadsTotal';

const styles = {
  profileWrapper: {
    width: "100%",
    background: '#2c8943',
  },
  picture: {
    width: "100px",
    height: "auto",
    borderRadius: "50%",
    position: "relative",
    display: "inline-block",
  },
  leftProfile: {
    marginTop: 7.5,
    marginLeft: 5,
  },
  profileName: {
    position: "relative",
    top: "-75px",
    display: "inline-block",
    marginLeft: 15,
    paddingBottom: 5,
    fontSize: 16,
    borderBottom: "1px solid #fff",
    color: "#fff",
    width: "50%",
  },
  joinDate: {
    fontSize: 12,
    color: "rgba(255,255,255,.8)",
    position: "relative",
    top: "-70px",
    left: "100px",
    display: "inline-block",
    marginLeft: 15,
  },
  scoreWrapper: {
    paddingLeft: "25px",
  },
  favoritesWrapper: {
    paddingRight: "25px",
  },
}

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    let self = this
    fetch("/memes/user/" + this.props.match.params.id)
      .then(res => {
        if (!res.ok) {
          self.setState({loading: false, errorMessage: "Error retrieving memes"})
        } else {
          return res.json()
        }
      })
      .then(json => {
        console.log(json.documents)
        self.setState({memes: json.documents, requestedUser: json.user, loading: false})
      })
      .catch(err => {
        console.log("error", err)
        self.setState({loading: false, errorMessage: "Error retrieving memes"})
      })
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        {this.state.requestedUser ?
          <Grid container spacing={0}>
            <div className={classes.profileWrapper}>
              <Grid item xs={12} lg={12} className={classes.leftProfile}>
                <img src={this.state.requestedUser.picture} className={classes.picture}
                     alt={this.state.requestedUser.name}/>
                <Typography className={classes.profileName}>{this.state.requestedUser.name}</Typography><br/>
                <Typography className={classes.joinDate}>Joined on March 11, 2018</Typography>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={3} className={classes.scoreWrapper}>
                  <SunnyScore/>
                </Grid>
                <Grid item xs={9} className={classes.favoritesWrapper}>
                  <Grid container justify="flex-end" spacing={16}>
                    <Grid item>
                      <FavoritesTotal/>
                    </Grid>
                    <Grid item>
                      <UploadsTotal />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div style={{width: "100%"}}>
              {this.state.memes && this.state.memes.map((meme, i) =>
                <MemeContainer meme={meme} index={i} memeArray={this.state.memes} key={meme._id}/>,
              )}
            </div>
          </Grid> :
          <div>Loading...</div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(UserPage);

