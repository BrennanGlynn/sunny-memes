import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {Grid, Button, Modal, Typography} from 'material-ui'
import MemeComments from '../MemeComments'

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
    minWidth: '50%',
    maxWidth: '90%',
  },
  fullImage: {
    minWidth: 325,
    width: '100%',
  },
}


class MemePopup extends Component {
  render() {
    const {classes, data, openModal, zoomed} = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={zoomed}
        onClose={openModal}
      >
        <div className={classes.openModal}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{width: '100%'}}>
                <Button onClick={openModal}>Close</Button>
                <Typography type="title" id="modal-title">
                  {data.title}
                </Typography>
                <Typography type="subheading" id="simple-modal-description">
                  {data.uploaded_by}
                </Typography>
                <img className={classes.fullImage} src={data.url} alt="fullMeme" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Route path='/memecomments' component={MemeComments}/>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(MemePopup)
