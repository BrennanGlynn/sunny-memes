import React, {Component} from 'react'

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memeToReply: '',
      commentToReply: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch("/comments/5a987e5f0a02a22150486709", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({text: 'test'}),
      headers: {"Content-Type": "application/json"}
    }).then(
      response => response.json(),
      err => console.log(err)
    ).then(json => {
      console.log(json)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input name="text" type="text"/>
        <button type="submit">Submit</button>
      </form>)
  }
}

export default CommentInput