import React from 'react';
import PropTypes from 'prop-types';

import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import "react-datepicker/dist/react-datepicker.css";

export const FormDatePicker = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    disabled,
    required,
    timeFormat,
    timeIntervals,
    timeCaption,
    dateFormat,
    ...props
}) => {
    registerLocale('pt', pt);
    return (
        <>
            <div className="form-group">
                <label htmlFor={name} className="form-label">{label}</label>
                <DatePicker 
                    locale='pt'
                    selected={value}
                    id={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={className}
                    timeFormat={timeFormat}
                    dateFormat={dateFormat}
                />
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

FormDatePicker.defaultProps = {
    type: "date",
    className: "",
    disabled: "",
    timeFormat: "HH:mm",
    dateFormat: "dd/MM/yyyy"
}

FormDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    timeFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    type: PropTypes.oneOf(['text', 'date']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}