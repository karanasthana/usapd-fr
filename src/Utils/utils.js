import { GRAPH_ID_TITLE_MAP } from "./constants"

export const getGraphTitleFromId = (graphId) => {
    let map = GRAPH_ID_TITLE_MAP;
    
    return map[graphId];
};

export const getStringDate = dateObj => {
    let month = dateObj.getMonth() + 1; // adding 1, since month returned is 0 indexed.
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    return `${month}/${date}/${year}`;
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