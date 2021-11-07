export const PROTOCOL = 'https://';
export const BASE_URL = 'usapd.com/';
export const API_VERSION = 'api/v1/';

// API End-points
export const LOGIN = 'login/';
export const SIGNUP = 'signup/';




// test
// return (
//     <div className='container-fluid' style={{ minHeight: '100vh', backgroundColor: '#9381FF', padding: '20px', display: 'flex', alignItems: 'center' }}> 
//         <div className='container' style={{ backgroundColor: '#F68CFE', borderRadius: '10px' }}>
//             <div className='row'>
//                 <div className='col-md-5 col-sm-12' style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
//                     <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
//                         <h2><strong style={{ fontSize: '18px', fontFamily: 'fantasy' }}>USAPD</strong></h2>
//                     </div>
//                     <div>
//                         <h2 style={{ fontSize: '30px' }}>US Air Pollution Dashboard</h2>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         <img src={'https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png'} width={'80%'} height={'auto'} alt={'test'} />
//                     </div>
//                 </div>
//                 <div className='col-md-7 col-sm-12'  style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', display: 'flex' }}>
//                     <div style={{  paddingLeft: '20px', paddingRight: '20px', }}>
//                         <span style={{ justifyContent: 'flex-end' }}>Already have an account ? <Link to="/" style={{ color: '#178be7', cursor: 'pointer' }}>Log in</Link> here!</span>
//                         <div>
//                             <div className='row' style={{ paddingTop: '16px' }}>
//                                 <div className='col'>
//                                     <Form.Label htmlFor="first-name">First name</Form.Label>
//                                     <InputGroup className="mb-3">
//                                         <FormControl
//                                             placeholder="John"
//                                             onChange={e => {setFirstName(e.target.value);}}
//                                             id="first-name"
//                                             style={{ backgroundColor: '#E8E8E8' }}
//                                         />
//                                     </InputGroup>
//                                 </div>
//                                 <div className='col'>
//                                     <Form.Label htmlFor="last-name">Last name</Form.Label>
//                                     <InputGroup className="mb-3">
//                                         <FormControl
//                                             placeholder="Doe"
//                                             onChange={e => {setLastName(e.target.value);}}
//                                             id="last-name"
//                                             style={{ backgroundColor: '#E8E8E8' }}
//                                         />
//                                     </InputGroup>
//                                 </div>
//                             </div>
//                             <Form.Label htmlFor="email">Email Address</Form.Label>
//                             <InputGroup className="mb-3">
//                                 <FormControl
//                                     placeholder="john@doe.com"
//                                     onChange={e => {setEmail(e.target.value);}}
//                                     id="email"
//                                     style={{ backgroundColor: '#E8E8E8' }}
//                                 />
//                             </InputGroup>
//                             <Form.Label htmlFor="pwd">Password</Form.Label>
//                             <InputGroup className="mb-3">
//                                 <FormControl
//                                     placeholder="10+ characters"
//                                     onChange={e => {setPassword(e.target.value);}}
//                                     id="pwd"
//                                     style={{ backgroundColor: '#E8E8E8' }}
//                                 />
//                             </InputGroup>
                            
//                             <div className="row">
//                                 <Form.Check 
//                                     type={'checkbox'}
//                                     id={'privacy'}
//                                     label={'Creating an account means you\'re okay with Terms of Service, Privacy Policy and our default Notification settings'}
//                                     onChange={e => { setPrivacyAgreed(e.target.value); }}
//                                 />
//                                 <div style={{ paddingTop: '20px' }}>
//                                     <Button onClick={captureDetailsAndSignup}>Create Account</Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>);
// }