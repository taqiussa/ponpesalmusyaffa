import React from 'react';
import Select from 'react-select';

const SelectSantri = ({ 
    options, 
    value, 
    onChange, 
    error, 
    placeholder = "Cari Santri...", 
    className = '' 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor="select-santri" className="block text-sm font-medium text-gray-700">
                Pilih Santri
            </label>
            <Select
                id="select-santri"
                options={options}
                value={options.find(option => option.nis === value) || null}
                onChange={selectedOption => onChange(selectedOption ? selectedOption.nis : null)}
                placeholder={placeholder}
                isSearchable
                getOptionLabel={option => option.santri.name}
                getOptionValue={option => option.nis}
                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectSantri;
