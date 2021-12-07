import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Line, Bar } from "react-chartjs-2";
import CustomLoader from "../Components/CustomLoader";
import CustomTitle from "../Components/CustomTitle";
import StateSelect from "../Components/stateSelect";
import { POLLUTANT_COLOR_MAP } from "../Utils/constants";
import { API_VERSION, BASE_URL, QUERY7, PROTOCOL } from '../Utils/constants';
import './graph-styles.css';
import PollutantSelect from "../Components/PollutantSelect";

export default function Graph7(props) {

    const [apiFinished, setApiFinished] = useState(false);
    const [finalData, setFinalData] = useState({});
    const [userState, setUserState] = useState(props.userState ? props.userState : global.userState ? global.userState : 'Florida');
    const [pollutant, setPollutant] = useState('NO2');
    
    useEffect(() => {
        setApiFinished(false);
        Promise.all([
            makeApiCall(),
        ])
        .then(result => {
            let newResult = result[0].result;
            let allDatasets = _.map(newResult, res => {
                return {
                    label: res[0].type,
                    data: _.map(res, obj => obj.data),
                    borderColor: POLLUTANT_COLOR_MAP[res[0].type] || 'black',
                    backgroundColor: POLLUTANT_COLOR_MAP[res[0].type] || 'black',
                    // backgroundColor: '#FFF',
                    yAxisID: 'test'
                }
            });

            let allLabels = result[0].allLabels;
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
    }, [userState, pollutant]);

    let makeApiCall = () => {
        const graph7Url = `${PROTOCOL}${BASE_URL}${API_VERSION}${QUERY7}?state=${userState}`;
        return axios.get(`${graph7Url}`)
        .then(response => {
            let responseData = response.data;
            let groupedData = _.groupBy(responseData, 'POLLUTANT');

            let group = groupedData['CO'];
            var populationData = _.map(group, obj => {
                return {
                    year: obj.YEAR,
                    type: 'POPULATION',
                    data: obj.POPULATION_PERCENTAGE_DIFF
                }
            });
            var result = _.map(groupedData, arr => {
                if (arr[0].POLLUTANT !== pollutant) {
                    return null;
                }
                return _.map(arr, obj => {
                    return {
                        year: obj.YEAR,
                        type: obj.POLLUTANT,
                        data: obj.POLLUTANT_PERCENTAGE_DIFF
                    };
                });
            });

            result = _.compact(result);

            result.push(populationData);

            let allLabels = ['2017', '2018', '2019', '2020'];

            let obj = {
                result,
                allLabels
            };

            return obj;
        })
        .catch(e => {
            // alert('Something went wrong! ' + e);
        });
    }

    const onStateChanged = (e) => {
        setUserState(e.label);
    };

    const onPollutantChanged = e => {
        setPollutant(e.value);
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
                            <div className="selection-title">State:</div>
                            <PollutantSelect handleChange={onPollutantChanged} />
                        </div>
                    </div>

                    {
                        apiFinished ? 
                        <Bar data={finalData} style={{ maxHeight: '70vh' }} /> : 
                        <CustomLoader />
                    }
                </div>
            </div>
        </>
    );
}
