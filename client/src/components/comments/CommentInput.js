import React, {Component} from "react"

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meme: this.props.meme || "5a9a0461af40470fba91a9eb",
      parent: this.props.parent,
      comment: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({comment: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch(`/comments/${this.state.meme}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({state: this.state}),
      headers: {"Content-Type": "application/json"},
    }).then(
      response => response.json(),
      err => console.log(err),
    ).then(json => {
      console.log(json)
    })
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