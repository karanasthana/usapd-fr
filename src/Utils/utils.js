import { GRAPH_ID_TITLE_MAP } from "./constants"

export const getGraphTitleFromId = (graphId) => {
    let map = GRAPH_ID_TITLE_MAP;
    
    return map[graphId];
}