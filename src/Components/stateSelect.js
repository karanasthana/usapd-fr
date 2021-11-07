import Select from 'react-select'
import { STATES } from '../Utils/constants';

export default function StateSelect(props) {
    

    const onChange = selectedOptions => {
        props.handleChange(selectedOptions)
    }

    return <Select options={STATES} onChange={onChange} />;
}