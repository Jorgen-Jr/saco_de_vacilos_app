import React from 'react';
import PropTypes from 'prop-types';

export const FormSelect = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    formGroupStyle,
    value,
    error,
    children,
    label,
    disabled,
    data,
    ...props
}) => {
    return (
        <>
            <div className="form-group" style={formGroupStyle}>
                <label htmlFor={name} className="form-label">{label}</label>
                <select
                    id={name}
                    name={name}
                    type={type}
                    onChange={onChange}
                    className={className}
                    style={error && { border: 'solid 1px red' }}
                    value={value}
                    disabled={disabled}
                >
                    {data.length > 0 ? <>
                        <option>Selecione</option>
                        {data.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))
                        }
                    </>
                        :
                        <option disabled>Não Existem Opções</option>
                    }
                </select>
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

FormSelect.defaultProps = {
    type: "select",
    className: "",
    disabled: "",
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['select']),
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}