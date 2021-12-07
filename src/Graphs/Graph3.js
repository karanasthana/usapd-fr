import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line, Bar } from "react-chartjs-2";
import CustomCalendar from "../Components/CustomCalendar";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, POLLUTANT_COLOR_MAP } from "../Utils/constants";
import { getStringDate } from "../Utils/utils";
import { API_VERSION, BASE_URL, QUERY3, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';

export default function Graph3(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : global.userState ? global.userState : 'Florida');
    const [startDate, setStartDate] = useState(DEFAULT_MIN_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_MAX_DATE);
    
    useEffect(() => {
        setApiFinished(false);
        Promise.all([
            makeApiCall('SO2'),
            makeApiCall('NO2'),
            makeApiCall('CO'),
            makeApiCall('Ozone')
        ])
        .then(result => {
            let allDatasets = _.map(result, res => {
                return {
                    label: res.pollutant,
                    data: res.pollutant_data.data,
                    borderColor: POLLUTANT_COLOR_MAP[res.pollutant],
                    backgroundColor: POLLUTANT_COLOR_MAP[res.pollutant],
                    // yAxisID: res.pollutant,
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
    }, [userState, startDate, endDate]);

    let makeApiCall = pollutant => {
        const graph3Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY3}?state=${userState}&pollutant=${pollutant}&start=${startDate}&end=${endDate}`;
        return axios.get(`${graph3Url}`)
        .then(response => {
            let responseData = response.data;
            let allLabels = _.map(responseData, (val) => {
                return `${val.YEAR} Hr${val.MAX_HOUR}`;
            });
            let allValues = _.map(responseData, (val) => {
                return `${val.COUNT}`;
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
    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    return (
        <>
            <CustomTitle title={props.title} />
            <div>   
                <div className='graph-container'>
                    <div className='dynamics-container'>
                        <div className='selection-container'>
                            <div className="selection-title">Start Year:</div>
                            <CustomCalendar onChange={onStartDateChanged} value={DEFAULT_MIN_DATE} yearPicker={true} />
                        </div>
                        <div className='selection-container'>
                            <div className="selection-title">End Year:</div>
                            <CustomCalendar onChange={onEndDateChanged} value={DEFAULT_MAX_DATE} yearPicker={true} getEndDate={true} />
                        </div>

                        <div className='selection-container'>
                            <div className="selection-title">State:</div>
                            <StateSelect handleChange={onStateChanged} />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Bar data={finalData} style={{ maxHeight: '70vh' }} options={options} /> : 
                        <CustomLoader />
                    }
                </div>
            </div>
        </>
    );
}