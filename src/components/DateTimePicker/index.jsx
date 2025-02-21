import PropTypes from 'prop-types';
import { DateTimePicker as XDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from 'luxon';

const DateTimePicker = ({
    label,
    value,  // timestamp 10-digits
    format = 'yyyy/MM/dd HH:mm',
    onChange = () => {},
    size = 'sm',
}) => {


    return (
        <XDateTimePicker
            label={label}
            slotProps={{
                textField: { size: size === 'sm' ? 'small' : ''  } }}
            value={DateTime.fromSeconds(value)}
            format={format}
            onChange={(e) => {
                onChange({ value: e.target.value / 1000 });
            }}
        />
    );
}

DateTimePicker.propTypes = {
    label: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.int,
    format: PropTypes.string,
    onChange: PropTypes.func,
}

export default DateTimePicker;
