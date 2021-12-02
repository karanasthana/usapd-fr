import { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import CustomLoader from "../Components/CustomLoader";
import './usa-map.css';
import { API_VERSION, BASE_URL, PROTOCOL, QUERY6 } from "../Utils/constants";
import axios from "axios";


export default function CustomUSAMap(props) {

  const getStatesCustomConfig = (val) => {
    if (val === 5) {
      return {
        "NJ": {
          fill: "yellow",
        }
      };
    }

    return {
      "NJ": {
        fill: "navy",
        clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
      },
      "NY": {
        fill: "#CC0000"
      }
    };
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
        <USAMap customize={statesCustomConfig} onClick={mapHandler} /> :
        <CustomLoader type={'BallTriangle'}/>
      }
    </div>
  );
}