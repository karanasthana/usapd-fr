import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line } from "react-chartjs-2";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { DAY_COLOR_MAP } from "../Utils/constants";
import { API_VERSION, BASE_URL, QUERY2, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';
import PollutantSelect from "../Components/PollutantSelect";

export default function Graph2(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : 'Florida');
    const [pollutant, setPollutant] = useState('NO2');
    const onPollutantChanged = pollutant => { setPollutant(pollutant.value) };
    
    useEffect(() => {
        setApiFinished(false);
        Promise.all([
            makeApiCall(pollutant),
        ])
        .then(result => {
            let allDatasets = _.map(result[0], res => {
                return {
                    label: res.day,
                    data: res.day_data.data,
                    borderColor: DAY_COLOR_MAP[res.day],
                    backgroundColor: '#FFF',
                }
            });

            let allLabels = ['2016', '2017', '2018', '2019', '2020'];

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
    }, [userState, pollutant]);

    let makeApiCall = pollutant => {
        const graph2Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY2}?state=${userState}&pollutant=${pollutant}`;
        return axios.get(`${graph2Url}`)
        .then(response => {
            let responseData = response.data;
            let WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            let LABELS = ['2016', '2017', '2018', '2019', '2020'];

            let allValues = [];
            allValues = _.map(WEEKDAYS, (day) => {
                let dayValues = _.filter(responseData, (dataObj) => {
                    return _.includes(dataObj.WEEKDAY, day);
                });
                dayValues = _.map(dayValues, dayValObj => {
                    return dayValObj.MEANVALUE;
                });
                return {
                    day: day,
                    day_data: {
                        data: dayValues,
                        labels: LABELS,
                    },
                };
            });

            return allValues;
        })
        .catch(e => {
            alert('Something went wrong! ' + e);
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
                        <div className='selection-container'>
                            <div className="selection-title">Pollutant:</div>
                            <PollutantSelect handleChange={onPollutantChanged} />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Line data={finalData} style={{ maxHeight: '80vh' }} /> : 
                        <CustomLoader />
                    }
                </div>
            </div>
        </>
    );
}