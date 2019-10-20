import React, {Component} from 'react';
import {instanceOf} from 'prop-types';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import momentTZ from 'moment-timezone';

import {withCookies, Cookies} from 'react-cookie';

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            loading: false,
            validated: false,
            user: {
                // NOT NULLABLE entries
                id: 0,
                disabled: false,
                createdTime: new Date(),
                group: 'user',
                password: '',
                username: '',
                // NULLABLE entries
                firstName: '',
                lastName: '',
                streetAddress: '',
                postCode: '',
                state: '',
                country: '',
                countryCode: '',
                language: 'ENGLISH',
                email: '',
                areaCode: '',
                mobile: '',
                secondaryGroup: 0,
                metadata: ''
            },
        };
        this.handleUserFormChange = this.handleUserFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserFormChange(e) {
        let user = this.state.user
        user[e.target.name]  = e.target.value;
        this.setState({user})
    }
    handleSubmit(e) {
        console.log(this.state);
        if (this.state.user == '' || this.state.password == '') {
            alert("All fields are required.")
            return
        }

    }

    addUser() {
        this.setState({loading: true});
        let data = this.state.user;
        data.createdTime = new Date();
        data.timeZone = moment.tz.guess();
        let request = "/api/userSignUp";
        fetch(request,
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then((data) => {
               console.loog(data);
            })
            .catch((error) => {
                conole.log(error)
                this.setState({loading: false});
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    render() {

        return (
            <Container fluid={true}>
                <div style={{
                    position: 'fixed',
                    top: 1,
                    right: 1,
                    zIndex: 100,
                }}>
                </div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/favicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {' OpenS3 Login'}
                    </Navbar.Brand>
                </Navbar>
                <div className={'post'}>
                    <div className={'post-contents'}>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="user.name">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control name="username" value={this.state.user.username}
                                                  onChange={this.handleUserFormChange}
                                                  placeholder="username...."/>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="user.password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.user.password}
                                                  onChange={this.handleUserFormChange}
                                                  placeholder="password...."/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="user.firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="firstName" value={this.state.user.firstName}
                                                  onChange={this.handleUserFormChange}
                                                  placeholder="Joe"/>
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="user.lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="lastName" value={this.state.user.lastName}
                                                  onChange={this.handleUserFormChange}
                                                  placeholder="Smith"/>
                                </Form.Group>

                            </Form.Row>
                            <Button variant={'primary'}
                                    disabled={(this.state.loading)}
                                    onClick={!(this.state.loading) ? this.handleSubmit : null}>
                                {(this.state.loading) ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : ''}
                                {'Sign Up'}
                            </Button>
                        </Form>                    </div>
                </div>
            </Container>
        );
    }
}


export default withCookies(App);
