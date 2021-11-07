import Select from 'react-select'

export default function StateSelect(props) {
    const stateOptions = [{
        value: 'Florida', label: 'Florida'
    }];

    return <Select options={stateOptions} />;
}