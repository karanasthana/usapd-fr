import { GRAPH_ID_DESC_MAP, GRAPH_ID_TITLE_MAP, STATES } from "./constants"
import _ from 'lodash';

export const getGraphTitleFromId = (graphId) => {
    let map = GRAPH_ID_TITLE_MAP;
    
    return map[graphId];
};

export const getGraphDescFromId = (graphId) => {
    let map = GRAPH_ID_DESC_MAP;
    
    return map[graphId];
};

export const getMonthName = monthNum => {
    const MONTH_ARR = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return MONTH_ARR[monthNum-1];
};

export const getStringDate = dateObj => {
    let month = dateObj.getMonth() + 1; // adding 1, since month returned is 0 indexed.
    month = getMonthName(month);
    let date = dateObj.getDate();
    let year = (String)(dateObj.getFullYear());
    year = year.substring(year.length-2, year.length);
    // 01/Jan/15
    return `${date}/${month}/${year}`;
};

export const getStateName = stateCode => {
    let allStatesMapList = STATES;
    return _.find(allStatesMapList, stateObj => stateObj.value === stateCode );
};