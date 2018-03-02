import React, {Component} from 'react'

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memeToReply: this.props.meme || "5a987e5f0a02a22150486709",
      parentComment: this.props.parent || "",
      comment: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({comment: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.parentComment) {
      fetch(`/comments/${this.state.memeToReply}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({text: this.state.comment}),
        headers: {"Content-Type": "application/json"}
      }).then(
        response => response.json(),
        err => console.log(err)
      ).then(json => {
        console.log(json)
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.comment} onChange={this.handleChange} placeholder="Write a comment here!"/>
        <button type="submit">Submit</button>
      </form>)
  }
}

export default CommentInput