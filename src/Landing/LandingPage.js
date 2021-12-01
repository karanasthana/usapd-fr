import { Button } from "react-bootstrap";
import CustomUSAMap from "./CustomUSAMap";
import { Link } from 'react-router-dom';
import './landing-page.css';

export default function LandingPage(props) {
    const gotoLogin = () => props.history.push('/');
    const gotoSignup = () => props.history.push('/signup');
    const gotoDashboard = () => props.history.push('/dashboard');

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>WELCOME TO USAPD!</h1>
                <img src={'https://cdn.freelogovectors.net/wp-content/uploads/2018/08/uf-university-of-florida.png'} alt="UF" height={60} width={60} />
            </div>
            <div className='buttons-container'>
                <Button onClick={gotoLogin} size={'lg'}>Login</Button>
                <Button onClick={gotoSignup} size={'lg'}>Signup</Button>
                <Button onClick={gotoDashboard} size={'lg'}>Continue as Guest</Button>
            </div>
            <div className='custom-map-container'>
                <CustomUSAMap />
            </div>
            <div className='text-container'>
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

            <div className='buttons-container'>
                <Button onClick={gotoLogin} size={'lg'}>Login</Button>
                <Button onClick={gotoSignup} size={'lg'}>Signup</Button>
                <Button onClick={gotoDashboard} size={'lg'}>Continue as Guest</Button>
            </div>
        </div>
    );
}