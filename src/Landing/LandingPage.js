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
                <h1>WELCOME TO US AIR POLLUTION DASHBOARD</h1>
                <img src={'https://cdn.freelogovectors.net/wp-content/uploads/2018/08/uf-university-of-florida.png'} alt="UF" height={60} width={100} />
            </div>
            <div className='custom-map-container'>
                <CustomUSAMap />
            </div>

            <div className='buttons-container'>
                <Button onClick={gotoLogin} size={'lg'}>Login</Button>
                <Button onClick={gotoSignup} size={'lg'}>Signup</Button>
                <Button onClick={gotoDashboard} size={'lg'}>Continue as Guest</Button>
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
                    Know more about the Project
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
                            <Image src={'https://media-exp1.licdn.com/dms/image/C4D03AQEcK-8iXKJEbQ/profile-displayphoto-shrink_400_400/0/1628104797499?e=1643846400&v=beta&t=glX-APhzCgF_7nLjVdQLGGKRuGOj5suSms33eBQA0BI'} roundedCircle style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }} height={'90px'} alt={'Aayush Srivastava'} />
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}