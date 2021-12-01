import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CustomCalendar from "../Components/CustomCalendar";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, POLLUTANT_COLOR_MAP } from "../Utils/constants";
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
        Promise.all([makeApiCall('SO2'), makeApiCall('NO2'), makeApiCall('CO'), makeApiCall('Ozone')])
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
            debugger;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState, startDate, endDate]);

    let makeApiCall = pollutant => {
        return axios.get(`http://localhost:8080/api/v1/query1/getData?state=${userState}&pollutant=${pollutant}`)
        .then(result => {
            let responseData = result.data;
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
            debugger;
        });
    }

    const onStateChanged = (e) => {
        setUserState(e.label);
    };

    const onStartDateChanged = (startDate) => {
        console.log(startDate, 'start Date');
        // input is currently a date object
        // convert into the required format (mm/dd/yyyy) here and then update
        setStartDate(startDate);
    };
    
    const onEndDateChanged = (endDate) => {
        console.log(endDate, 'end Date');
        // input is currently a date object
        // convert into the required format here and then update
        setEndDate(endDate);
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
                    <Line data={finalData} /> : 
                    <CustomLoader />
                }
            </div>
        </div>
        </>
    );
}