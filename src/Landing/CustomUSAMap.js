import { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import CustomLoader from "../Components/CustomLoader";
import './usa-map.css';
import { API_VERSION, BASE_URL, PROTOCOL, QUERY6, STATE_ABBREV_MAP, HEATMAP } from "../Utils/constants";
import axios from "axios";
import _ from "lodash";


export default function CustomUSAMap(props) {
  const [allStatesData, setAllStatesData] = useState([]);

  const stateClicked = (state, rank, aqi) => {
    alert(`${state} has a rank ${rank} with an AQI of ${aqi}`);
  };

  const getStatesCustomConfig = (val) => {
    if (_.isEmpty(allStatesData) ){
      return {
        "NJ": {
          fill: "navy",
          clickHandler: (e) => stateClicked(e, 'NJ'),
        },
        "NY": {
          fill: "#CC0000",
        }
      }
    }

    let result = {};
    let allowedStates = _.keys(STATE_ABBREV_MAP);

    _.each(allStatesData, function(stateData) {
      let stateName = "";
      if (_.includes(allowedStates, stateData.STATE)) {
        stateName = STATE_ABBREV_MAP[stateData.STATE]
      } else {
        return;
      }

      let object = {
        [stateName]: {
          fill: HEATMAP[stateData.RANK],
          // fill: `rgb(${255* (stateData.RANK / 50)}, ${(50 - (stateData.RANK / 50)) * 255}, ${0})`,
          clickHandler: (e) => stateClicked(stateData.STATE, stateData.RANK, stateData.AVGAQI)
        }
      }
      result = _.extend(result, object);
    });
    
    return result;
  };

  const [apiFinished, setApiFinished] = useState(false);
  const [statesCustomConfig, setStatesCustomConfig] = useState(getStatesCustomConfig());

  const calculateCustomConfig = result => {
    console.log(result);
    setStatesCustomConfig(getStatesCustomConfig());
  };

  useEffect(() => {
    setApiFinished(false);
    const graph6Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY6}`;
    return axios.get(graph6Url)
    .then(result => {
      let response = result.data;
      setAllStatesData(response);
      // AVGAQI: 6.185170655158886
      // RANK: 1
      // STATE: "Hawaii"
      calculateCustomConfig(result);
      setApiFinished(true);
    })
    .catch(e => {
      alert(e);
      setApiFinished(true);
    });
    // iterate over all the states and calculate their color from green to red (green is the least polluted, red is the most)
    // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapHandler = (event) => {
      alert(event.target.dataset.name);
  };

  return (
    <div className={'custom-usa-map-container'}>
      {
        apiFinished ? 
        <USAMap customize={getStatesCustomConfig()} onClick={mapHandler} /> :
        <div>
          <p>Fetching States AQI Level</p>
          <USAMap />
        </div>
      }
    </div>
  );
}