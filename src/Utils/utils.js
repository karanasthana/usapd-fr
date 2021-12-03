import { GRAPH_ID_TITLE_MAP } from "./constants"

export const getGraphTitleFromId = (graphId) => {
    let map = GRAPH_ID_TITLE_MAP;
    
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
    return `${date}/${month}/${year}`;
};