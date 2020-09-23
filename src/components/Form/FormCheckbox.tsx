import React from 'react';
import PropTypes from 'prop-types';
// import { IMaskInput } from 'react-imask';

import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckbox = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    checked,
    error,
    children,
    formGroupStyle,
    style,
    label,
    disabled,
    required,
    ...props
}) => {
    return (
        <>
            <div className="form-group" style={formGroupStyle}>
                <label htmlFor={name} className="form-label">{label}</label>
                <Checkbox
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    checked={checked}
                    style={style}
                    className={className}
                    disabled={disabled}
                />
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

FormCheckbox.defaultProps = {
    className: "",
    disabled: false,
}

FormCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type: PropTypes.oneOf(['checkbox']),
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}