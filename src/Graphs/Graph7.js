import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line } from "react-chartjs-2";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { POLLUTANT_COLOR_MAP } from "../Utils/constants";
import { API_VERSION, BASE_URL, QUERY7, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';

export default function Graph7(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : 'Florida');
    // const [pollutant, setPollutant] = useState({});
    
    useEffect(() => {
        setApiFinished(false);
        Promise.all([
            makeApiCall('SO2'),
            makeApiCall('NO2'),
            makeApiCall('CO'),
            makeApiCall('Ozone')
        ])
        .then(result => {
            // setPollutant(result.pollutant);
            let allDatasets = _.map(result, res => {
                return {
                    label: res.pollutant,
                    data: res.pollutant_data.data,
                    borderColor: POLLUTANT_COLOR_MAP[res.pollutant],
                    backgroundColor: '#FFF',
                    // yAxisID: res.pollutant
                }
            });

            let allLabels = _.map(result, res => {
                return res.pollutant_data.labels;
            });
            allLabels = _.flatten(allLabels);
            allLabels = _.union(allLabels);
            setFinalData({
                labels: allLabels,
                datasets: allDatasets
            });

            setApiFinished(true);
            return;
        })
        .catch(e => {
            // alert(e);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    let makeApiCall = pollutant => {
        const graph7Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY7}?state=${userState}`;
        return axios.get(`${graph7Url}`)
        .then(response => {
            let responseData = response.data;
            let allLabels = _.map(responseData, (val) => {
                return `${val.SEASON} ${val.YEAR}`;
            });
            let allValues = _.map(responseData, (val) => {
                return `${val.MEANVALUE}`;
            });
            return {
                pollutant: pollutant,
                pollutant_data: {
                    data: allValues,
                    labels: allLabels
                }
            };
        })
        .catch(e => {
            // alert('Something went wrong! ' + e);
        });
    }

    const onStateChanged = (e) => {
        setUserState(e.label);
    };
    
    return (
        <>
            <CustomTitle title={props.title} />
            <div>   
                <div className='graph-container'>
                    <div className='dynamics-container'>
                        <div className='selection-container'>
                            <div className="selection-title">State:</div>
                            <StateSelect handleChange={onStateChanged} />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Line data={finalData} style={{ maxHeight: '70vh' }} /> : 
                        <CustomLoader />
                    }
                </div>
            </div>
        </>
    );
}
