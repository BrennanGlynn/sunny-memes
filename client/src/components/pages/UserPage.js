import React, {Component} from 'react'
import {Grid, Paper} from 'material-ui/';
import MemeContainer from "../../containers/memes/MemeCardContainer";
import Masonry from "react-masonry-component"
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
    let masonry = this.masonry
    return (
      <div>
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
                  </Grid>
                  <Grid item xs={12}>
                    <Masonry
                      ref={function (c) {
                        this.masonry = this.masonry || c.masonry;
                      }.bind(this)}
                      options={{fitWidth: true}}
                      // className={classes.masonry}
                    >
                      {this.state.memes.map((meme, i) =>
                        <MemeContainer meme={meme} index={i} memeArray={this.state.memes} key={meme._id}
                                       masonry={masonry}/>
                      )}
                    </Masonry>
                  </Grid>
                </Grid>
              )}
          </div>)
        }
      </div>
    )
  }
}

export default UserPage
