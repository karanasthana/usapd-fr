import _ from "lodash";
import { getGraphTitleFromId } from "../Utils/utils";
// import BarChartGraph from "./BarChartGraph";
// import LineChartGraph from "./LineChartGraph";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import Graph3 from "./Graph3";
import Graph4 from "./Graph4";
import Graph5 from "./Graph5";

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
            graphComponent = (<Graph1 
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph2':
            graphComponent = (<Graph2
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph3':
            graphComponent = (<Graph3
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph4':
            graphComponent = (<Graph4
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        case 'graph5':
            graphComponent = (<Graph5
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
            break;
        default:
            graphComponent = (<Graph5
                title = {title}
                userState = {userState}
                pollutant = {pollutant}
            />);
    }

    return (
        <div style={{ width: '100vw' }}>
            <div className='row' style={{ margin: 0 }}>
                {graphComponent}
            </div>
        </div>
    );
}