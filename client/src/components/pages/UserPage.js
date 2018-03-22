import React, {Component} from 'react'
import {Grid} from 'material-ui/';
import MemeContainer from "../../containers/memes/MemeCardContainer";
import {Typography} from "material-ui";

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    let self = this
    fetch('/memes/user/' + this.props.match.params.id)
      .then(res => {
        if (!res.ok) {
          self.setState({loading: false, errorMessage: 'Error retrieving memes'})
        } else {
          return res.json()
        }
      })
      .then(json => {
        console.log(json.documents)
        self.setState({memes: json.documents, requestedUser: json.user, loading: false})
      })
      .catch(err => {
        console.log('error', err)
        self.setState({loading: false, errorMessage: 'Error retrieving memes'})
      })
  }

  render() {
    return (
      <div>
        {this.state.memes && this.state.memes.map((meme, i) =>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <img src={this.state.requestedUser.picture} alt={this.state.requestedUser.name}/>
            </Grid>
            <Grid item xs={8}>
              <Typography>{this.state.requestedUser.name}</Typography>
            </Grid>
            <MemeContainer meme={meme} index={i} memeArray={this.state.memes} key={meme._id}/>
          </Grid>
        )}
      </div>
    )
  }
}

export default UserPage
