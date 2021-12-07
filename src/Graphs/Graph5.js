import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line, Bar } from "react-chartjs-2";
import CustomCalendar from "../Components/CustomCalendar";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from "../Utils/constants";
import { getStringDate } from "../Utils/utils";
import { API_VERSION, BASE_URL, QUERY5, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';
import { FormControl } from "react-bootstrap";

export default function Graph5(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : global.userState ? global.userState : 'Florida');
    const [startDate, setStartDate] = useState(DEFAULT_MIN_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_MAX_DATE);
    const [threshold, setThreshold] = useState(25);
    
    useEffect(() => {
        setApiFinished(false);
        makeApiCall()
        .then(result => {
            debugger;
            let allDatasets = _.map(result, res => {
                return {
                    label: 'Number of days',
                    data: res.pollutant_data.data,
                    borderColor: 'crimson',
                    backgroundColor: 'green',
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
            alert(e);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState, startDate, endDate, threshold]);

    let makeApiCall = () => {
        const graph5Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY5}?state=${userState}&start=${startDate}&end=${endDate}&threshold=${threshold}`;
        return axios.get(`${graph5Url}`)
        .then(response => {
            let responseData = response.data;
            let allLabels = _.map(responseData, (val) => {
                let year = String(val.YEAR);
                return `${val.MONTH} ${year.substring(year.length-2, year.length)}`;
            });
            let allValues = _.map(responseData, (val) => {
                return `${val.DAYCOUNT}`;
            });
            return [{
                pollutant: userState,
                pollutant_data: {
                    data: allValues,
                    labels: allLabels
                }
            }];
        })
        .catch(e => {
            // alert('Something went wrong! ' + e);
        });
    }

    const setThresholdValue = e => {
        let value = e.target.value;
        if (!value) {
            value = 0;
        }
        setThreshold(value);
    };

    const onStateChanged = (e) => {
        setUserState(e.label);
    };

    const onStartDateChanged = (startDate) => {
        setStartDate(getStringDate(startDate));
    };
    
    const onEndDateChanged = (endDate) => {
        setEndDate(getStringDate(endDate))
    };

    const options = {
        scales: {
            y: {
                max: 35,
                suggestedMin: 0
            }
        }
    };
    
    return (
        <>
            <CustomTitle title={props.title} />
            <div>   
                <div className='graph-container'>
                    <div className='dynamics-container'>
                        <div className='selection-container'>
                            <div className="selection-title">Start Date:</div>
                            <CustomCalendar onChange={onStartDateChanged} value={DEFAULT_MIN_DATE} monthPicker={true} />
                        </div>
                        <div className='selection-container'>
                            <div className="selection-title">End Date:</div>
                            <CustomCalendar onChange={onEndDateChanged} value={DEFAULT_MAX_DATE} monthPicker={true} />
                        </div>

                        <div className='selection-container'>
                            <div className="selection-title">State:</div>
                            <StateSelect handleChange={onStateChanged} />
                        </div>

                        <div className='selection-container'>
                            <div className="selection-title">Threshold Value:</div>
                            <FormControl
                                placeholder="Threshold"
                                aria-label="Threshold"
                                aria-describedby="basic-addon1"
                                defaultValue={'25'}
                                onChange={e => _.debounce(setThresholdValue, 800)(e)}
                            />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Bar data={finalData} style={{ maxHeight: '70vh' }} options={options}
                        /> : 
                        <CustomLoader />
                    }
                </div>
            </div>
        </>
    );
}