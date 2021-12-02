import _ from 'lodash';
import Select from 'react-select'
import { POLLUTANTS } from '../Utils/constants';

export default function PollutantSelect(props) {
    const onChange = selectedOptions => {
        if (_.isUndefined(props.handleChange)) {
            return;
        }
        props.handleChange(selectedOptions)
    }
    let pollutantVal = 'NO2';
    let defaultValue = 'NO2';
    
    if (!_.isUndefined(defaultValue)) {
        pollutantVal = _.find(POLLUTANTS, function(state) {
            return state.value === defaultValue;
        });
    }

    return (
        <div style={{ minWidth: '160px' }}>
            <Select
                options={POLLUTANTS}
                onChange={onChange}
                defaultValue={props.defaultValue ? props.defaultValue : pollutantVal}
            />
        </div>
    );
}