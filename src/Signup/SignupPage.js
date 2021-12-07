/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_VERSION, BASE_URL, SIGNUP, PROTOCOL } from '../Utils/constants';
import { EMAIL_MISSING_ERROR, PWD_MISSING_ERROR, STATE_MISSING_ERROR } from '../Utils/string_constants';
import './signup.css';
import StateSelect from '../Components/stateSelect';
import CustomLoader from '../Components/CustomLoader';

export default function SignupPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUserState] = useState('Florida');
    const [isSigningUp, setIsSigningUp] = useState(false);

    const captureDetailsAndSignup = () => {
        console.log('Email --> ' + email);
        console.log('Pwd --> ' + password);
        console.log('User State --> ' + userState);
        setIsSigningUp(true);

        if (!validate()) {
            setIsSigningUp(false);
            return;
        }

        const signupUrl = `${PROTOCOL}${BASE_URL}${API_VERSION}${SIGNUP}`;

        axios.post(signupUrl, {
            email_ID: `${email}`,
            password,
            state_code: `${userState}`
        })
            .then(userResponse => {
                console.log(JSON.stringify(userResponse));
                props.history.replace('/dashboard');
                setIsSigningUp(false);
            })
            .catch(e => {
                setIsSigningUp(false);
                alert(e);
            });
    };

    const handleChange = selectedOptions => {
        setUserState(selectedOptions.value);
    }

    const validate = () => {
        if (!email) {
            alert(EMAIL_MISSING_ERROR);
            return false;
        }

        if (!password) {
            alert(PWD_MISSING_ERROR);
            return false;
        }

        if (!userState) {
            alert(STATE_MISSING_ERROR);
            return false;
        }

        return true;
    }

    return (
        <div className='container-fluid signup-top-container'>
            <div className='container signup-container-2'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12 heading-container'>
                        <div className='usapd-container'>
                            <h2><strong className='usapd-heading'>USAPD</strong></h2>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '30px' }}>US Air Pollution Dashboard</h2>
                        </div>
                        <div className='signup-image'>
                            <img src={'https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png'} width={'80%'} height={'auto'} style={{maxHeight: '50vh'}} />
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12 signup-form-container'>
                        <div className='signup-form-container-2'>
                            <span>Already have an account ? <Link to="/" className='signup-link'>Log in</Link> here!</span>
                            <div className='signup-input-container'>
                                <Form.Label htmlFor="email">Email Address</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="john@doe.com"
                                        onChange={e => {setEmail(e.target.value);}}
                                        id="email"
                                        style={{ backgroundColor: '#E8E8E8' }}
                                    />
                                </InputGroup>
                                <Form.Label htmlFor="pwd">Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="10+ characters"
                                        onChange={e => {setPassword(e.target.value);}}
                                        id="pwd"
                                        style={{ backgroundColor: '#E8E8E8' }}
                                    />
                                </InputGroup>

                                <Form.Label htmlFor="user-state">State</Form.Label>
                                <StateSelect handleChange={handleChange} id="user-state" />

                                <div className="row">
                                    <div className='signup-btn'>
                                        <Button onClick={captureDetailsAndSignup}>Create Account</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isSigningUp ?
                <div style={{ zIndex: 2000, position: 'absolute', right: '40vw' }}> 
                    <CustomLoader />
                </div>:
                null
            }
        </div>);
}