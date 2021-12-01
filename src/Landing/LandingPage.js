// import SidebarView from '../Sidebar/SidebarView';

import { Button } from "react-bootstrap";
import CustomUSAMap from "./CustomUSAMap";
import { Link } from 'react-router-dom';

export default function LandingPage(props) {
    const gotoLogin = () => props.history.push('/');
    const gotoSignup = () => props.history.push('/signup');
    const gotoDashboard = () => props.history.push('/dashboard');

    return (
        <div style={{ width: '100vw' }}>
            <div style={{ display: 'flex', justifyContent: "space-between", marginTop: '30px' }}>
                <h1 style={{ fontSize: '3rem', color: '#178be7', marginLeft: '30px' }}>WELCOME TO USAPD!</h1>
                <img src={'https://cdn.freelogovectors.net/wp-content/uploads/2018/08/uf-university-of-florida.png'} alt="UF" height={60} width={60} style={{ marginRight: '30px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '50px', marginRight: '50px', marginTop: '30px', marginBottom: '30px' }}>
                <Button onClick={gotoLogin} size={'lg'}>Login</Button>
                <Button onClick={gotoSignup} size={'lg'}>Signup</Button>
                <Button onClick={gotoDashboard} size={'lg'}>Continue as Guest</Button>
            </div>
            <div style={{ marginLeft: '30px ' }}>
                <CustomUSAMap />
            </div>
            <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                <p>
                    Explore More?  <Link to="/" className='signup-link'>Login</Link> to get more insights.
                </p>
                <p>
                    New here?  <Link to="/signup" className='signup-link'>Sign up</Link> to start.
                </p>
                <p>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '50px', marginRight: '50px', marginTop: '30px', marginBottom: '30px' }}>
                <Button onClick={gotoLogin} size={'lg'}>Login</Button>
                <Button onClick={gotoSignup} size={'lg'}>Signup</Button>
                <Button onClick={gotoDashboard} size={'lg'}>Continue as Guest</Button>
            </div>
        </div>
    );
}