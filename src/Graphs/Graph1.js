import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line } from "react-chartjs-2";
import CustomCalendar from "../Components/CustomCalendar";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, POLLUTANT_COLOR_MAP } from "../Utils/constants";
import { getStringDate } from "../Utils/utils";
import { API_VERSION, BASE_URL, QUERY1, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';

export default function Graph1(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : 'Florida');
    const [startDate, setStartDate] = useState(DEFAULT_MIN_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_MAX_DATE);
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
                    yAxisID: res.pollutant,
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
    }, [userState, startDate, endDate]);

    let makeApiCall = pollutant => {
        const graph1Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY1}?state=${userState}&pollutant=${pollutant}&start=${startDate}&end=${endDate}`;
        return axios.get(`${graph1Url}`)
        .then(response => {
            let responseData = response.data;
            let allLabels = _.map(responseData, (val) => {
                return `${val.YEAR} Wk${val.WEEK}`;
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

    const onStartDateChanged = (startDate) => {
        setStartDate(getStringDate(startDate));
    };
    
    const onEndDateChanged = (endDate) => {
        setEndDate(getStringDate(endDate))
    };
    
    return (
        <>
            <CustomTitle title={props.title} />
            <div>   
                <div className='graph-container'>
                    <div className='dynamics-container'>
                        <div className='selection-container'>
                            <div className="selection-title">Start Date:</div>
                            <CustomCalendar onChange={onStartDateChanged} value={DEFAULT_MIN_DATE} />
                        </div>
                        <div className='selection-container'>
                            <div className="selection-title">End Date:</div>
                            <CustomCalendar onChange={onEndDateChanged} value={DEFAULT_MAX_DATE} />
                        </div>

                        <div className='selection-container'>
                            <div className="selection-title">State:</div>
                            <StateSelect handleChange={onStateChanged} />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Line data={finalData} style={{ maxHeight: '80vh' }} /> : 
                        <CustomLoader type="Audio" />
                    }
                </div>
            </div>
        </>
    );
}