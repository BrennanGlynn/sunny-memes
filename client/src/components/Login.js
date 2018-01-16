import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap'

class Login extends Component {
    render() {
        return(
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>
                        Login or Register an Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a>
                </Modal.Body>
            </Modal.Dialog>);
    }
}

export default Login;