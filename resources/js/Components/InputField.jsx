import React from 'react';

const InputField = ({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    error, 
    placeholder = '', 
    name, 
    className = '' 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-slate-600 capitalize mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoCapitalize='of'
                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                />
            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
