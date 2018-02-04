import React, {Component} from 'react'
import {Button, withStyles} from 'material-ui'
import Masonry from 'react-masonry-component'
import Dropzone from 'react-dropzone'
import UploadPreviewCard from "./UploadPreviewCard";

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
    let newFiles = this.state.files.slice()
    acceptedFiles.forEach(file => {
      newFiles.push(file)
    })
    this.setState({files: newFiles})
  }

  handleUpload() {
    let promises = []
    let dispatchUploads = this.props.onUpload
    this.state.files.forEach(function (f) {
      let formData = new FormData();
      formData.append('file', f);
      formData.append('title', f.title)
      formData.append('characters', f.characters)

      promises.push(fetch('upload', {
        credentials: 'include',
        method: 'post',
        body: formData,
      }))
    })

    Promise.all(promises).then(() => {
        dispatchUploads()
        window.location.replace('/mymemes')
      },
      err => console.log(err)
    )
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
        <Button onClick={this.handleUpload.bind(this)}>Submit</Button>
      </div>);
  }
}

export default withStyles(styles)(UploadForm);