import React, {Component} from 'react'
import {
  Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography,
  withStyles
} from 'material-ui'
import Masonry from 'react-masonry-component'
import Dropzone from 'react-dropzone'
import UploadPreviewCard from "./UploadPreviewCard";
import {Redirect} from "react-router";

const styles = {
  masonry: {
    margin: 'auto'
  }
};

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles})
  }

  handleUpload() {
    this.state.files.forEach(function (f) {
      let formData = new FormData();
      formData.append('file', f);
      formData.append('title', f.title)
      formData.append('characters', f.characters)

      fetch('upload/test', {
        credentials: 'include',
        method: 'post',
        body: formData,
      })
    })
  }

  handleFileChange(index, newFile) {
    let newFiles = this.state.files.slice()
    newFiles[index] = newFile
    this.setState({files: newFiles})
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <form>
          {/*Replace previews with uploadpreviewcard*/}
          {/*<UploadPreviewCard file={file} />*/}

          <input type="text" name="title"/><br/>
          <Dropzone onDrop={this.onDrop}></Dropzone>
          <Masonry
            options={{fitWidth: true}}
            className={classes.masonry}
          >
            {
              this.state.files.map((file, index) =>
                <UploadPreviewCard key={file.name} file={file} updateFile={this.handleFileChange.bind(this, index)}/>
              )
            }
          </Masonry>
          <Button href='/mymemes' onClick={this.handleUpload.bind(this)}>Submit</Button>
        </form>
      </div>);
  }
}

export default withStyles(styles)(UploadForm);