import React from "react";

function SelectField({ label, name, value, disabled, onChange, options = [], error, placeholder = "Pilih opsi", required = false }) {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring ${
                    error ? "border-red-500 focus:border-red-500" : ""
                }`}
            >
                <option value="">{placeholder}</option>
                {options.length > 0 &&
                    options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export default SelectField;
