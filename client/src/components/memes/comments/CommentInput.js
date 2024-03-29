import React, {Component} from "react"
import {TextField, withStyles} from "material-ui";

const styles = theme => ({
  textFieldRoot: {
    padding: 0,
  },
  textFieldInput: {
    marginLeft: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
})

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meme: this.props.meme,
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
    let self = this
    fetch(`/comments/${this.state.meme}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({state: this.state}),
      headers: {"Content-Type": "application/json"},
    }).then(
      response => response.json(),
      err => console.log(err),
    ).then(json => {
      self.setState({comment: ""})
      self.props.uploadedComment(this.state.meme)
    })
  }


  render() {
    const {classes} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          placeholder="Write a comment here..."
          onChange={this.handleChange}
          fullWidth
          value={this.state.comment}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel,
          }}
        />
      </form>)
  }
}

export default withStyles(styles)(CommentInput)
