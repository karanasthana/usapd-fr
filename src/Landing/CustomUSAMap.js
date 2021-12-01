import { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import CustomLoader from "../Components/CustomLoader";

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

  useEffect(() => {
    setApiFinished(false);
    // hit api
    // then
    // iterate over all the states and calculate their color from green to red (green is the least polluted, red is the most)
    setTimeout(() => {
      setStatesCustomConfig(getStatesCustomConfig(5));
      setApiFinished(true);
    }, 5000);
    console.log('test');
    // iterate over the result of the API and then -->
  }, []);

  const mapHandler = (event) => {
      alert(event.target.dataset.name);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '90vh', border: '1px solid black', borderRadius: '5px' }}>
      {
        apiFinished ? 
        <USAMap customize={statesCustomConfig} onClick={mapHandler} /> :
        <CustomLoader type={'BallTriangle'}/>
      }
    </div>
  );
}