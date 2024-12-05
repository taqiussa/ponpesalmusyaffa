import React from "react";

const TextareaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = "",
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-slate-600 capitalize mb-1">
                    {label}
                </label>
            )}
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="border-gray-300 h-24 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
            />
            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextareaField;
