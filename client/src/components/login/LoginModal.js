import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid, Button, Modal, Typography} from 'material-ui';
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
        <Button onClick={this.handleOpen} variant="raised">
          Login
        </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div className={classes.modal}>
                <Typography variant="title" id="modal-title" gutterBottom>
                  Login with your account
                </Typography>
                <Typography variant="subheading" id="simple-modal-description" gutterBottom>
                  We use external authentication so we dont have to save your
                  password.
                </Typography>
                <Grid container justify="center" spacing={0}>
                  <Grid item xs={9}>
                    <Button color="primary" href="http://localhost:3001/auth/facebook">
                      <PeopleIcon className={classes.facebookIcon}/>
                      Log in With Facebook
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LoginModal);
