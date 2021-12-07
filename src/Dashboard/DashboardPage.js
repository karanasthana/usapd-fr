import { Image } from 'react-bootstrap';
import graph1 from '../Assets/Graph1_K.png'; 
import graph2 from '../Assets/Graph2_K.png'; 
import graph3 from '../Assets/Graph3_K.png'; 
import graph4 from '../Assets/Graph4_K.png'; 
import graph5 from '../Assets/Graph5_K.png'; 
import graph7 from '../Assets/Graph5_K.png'; 
import './Dashboard.css';

import CustomTitle from "../Components/CustomTitle";
import { getGraphTitleFromId, getGraphDescFromId } from "../Utils/utils";

export default function DashboardPage(props) {
    return (
        <div className='dashboard-page' style={{ width: '100vw' }}>
            <div className='row'>
                <h1 style={{ color: '#178be7', fontSize: '50px', textAlign: 'center', margin: '20px' }}>
                    {'US Air Pollution Dashboard'}
                </h1>
                <p style={{ textAlign: 'center' }}><em>Air pollution according to the type of analysis you prefer. Compare states, different pollutants, get AQI insights all over 5 years. </em></p>
            </div>
            <div className='all-tiles'>
                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph1')}}>
                        <Image src={graph1} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph1')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph1')}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph2')}}>
                        <Image src={graph2} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph2')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph2')}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph3')}}>
                        <Image src={graph3} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph3')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph3')}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph4')}}>
                        <Image src={graph4} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph4')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph4')}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph5')}}>
                        <Image src={graph5} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph5')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph1')}</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-12'>
                    <div className='tile-2' onClick={() => {props.history.push('/trend/:graph7')}}>
                        <Image src={graph7} height={'200px'} width={'250px'}/>
                        <div className='graph-details' style={{ flexGrow: 1, justifyContent: 'start', marginLeft: '20px', textAlign: 'start', alignItems: 'start' }}>
                            <p className="graph-title">{getGraphTitleFromId('graph7')} </p>
                            <p className='graph-desc'>{getGraphDescFromId('graph7')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}