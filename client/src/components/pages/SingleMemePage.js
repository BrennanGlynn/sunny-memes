import React, {Component} from 'react'
import {Grid, Paper} from 'material-ui/';
import MemeContainer from "../../containers/memes/MemeContainer";

class SingleMemePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    let self = this
    fetch('/memes/' + this.props.match.params.id)
      .then(res => {
        if (!res.ok) {
          self.setState({loading: false, errorMessage: 'Error retrieving meme'})
        } else {
          return res.json()
        }
      })
      .then(meme => {
        console.log(meme)
        self.setState({data: meme, loading: false})
      })
      .catch(err => {
        console.log('error', err)
        self.setState({loading: false, errorMessage: 'Error retrieving meme'})
      })
  }

  render() {
    return(
      <div>
        {this.state.loading ?
          (<div>Loading</div>) :
          (<div>
            {this.state.errorMessage ?
              (<div>{this.state.errorMessage}</div>) :
              (
                <Grid container justify="center">
                  <Grid item>
                    <MemeContainer meme={this.state.data} masonry={{layout: function () {
                        console.log("masonry not enabled")
                      }}} />
                  </Grid>

                  <Grid item>
                    <Paper style={{maxHeight: '100%', overflow: 'auto'}}>
                      comments go here
                    </Paper>
                  </Grid>
                </Grid>
              )}
          </div>)
        }
      </div>
    )
  }
}

export default SingleMemePage
