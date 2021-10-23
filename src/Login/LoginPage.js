/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const captureDetailsAndLogin = () => {
        console.log('Email --> ' + email);
        console.log('Pwd --> ' + password);

        axios.post('http://e0dd-67-8-247-98.ngrok.io/api/v1/user/', {
            email: `${email}`,
            pwd: `${password}`
        })
            .then(userResponse => {
                console.log(JSON.stringify(userResponse));
                props.history.replace('/home');
            })
            .catch(e => {
                console.error(e);
                props.history.replace('/home');
            });
    };

    return (
        <div className='container-fluid' style={{ minHeight: '100vh', backgroundColor: '#9381FF', padding: '20px', display: 'flex', alignItems: 'center', paddingLeft: '20vw', paddingRight: '20vw' }}> 
            <div className='container' style={{ backgroundColor: '#F68CFE', borderRadius: '10px' }}>
                <div className='row'>
                    <div className='col-md-6 col-sm-12' style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <h2><strong style={{ fontSize: '18px', fontFamily: 'fantasy' }}>CRYPTO CLAN</strong></h2>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '30px' }}>Crypto Trading just became a team effort</h2>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={'https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png'} width={'80%'} height={'auto'} style={{maxHeight: '50vh'}} />
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12'  style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                        <div style={{  paddingLeft: '20px', paddingRight: '20px', }}>
                            <span>New here ? <Link to="/signup" style={{ color: '#178be7', cursor: 'pointer' }}>Sign up</Link> here!</span>
                            <div style={{ marginTop: '30px' }}>
                                <Form.Label htmlFor="email">Email Address</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="john@doe.com"
                                        onChange={e => {setEmail(e.target.value);}}
                                        id="email"
                                        style={{ backgroundColor: '#E8E8E8', color: 'white' }}
                                    />
                                </InputGroup>
                                <Form.Label htmlFor="pwd">Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="10+ characters"
                                        onChange={e => {setPassword(e.target.value);}}
                                        id="pwd"
                                        style={{ backgroundColor: '#E8E8E8', color: 'white' }}
                                    />
                                </InputGroup>
                                
                                <div className="row">
                                    <div style={{ paddingTop: '20px' }}>
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