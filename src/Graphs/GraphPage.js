// import SidebarView from '../Sidebar/SidebarView';

import _ from "lodash";
import { getGraphTitleFromId } from "../Utils/utils";
import LineChartGraph from "./LineChartGraph";

export default function GraphPage(props) {

    const typeOfGraph = props.location.pathname.split('/')[2].substring(1);
    console.log('type of graph is ' + typeOfGraph);
    let userState = props.userState;
    if (_.isEmpty(userState)) {
        userState = global.user?.userState;
        console.log(userState);
    }

    let pollutant = props.pollutant;
    if (_.isEmpty(pollutant)) {
        pollutant = 'SO2';
    }

    const title = getGraphTitleFromId(typeOfGraph);

    let graphComponent = null;

    switch (typeOfGraph) {
        case 'graph1':
            graphComponent = (<LineChartGraph 
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph2':
            graphComponent = (<LineChartGraph
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph3':
            graphComponent = (<LineChartGraph
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph4':
            graphComponent = (<LineChartGraph
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph5':
            graphComponent = (<LineChartGraph
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        default:
            (<LineChartGraph />)
    }

    return (
        <div style={{ width: '100vw' }}>
            <div className='row'>
                <div className='col-md-9'>
                    <h2>Graph</h2>

                </div>
                {graphComponent}
            </div>
        </div>
    );
}