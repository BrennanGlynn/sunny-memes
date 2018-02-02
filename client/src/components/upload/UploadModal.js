import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles';
import {Button, Modal, Typography} from 'material-ui';
import UploadForm from "./UploadForm";

const styles = {
  openModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '32',
  },
  listFull: {
    width: '250px',
  },
  center: {
    textAlign: 'center',
  },
  label: {
    color: 'white',
  },
  left: {
    textAlign: 'left',
  },
  marginRight: {
    marginRight: '5px',
  },
};

class UploadModal extends Component {
  state = {
    open: false
  };

  toggleModal = () =>
    this.setState({
      open: !this.state.open,
    });

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button className={classes.label} onClick={this.toggleModal}>Upload</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.toggleModal}
        >
          <div className={classes.openModal}>
            <Typography type="display" component="h1">Upload meme</Typography>
            <UploadForm/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(UploadModal);
