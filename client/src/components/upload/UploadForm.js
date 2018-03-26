import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles} from 'material-ui';
import {createMuiTheme} from 'material-ui/styles';
import Dropzone from 'react-dropzone';
import UploadPreviewCard from "./UploadPreviewCard";
import ReactLoading from "react-loading";
import ErrorDialog from "./ErrorDialog";

const styles = createMuiTheme({
  uploadWrapper: {
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
  uploadText: {
    position: 'relative',
    top: 90,
  },
  uploadButtonWrapper: {
    textAlign: 'center',
    marginTop: 15
  }
});

class UploadForm extends Component {
  constructor(props, context) {
    super(props, context);
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
      if (f.title && f.title.length > 0 && f.title.length <= 10000) {
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

    this.setState({loading: true})

    if (valid) {
      Promise.all(promises).then(() => {
          dispatchUploads()
          this.setState({files: [], loading: false})
          this.props.history.push('/mymemes')
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
    this.setState({open: true, error: {title, message}});
  };

  closeDialog = () => {
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props;

    if (this.state.loading) return (
      <Grid container spacing={0} justify={"center"}>
        <ReactLoading type="bubbles" delay={0} width={128} color="#2c8943"/>
      </Grid>)

    return (
      <Grid container spacing={0} justify={"center"} className={classes.uploadWrapper}>
        <Grid item xs={10} sm={6}>
          <Dropzone className={classes.dropzone}
                    accept="image/gif, image/jpeg, image/png, image/svg+xml"
                    onDrop={this.onDrop.bind(this)}
                    onDropRejected={this.onDropRejected.bind(this)}
          >
            <Typography className={classes.uploadText} type="headline" gutterBottom>
              Click Here or Drag & Drop Memes
            </Typography>
          </Dropzone>
        </Grid>
        {
          this.state.files.map((file, index) =>
            <UploadPreviewCard key={file.name} file={file} cancelCard={this.cancelFileUpload.bind(this, index)}/>
          )
        }
        <Grid item xs={12} className={classes.uploadButtonWrapper}>
          <Button variant="raised" color="primary" onClick={this.handleUpload.bind(this)}>Submit</Button>
        </Grid>

        {this.state.open &&
        <ErrorDialog open={this.state.open} error={this.state.error} closeDialog={this.closeDialog.bind(this)}/>}
      </Grid>
    );
  }
}

export default withStyles(styles)(UploadForm);
