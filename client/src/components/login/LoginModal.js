import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid, Button, Modal, Typography} from 'material-ui';
import PeopleIcon from 'material-ui-icons/People'

const top = 25;
const left = 50;

const styles = theme => ({
  loginButtonWrapper: {
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginButtonCenter: {
    width: '80%',
    margin: 'auto',
    position: 'relative',
  },
  loginButton: {
    marginTop: 10,
    width: '100%',
  },
  loginModalButton: {
    textDecoration: 'none',
  },
  facebookButton: {
    background: '#3B5998',
    color: '#fff'
  },
  googleButton: {
    background: '#dd4b39',
    color: '#fff',
  },
  facebookIcon: {
    marginRight: 8,
    marginLeft: -8
  },
  modal: {
    position: 'absolute',
    minWidth: '20%',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 16,
  },
  [theme.breakpoints.only('xs')]: {
    modal: {
      width: '80%',
    }
  },
})

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
    const { classes } = this.props;
    const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
    return (
      <div>
        <div className={classes.loginButtonCenter}>
          <Button onClick={this.handleOpen} variant="raised" color="primary">
            Login
          </Button>
        </div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
              disableAutoFocus={true}
            >
              <div className={classes.modal}>
                <Typography variant="title" id="modal-title" gutterBottom>
                  Login with your account
                </Typography>
                <Grid container justify="center" spacing={0}>
                  <Grid item xs={12}>
                    <div className={classes.loginButtonWrapper}>
                      <Button className={classes.loginButton + " " + classes.facebookButton} variant="raised" href={`${host}/auth/facebook`}>
                        <PeopleIcon className={classes.facebookIcon}/>
                        Login With Facebook
                      </Button>
                      {/*<Button className={classes.loginButton + " " + classes.googleButton} color="secondary" variant="raised" href="/auth/google">*/}
                        {/*<PeopleIcon className={classes.facebookIcon}/>*/}
                        {/*Login with Google*/}
                      {/*</Button>*/}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LoginModal);
