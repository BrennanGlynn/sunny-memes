import React, {Component} from 'react'
import {Grid} from 'material-ui/';
import MemeContainer from "../../containers/memes/MemeCardContainer";
import Masonry from "react-masonry-component"
import {Typography} from "material-ui";
import WrapperPanels from "../home/panels/WrapperPanels";

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    console.log(this.props)
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
    let masonry = this.masonry
    return (
      <WrapperPanels>
        {this.state.loading ?
          (<div>Loading</div>) :
          (<div>
            {this.state.errorMessage ?
              (<div>{this.state.errorMessage}</div>) :
              (
                <Grid container spacing={0} align="center">
                  <Grid item xs={12}>
                    <Typography variant={'display1'}>The following are memes posted by {this.state.requestedUser.name}</Typography>
                    <img src={this.state.requestedUser.picture} alt="requested user" />
                      {this.state.memes.map((meme, i) =>
                        <MemeContainer meme={meme} index={i} memeArray={this.state.memes} key={meme._id}/>
                      )}
                  </Grid>
                </Grid>
              )}
          </div>)
        }
      </WrapperPanels>
    )
  }
}

export default UserPage
