import _ from 'lodash';
import Select from 'react-select'
import { STATES } from '../Utils/constants';
import { components } from "react-select";
import Creatable from "react-select/creatable";

export default function StateSelect(props) {
    const onChange = selectedOptions => {
        if (_.isUndefined(props.handleChange)) {
            return;
        }
        if (props.multi) {
            let allStates = _.map(selectedOptions, opt => opt.label);
            props.handleChange(_.join(allStates, ','));
        } else {
            props.handleChange(selectedOptions)
        }
    }
    let stateVal = '';
    let defaultValue = global.userState;
    defaultValue = _.isEmpty(defaultValue) ? 'Florida' : defaultValue;
    
    if (!_.isUndefined(defaultValue)) {
        stateVal = _.find(STATES, function(state) {
            return state.label === defaultValue;
        });
    }

    const Menu = props => {
        const optionSelectedLength = props.getValue().length;
        return (
            <components.Menu {...props}>
            {optionSelectedLength < 4 ? (
                props.children
            ) : (
                <div>Cannot select more than 4 states</div>
            )}
            </components.Menu>
      );
    };

    const isValidNewOption = (inputValue, selectValue) =>
            inputValue.length > 0 && selectValue.length < 5;
    let defaultStateList = [];
    defaultStateList.push(stateVal);

    return (
        props.multi ? 
        <div style={{ minWidth: '160px' }}>
            <Creatable
                components={{ Menu }}
                isMulti
                isValidNewOption={isValidNewOption}
                options={STATES}
                onChange={onChange}
                defaultValue={props.defaultValue ? props.defaultValue : defaultStateList}
            />
        </div> :
        <div style={{ minWidth: '160px' }}>
            <Select
                options={STATES}
                onChange={onChange}
                defaultValue={props.defaultValue ? props.defaultValue : stateVal}
            />
        </div>
    );
}