import { Button, Image, Modal } from "react-bootstrap";
import CustomUSAMap from "./CustomUSAMap";
import { Link } from 'react-router-dom';
import './landing-page.css';
import axios from "axios";
import { useState } from "react";
import CustomLoader from "../Components/CustomLoader";
import { EPA_LINK } from "../Utils/constants";

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
        // TODO change these to use variables
        const getAllTuplesUrl = `http://localhost:8080/api/v1/getAllTuples/getData/`;
        return axios.get(getAllTuplesUrl)
        .then(result => {
            setTotalQueries(result.data);
            setIsFetchingTotal(false);
        })
        .catch(e => {
            alert(e);
            setIsFetchingTotal(false);
        })

    }

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>WELCOME TO USAPD!</h1>
                <img src={'https://cdn.freelogovectors.net/wp-content/uploads/2018/08/uf-university-of-florida.png'} alt="UF" height={60} width={100} />
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
                    The <strong>U.S. Air Pollution Dashboard (USAPD)</strong> tool is a web-based data visualization and trend analysis application that offers a versatile and effortless way to manage, visualize and produce several graphic representations of air quality data, from a variety of available templates and types.
                </p>
                <p>
                    The data being utilized to draw these insights is made publicly available by the <a target='blank' href={EPA_LINK}><em>United States Environmental Protection Agency (US EPA).</em></a> Data until the year 2020 has been updated in the database and the same is utilized by the application to provide users with functionality including but not limited to - generating several dashboards, graphs, and plots, and comparing the air quality of different states within the United States. 
                </p>
                <p>

The main objective of the “U.S. Air Pollution Dashboard (USAPD)” tool is to enable a user to generate several representations of air quality data in the state of their choice and make informed decisions about the air quality in other states within the United States for travel/migratory purposes and for the EPA to efficiently monitor the pollutant levels within different states of the US to abide by the US Clean Air Act.
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
                        {
                            isFetchingTotal ? 
                            <CustomLoader /> : 
                            <div>
                                <p> <strong>Total Number of records:</strong> {totalQueries} </p>
                            </div>
                        } 

                        <p><em>Database Management Systems</em> [COP 5725] Group Project on Data Visualization and Complex Query Formulation.</p>
                        <p>Instructor: <strong>Dr. Markus Schneider </strong></p>
                        <p>TA: <strong>Kyuseo Park</strong> </p>
                        <p style={{ marginBottom: '2px' }}><em>Created By - </em></p>
                        <div>
                            <Image src={'https://media-exp1.licdn.com/dms/image/C5603AQF5VshxrQW44Q/profile-displayphoto-shrink_400_400/0/1604443721157?e=1643846400&v=beta&t=ssi78nSpzO9RcfDas7TPOipQiwzEFghVZanSerc-iFs'} roundedCircle style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }} height={'90px'} alt={'Karan Asthana'} />
                            <Image src={'https://media-exp1.licdn.com/dms/image/C4E03AQFL_0L-sFlkGg/profile-displayphoto-shrink_400_400/0/1632415414850?e=1643846400&v=beta&t=ehl_FXFvuDAHDpgjd0TZ3pWHN14wBAHK3uAF-_nDC_o'} roundedCircle style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }} height={'90px'} alt={'Charan Sai Dhanireddy'} />
                            <Image src={'https://media-exp1.licdn.com/dms/image/C5603AQG562Rxla1KVg/profile-displayphoto-shrink_400_400/0/1631242137862?e=1643846400&v=beta&t=ezzOPP20ENA-pL8J0YmTQtpZxFhY0XtVd_3nsT1uuqg'} roundedCircle style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }} height={'90px'} alt={'Venkat Sai Dhavaleswarapu'} />
                            <Image src={'data:image/jpeg;base64,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'} roundedCircle style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }} height={'90px'} alt={'Aayush Srivastava'} />
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}