import _ from 'lodash';
import Select from 'react-select'
import { STATES } from '../Utils/constants';

export default function StateSelect(props) {
    const onChange = selectedOptions => {
        if (_.isUndefined(props.handleChange)) {
            return;
        }
        props.handleChange(selectedOptions)
    }
    let stateVal = '';
    let defaultValue = global.user?.userState;
    defaultValue = 'Florida';
    
    if (!_.isUndefined(defaultValue)) {
        stateVal = _.find(STATES, function(state) {
            return state.label === defaultValue;
        });
    }

    return (
        <div style={{ minWidth: '160px' }}>
            <Select
                options={STATES}
                onChange={onChange}
                defaultValue={props.defaultValue ? props.defaultValue : stateVal}
            />
        </div>
    );
}