import DatePicker from 'react-date-picker';
import _ from 'lodash';
import { useState } from 'react';
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from '../Utils/constants';

export default function CustomCalendar(props) {
    const [myDate, setDate] = useState(!_.isEmpty(props.value) ? new Date(props.value) : '')
    const handleSelect = date => {
        setDate(date);

        if (_.isUndefined(props.onChange)) {
            return;
        }
        props.onChange(date);
    }

    return (
        <div>
            <DatePicker
                onChange={handleSelect}
                minDate={new Date(DEFAULT_MIN_DATE)}
                maxDate={new Date(DEFAULT_MAX_DATE)}
                dayPlaceholder={'DD'}
                monthPlaceholder={'MM'}
                yearPlaceholder={'YYYY'}
                required={true}
                value={myDate}
                clearIcon={null}
            />
        </div>
    );
}