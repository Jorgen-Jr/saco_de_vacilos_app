import React from 'react';
import PropTypes from 'prop-types';
// import { IMaskInput } from 'react-imask';

export const FormInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    formGroupStyle,
    children,
    label,
    disabled,
    required,
    ...props
}) => {
    return (
        <>
            <div className="form-group" style={formGroupStyle}>
                <label htmlFor={name} className="form-label">{label}</label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className={className}
                    style={error && { border: 'solid 1px red' }}
                    disabled={disabled}
                />
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

FormInput.defaultProps = {
    type: "text",
    className: "",
    disabled: "",
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'file']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}