import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid} from 'material-ui';
import queryString from 'query-string';
import MemeCard from './MemeCard';

const styles = {
  card: {},
  root: {
    flexGrow: 1
  }
}

class MemePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memes: [{
        _id: ''
      }]
    }
  }

  componentDidMount() {
    // Get the current users details from the backend server
    const chars = queryString.parse(this.props.location.search).chars
    let query = 'memes';
    if (typeof chars === 'object') {
      query = query + '?chars=' + chars.join('&chars=');
    } else if (typeof chars === 'string') {
      query = query + '?chars=' + chars;
    }

    this.callApi(query)
      .then(res => {
        if (this.state.memes[0]._id !== res.documents[0]._id) {
          this.setState({memes: res.documents}, () => {
          })
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  // method to call api
  callApi = async (route) => {
    const response = await fetch(route, {credentials: 'include'});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid container className={classes.root} spacing={0}>
        {this.state.memes.map(meme =>
          <Grid item xs={12} sm={6} md={4} lg={3} key={meme._id}>
            <MemeCard className={classes.card}  data={meme}/>
          </Grid>
        )}
      </Grid>)
  }
}

export default withStyles(styles)(MemePage);