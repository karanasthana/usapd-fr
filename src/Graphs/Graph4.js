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
import { API_VERSION, BASE_URL, QUERY4, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';
import PollutantSelect from "../Components/PollutantSelect";

export default function Graph2(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : 'Florida');
    const [startDate, setStartDate] = useState(DEFAULT_MIN_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_MAX_DATE);
    const [pollutant, setPollutant] = useState('NO2');
    const onPollutantChanged = pollutant => { setPollutant(pollutant.value) };
    const COLOR_MAP = ['blue', 'orange', 'brown', 'green'];
    
    useEffect(() => {
        setApiFinished(false);

        Promise.all([
            makeApiCall(pollutant)
        ])
        .then(result => {
            result = result[0];
            let allDatasets = _.map(result, (res, ndx) => {
                return {
                    label: res.state,
                    data: res.pollutant_data.data,
                    borderColor: COLOR_MAP[ndx],
                    backgroundColor: '#FFF'
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
            setApiFinished(true);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState, pollutant, startDate, endDate]);

    let makeApiCall = pollutant => {
        const graph2Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY4}?state_list=${userState}&pollutant=${pollutant}&start=${startDate}&end=${endDate}`;
        return axios.get(`${graph2Url}`)
        .then(response => {
            let responseData = response.data;
            let allLabels = _.map(responseData, (val) => {
                return `${val.TIMELINE}`;
            });
            

            let allGroupedValues = _.groupBy(responseData, 'STATE');
            let allStates = _.uniq(_.map(responseData, 'STATE'));
            let allResults = _.map(allStates, state => {
                let allValues = _.map(allGroupedValues[state], (val) => {
                    return `${val.MEANVALUE}`;
                });
                return {
                    pollutant: pollutant,
                    state: state,
                    pollutant_data: {
                        data: allValues,
                        labels: allLabels
                    }
                }
            });
            return allResults;
        })
        .catch(e => {
            // alert('Something went wrong! ' + e);
        });
    }

    const onStateChanged = (e) => {
        setUserState(e);
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
                            <StateSelect handleChange={onStateChanged} multi={true} />
                        </div>
                        <div className='selection-container'>
                            <div className="selection-title">Pollutant:</div>
                            <PollutantSelect handleChange={onPollutantChanged} />
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