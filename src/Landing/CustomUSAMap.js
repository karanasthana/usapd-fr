import { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import CustomLoader from "../Components/CustomLoader";
import './usa-map.css';
import { API_VERSION, BASE_URL, PROTOCOL, QUERY6, STATE_ABBREV_MAP, HEATMAP } from "../Utils/constants";
import axios from "axios";
import _ from "lodash";
import { Modal } from "react-bootstrap";
import { USA_MAP_HEADING } from "../Utils/string_constants";

export default function CustomUSAMap(props) {
  const [allStatesData, setAllStatesData] = useState([]);
  const [showRank, setShowRank] = useState(false);
  const [rankText, setRankText] = useState('');
  const [currentRank, setCurrentRank] = useState('');
  const [currentState, setCurrentState] = useState('');
  const handleClose = () => setShowRank(false);

  const stateClicked = (state, rank, aqi) => {
    // alert();
    setShowRank(true);
    setCurrentRank(rank);
    setCurrentState(state);
    setRankText(`${state} has a rank ${rank} with an AQI of ${aqi}`);
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
    <>
    <div>
      <div style={{ textAlign: 'center', color: '#178be7' }}>
        <h1>{USA_MAP_HEADING}</h1>
      </div>
    </div>
    <div className={'custom-usa-map-container'}>
      {
        apiFinished ? 
        <USAMap customize={getStatesCustomConfig()} onClick={mapHandler} /> :
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ margin: '15px' }}>Fetching AQI Level per State....</h3>
            <CustomLoader inline='true' />
          </span>
          <USAMap />
        </div>
      }
      {
        <Modal
            show={showRank}
            onHide={handleClose}
            centered>
            <Modal.Header closeButton >
                <Modal.Title>{currentState} - Rank {currentRank}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {rankText} 
            </Modal.Body>
        </Modal>
      }
    </div>
    </>
  );
}