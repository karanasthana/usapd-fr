import { Image } from 'react-bootstrap';
import graph1 from '../Assets/Graph1_K.png'; 
import graph2 from '../Assets/Graph2_K.png'; 
import graph3 from '../Assets/Graph3_K.png'; 
import graph4 from '../Assets/Graph4_K.png'; 
import graph5 from '../Assets/Graph5_K.png'; 
import './Dashboard.css';

import CustomTitle from "../Components/CustomTitle";
import { getGraphTitleFromId } from "../Utils/utils";

export default function DashboardPage(props) {
    return (
        <div className='dashboard-page' style={{ width: '100vw' }}>
            <div className='row'>
                <CustomTitle title={'US Air Pollution Dashboard'} />
                <p style={{ textAlign: 'center' }}><em>Air pollution according to the type of analysis you prefer. Compare states, different pollutants, get AQI insights all over 5 years. </em></p>
            </div>
            <div className='all-tiles'>
                <div className='col-md-5 tile' onClick={() => {props.history.push('/trend/:graph1')}}>
                    <p className="graph-title">{getGraphTitleFromId('graph1')} </p>
                    <Image src={graph1} height={'400px'} width={'350px'}/>
                </div>
                <div className='col-md-5 tile' onClick={() => {props.history.push('/trend/:graph2')}}>
                    <p className="graph-title">{getGraphTitleFromId('graph2')} </p>
                    <Image src={graph2} height={'400px'} width={'350px'}/>
                </div>
                <div className='col-md-5 tile' onClick={() => {props.history.push('/trend/:graph3')}}>
                    <p className="graph-title">{getGraphTitleFromId('graph3')} </p>
                    <Image src={graph3} height={'400px'} width={'350px'}/>
                </div>
                <div className='col-md-5 tile' onClick={() => {props.history.push('/trend/:graph4')}}>
                    <p className="graph-title">{getGraphTitleFromId('graph4')} </p>
                    <Image src={graph4} height={'400px'} width={'350px'}/>
                </div>
                <div className='col-md-5 tile' onClick={() => {props.history.push('/trend/:graph5')}}>
                    <p className="graph-title">{getGraphTitleFromId('graph5')} </p>
                    <Image src={graph5} height={'400px'} width={'350px'}/>
                </div>
            </div>
        </div>
    );
}