import { Button, Modal } from "react-bootstrap";
import CustomUSAMap from "./CustomUSAMap";
import { Link } from 'react-router-dom';
import './landing-page.css';
import axios from "axios";
import { useState } from "react";
import CustomLoader from "../Components/CustomLoader";

export default function LandingPage(props) {
    const gotoLogin = () => props.history.push('/');
    const gotoSignup = () => props.history.push('/signup');
    const gotoDashboard = () => props.history.push('/dashboard');
    const [totalQueries, setTotalQueries] = useState(0);
    const [showTotalQueryDialog, setShowTotalQueryDialog] = useState(false);
    const [isFetchingTotal, setIsFetchingTotal] = useState(false);
    const handleClose = () => setShowTotalQueryDialog(false);

    const getTotalQueries = () => {
        setShowTotalQueryDialog(true);
        setIsFetchingTotal(true);
        return axios.get(`http://localhost:8080/api/v1/getAllTuples/getData/`)
        .then(result => {
            setTotalQueries(result.data);
            setIsFetchingTotal(false);
        })
        .catch(e => {
            alert(e);
            setTimeout(() => {
                setIsFetchingTotal(false);
                console.log('testing');
            }, 5000);
        })

    }

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

            <div className="buttons-container" style={{ marginLeft: '30px', marginBottom: '50px' }}>
                <Button onClick={getTotalQueries} variant="info" size="lg">
                    Get insights into the data we are based on
                </Button>
            </div>

            {
                <Modal
                    show={showTotalQueryDialog}
                    onHide={handleClose}
                    centered>
                    <Modal.Header closeButton >
                        <Modal.Title>Get Insights into the Data behind it all</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {isFetchingTotal ? 
                        <CustomLoader /> : 
                        <div>
                            <p> Total Number of records: {totalQueries} </p>
                        </div>
                        } 
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}