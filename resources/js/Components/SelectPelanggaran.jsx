import React from 'react';
import Select from 'react-select';

const SelectPelanggaran = ({ 
    options, 
    value, 
    onChange, 
    error, 
    placeholder = "Cari Pelanggaran...", 
    className = '' 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor="select-pelanggaran" className="block text-sm font-medium text-gray-700">
                Pilih Pelanggaran
            </label>
            <Select
                id="select-pelanggaran"
                options={options}
                value={options.find(option => option.id === value) || null}
                onChange={selectedOption => onChange(selectedOption ? selectedOption.id : null)}
                placeholder={placeholder}
                isSearchable
                getOptionLabel={option => option.nama}
                getOptionValue={option => option.id}
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

export default SelectPelanggaran;
