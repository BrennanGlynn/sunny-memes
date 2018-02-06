import React, {Component} from 'react'
import {Grid, Typography, Button, withStyles} from 'material-ui'
import Masonry from 'react-masonry-component'
import Dropzone from 'react-dropzone'
import UploadPreviewCard from "./UploadPreviewCard";

const styles = {
  masonry: {
    margin: 'auto'
  },
  dropzoneWrapper: {
    marginTop: 20,
  },
  dropzone: {
    marginTop: 20,
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: 'rgba(102, 102, 102,.5)',
    borderStyle: 'dashed',
    borderRadius: 2,
  },
  uploadButton: {
    margin: '10px auto',
    position: 'relative',
  },
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
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className={classes.dropzoneWrapper}>
            <Typography variant="headline" gutterBottom>
              Upload a Meme
            </Typography>
            <Dropzone className={classes.dropzone}
              accept="image/gif, image/jpeg, image/png, image/svg+xml"
              onDrop={this.onDrop}></Dropzone>
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
          </div>
          <Grid container className={classes.uploadButton} justify="center">
            <Grid item>
              <Button variant="raised" color="primary" onClick={this.handleUpload.bind(this)}>Upload</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(UploadForm);
