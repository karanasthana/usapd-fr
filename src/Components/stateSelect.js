import Select from 'react-select'

export default function StateSelect(props) {
    const stateOptions = [{
        value: 'florida', label: 'Florida'
    }];

    const onChange = selectedOptions => {
        props.handleChange(selectedOptions)
    }

    return <Select options={stateOptions} onChange={onChange} />;
}