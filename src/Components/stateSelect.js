import _ from 'lodash';
import Select from 'react-select'
import { STATES } from '../Utils/constants';

export default function StateSelect(props) {
    const onChange = selectedOptions => {
        if (_.isEmpty(props.handleChange)) {
            return;
        }
        props.handleChange(selectedOptions)
    }

    return <Select options={STATES} onChange={onChange} />;
}