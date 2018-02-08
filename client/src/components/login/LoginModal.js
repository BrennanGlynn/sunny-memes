import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Button, Modal, Typography} from 'material-ui';
import PeopleIcon from 'material-ui-icons/People'

const top = 25;
const left = 50;

const styles = {
  facebookIcon: {
    marginRight: 8,
    marginLeft: -8
  },
  modal: {
    position: 'absolute',
    width: 300,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 16,
  }
}

class LoginModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props
    return (
      <div>
        <Button onClick={this.handleOpen} color="inherit">
          Log in
        </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div className={classes.modal}>
                <Typography type="title" id="modal-title">
                  Log in with facebook
                </Typography>
                <Typography type="subheading" id="simple-modal-description">
                  You need to be logged in to save your favorite memes.
                </Typography>
                <Button color="primary" href="http://localhost:3001/auth/facebook">
                  <PeopleIcon className={classes.facebookIcon}/>
                  Log in With Facebook
                </Button>
              </div>
            </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LoginModal);
