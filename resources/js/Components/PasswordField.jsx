import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordField({ label, name, value, onChange, placeholder, error }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-slate-600 capitalize mb-1">
                {label}
            </label>
            <div className="relative rounded-md shadow-md">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none"
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
};

export default PasswordField;
