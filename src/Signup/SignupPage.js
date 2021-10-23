import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginPage(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clanId, setClanId] = useState('');
    const [clanName, setClanName] = useState('');
    const [privacyAgreed, setPrivacyAgreed] = useState('');

    const captureDetailsAndSignup = () => {
        console.log('First Name --> ' + firstName);
        console.log('Last Name --> ' + lastName);
        console.log('Email --> ' + email);
        console.log('Pwd --> ' + password);
        console.log('Clan Id --> ' + clanId);
        console.log('Clan Name --> ' + clanName);
        console.log('Privacy --> ' + privacyAgreed);

        axios.post('http://e0dd-67-8-247-98.ngrok.io/api/v1/user/', {
            name: `${firstName} ${lastName}`,
            email: `${email}`,
            clanId: `${clanId}`
        })
            .then(userResponse => {
                console.log(JSON.stringify(userResponse));
                props.history.replace('/home');
            })
            .catch(e => {
                console.error(e);
            });
    };

    return (
        <div className='container-fluid' style={{ minHeight: '100vh', backgroundColor: '#9381FF', padding: '20px', display: 'flex', alignItems: 'center' }}> 
            <div className='container' style={{ backgroundColor: '#F68CFE', borderRadius: '10px' }}>
                <div className='row'>
                    <div className='col-md-5 col-sm-12' style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <h2><strong style={{ fontSize: '18px', fontFamily: 'fantasy' }}>CRYPTO CLAN</strong></h2>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '30px' }}>Crypto Trading just became a team effort</h2>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={'https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png'} width={'80%'} height={'auto'} alt={'test'} />
                        </div>
                    </div>
                    <div className='col-md-7 col-sm-12'  style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', display: 'flex' }}>
                        <div style={{  paddingLeft: '20px', paddingRight: '20px', }}>
                            <span style={{ justifyContent: 'flex-end' }}>Already have an account ? <Link to="/" style={{ color: '#178be7', cursor: 'pointer' }}>Log in</Link> here!</span>
                            <div>
                                <div className='row' style={{ paddingTop: '16px' }}>
                                    <div className='col'>
                                        <Form.Label htmlFor="first-name">First name</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="John"
                                                onChange={e => {setFirstName(e.target.value);}}
                                                id="first-name"
                                                style={{ backgroundColor: '#E8E8E8' }}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="last-name">Last name</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Doe"
                                                onChange={e => {setLastName(e.target.value);}}
                                                id="last-name"
                                                style={{ backgroundColor: '#E8E8E8' }}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
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
                                
                                <div style={{ paddingTop: '16px' }}>
                                    <div className='row grid grid-cols-2 divide-x'>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', paddingBottom: '10px' }}>Join a Clan</div>
                                            <Form.Label htmlFor="clan-id">Clan ID</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Joey Crypto Clan"
                                                    onChange={e => {setClanId(e.target.value); }}
                                                    id="clan-id"
                                                    style={{ backgroundColor: '#E8E8E8' }}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', paddingBottom: '10px' }}>Create a Clan</div>
                                            <Form.Label htmlFor="clan-name">Clan Name</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Johns Crypto Clan"
                                                    onChange={e => {setClanName(e.target.value); }}
                                                    id="clan-name"
                                                    style={{ backgroundColor: '#E8E8E8' }}
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <Form.Check 
                                        type={'checkbox'}
                                        id={'privacy'}
                                        label={'Creating an account means you\'re okay with Terms of Service, Privacy Policy and our default Notification settings'}
                                        onChange={e => { setPrivacyAgreed(e.target.value); }}
                                    />
                                    <div style={{ paddingTop: '20px' }}>
                                        <Button onClick={captureDetailsAndSignup}>Create Account</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}