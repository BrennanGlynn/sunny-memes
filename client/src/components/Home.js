import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from './Login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebookId: '',
            name: '',
        }
    }

    componentDidMount() {
        this.callApi('/me')
            .then(res => {
                this.setState({facebookId: res.id, name: res.name})
            })
            .catch(err => {
                console.log(err)
            });
    }

    callApi = async (route) => {
        const response = await fetch(route, {credentials: 'include'});
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Sunny Memes</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {!this.state.name &&
                            <NavItem eventKey={1} href="/login">
                                Login
                            </NavItem>}
                            {this.state.facebookId &&
                            <NavItem eventKey={2} href="http://localhost:3001/auth/logout">
                                Logout ({this.state.name})
                            </NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path='/login' component={Login} />
                </Switch>
            </div>
        );
    }

}

export default Home;