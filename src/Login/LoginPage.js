/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_VERSION, BASE_URL, LOGIN, PROTOCOL } from '../Utils/constants';
import './login.css';

export default function LoginPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const captureDetailsAndLogin = () => {
        console.log('Email --> ' + email);
        console.log('Pwd --> ' + password);

        const loginUrl = `${PROTOCOL}${BASE_URL}${API_VERSION}${LOGIN}`;

        axios.post(loginUrl, {
            email_ID: `${email}`,
            password: `${password}`
        })
            .then(userResponse => {
                console.log(userResponse.data.EMAIL_ID);
                console.log(userResponse.data.STATE_CODE);
                props.history.replace('/dashboard');
            })
            .catch(e => {
                console.error(e);
                alert(e);
                props.history.replace('/dashboard');
            });
    };

    return (
        <div className='container-fluid login-top-container'>
            <div className='container login-container-2'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12 heading-container'>
                        <div className='usapd-container'>
                            <h2><strong className='usapd-heading'>USAPD</strong></h2>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '30px' }}>US Air Pollution Dashboard</h2>
                        </div>
                        <div className='login-image'>
                            <img src={'https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png'} width={'80%'} height={'auto'} style={{maxHeight: '50vh'}} />
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12 login-form-container'>
                        <div className='login-form-container-2'>
                            <span>New here ? <Link to="/signup" className='signup-link'>Sign up</Link> here!</span>
                            <div className='login-input-container'>
                                <Form.Label htmlFor="email">Email Address</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="john@doe.com"
                                        onChange={e => {setEmail(e.target.value);}}
                                        id="email"
                                        className='login-input'
                                    />
                                </InputGroup>
                                <Form.Label htmlFor="pwd">Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="10+ characters"
                                        onChange={e => {setPassword(e.target.value);}}
                                        id="pwd"
                                        className='login-input'
                                    />
                                </InputGroup>
                                
                                <div className="row">
                                    <div className='login-btn'>
                                        <Button onClick={captureDetailsAndLogin}>Sign In</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}