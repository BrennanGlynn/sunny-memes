import React, {Component} from 'react'
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
    const exampleData = {
      _id: "5a837c342e0c281450425cf0",
      title: "Raise a glass for the man in the room",
      url: "/images/memes/1015659325615994758942.jpg",
      uploaded_by: "10156593256159947",
      favorites: [
        "10156593256159947",
        "10157285303858508"
      ],
      characters: [
        "charlie",
        "frank"
      ],
      numFaves: 2
    }

    return(
      <div>
        {this.state.loading ?
          (<div>Loading</div>) :
          (<div>
            {this.state.errorMessage ?
              (<div>{this.state.errorMessage}</div>) :
              (<MemeContainer meme={this.state.data} />) }
          </div>)
        }
        Use this to design the single meme page.
        Title: {exampleData.title}
        Id: {this.props.match.params.id}
      </div>
    )
  }
}

export default SingleMemePage