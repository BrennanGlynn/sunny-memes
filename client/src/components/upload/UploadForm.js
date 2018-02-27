import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles} from 'material-ui';
import {createMuiTheme} from 'material-ui/styles';
import Masonry from 'react-masonry-component';
import Dropzone from 'react-dropzone';
import UploadPreviewCard from "./UploadPreviewCard";
import {LinearProgress} from 'material-ui/Progress';
import ErrorDialog from "./ErrorDialog";

const styles = createMuiTheme({
  primaryColorBar: {
    backgroundColor: '#2f8a45',
  },
  masonry: {
    margin: 'auto'
  },
  dropzoneWrapper: {
    marginTop: 20,
  },
  dropzone: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(245,245,245,.5)',
    borderWidth: 2,
    borderColor: 'rgba(102, 102, 102,.5)',
    borderStyle: 'dashed',
    borderRadius: 2,
    textAlign: 'center'
  },
  uploadButton: {
    margin: '20px auto',
    position: 'relative',
      color: '#fff',
      textShadow: '1px 1px 2px rgba(0,0,0,.3)',
      backgroundColor: "rgba(22,141,33,.8)",
        '&:hover': {
          backgroundColor: "rgba(22,141,33,.9)",
      },
  },
  uploadText: {
    position: 'relative',
    top: 90,
  },
  uploadProgressContainer: {
    flexGrow: 1,
  },
  uploadProgress: {
    backgroundColor: '#fff',
  },
});

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let underTenFiles = true
    let newFiles = this.state.files.slice()

    acceptedFiles.forEach(file => {
      if (newFiles.length < 10) {
        newFiles.push(file)
      } else {
        underTenFiles = false
      }
    })
    if (!underTenFiles) {
      this.openDialog("Max Files Reached", "We only allow you to upload 10 memes at one time")
    }
    this.setState({files: newFiles})
  }

  onDropRejected = (acceptedFiles, rejectedFiles) => {
    console.log(rejectedFiles)
    this.openDialog("Invalid File", "We can only accept image files smaller than 2MB")
  }

  handleUpload() {
    let valid = true
    let promises = []
    let dispatchUploads = this.props.onUpload
    this.state.files.forEach(function (f) {
      if (f.title && f.title.length > 0 && f.title.length <= 65) {
        let formData = new FormData();
        formData.append('file', f);
        formData.append('title', f.title)
        formData.append('characters', f.characters)

        promises.push(fetch('memes', {
          credentials: 'include',
          method: 'post',
          body: formData,
        }))
      } else {
        valid = false
      }
    })

    if (valid) {
      Promise.all(promises).then(() => {
          dispatchUploads()
          window.location.replace('/mymemes')
        },
        err => console.log(err)
      )
    } else {
      this.openDialog("Title Error", "Please make sure all titles are valid!")
    }
  }

  handleFileChange(index, newFile) {
    let newFiles = this.state.files.slice()
    newFiles[index] = newFile
    this.setState({files: newFiles})
  }

  cancelFileUpload = (index) => {
    let files = this.state.files.slice()
    files.splice(index, 1)
    this.setState({files})
  }

  openDialog = (title, message) => {
    this.setState({ open: true, error: {title,message} });
  };

  closeDialog = () => {
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.dropzoneWrapper}>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={10} sm={6} lg={4}>
            <Dropzone className={classes.dropzone}
                      accept="image/gif, image/jpeg, image/png, image/svg+xml"
                      onDrop={this.onDrop.bind(this)}
                      onDropRejected={this.onDropRejected.bind(this)}
            >
              <div className={classes.uploadProgressContainer}>
                <LinearProgress className={classes.uploadProgress} variant="determinate" value={60} />
              </div>
                <Typography className={classes.uploadText} type="headline" gutterBottom>Click Here or Drag & Drop Memes</Typography>
            </Dropzone>
          </Grid>
        </Grid>
        <Masonry
          options={{fitWidth: true}}
          className={classes.masonry}
        >
          {
            this.state.files.map((file, index) =>
              <UploadPreviewCard key={file.name} file={file} cancelCard={this.cancelFileUpload.bind(this, index)} />
            )
          }
        </Masonry>
        <Grid container justify="center" spacing={0}>
          <Grid item>
            <Button className={classes.uploadButton} variant="raised" color="primary" onClick={this.handleUpload.bind(this)}>Upload</Button>
          </Grid>
        </Grid>

        {this.state.open && <ErrorDialog open={this.state.open} error={this.state.error} closeDialog={this.closeDialog.bind(this)} />}

      </div>
    );
  }
}

export default withStyles(styles)(UploadForm);
