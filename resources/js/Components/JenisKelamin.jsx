import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function JenisKelamin(
    { name, id, value, message, className, required, isFocused, handleChange },
    ref
) {

    const input = ref ? ref : useRef();

    useEffect(() => {

        if (isFocused) {

            input.current.focus();

        }


    }, []);

    return (
        <div className="mb-4">
            <div className="block text-slate-600 capitalize mb-1">
                jenis kelamin
            </div>
            <div>
                <select
                    name={name}
                    id={id}
                    value={value}
                    className={
                        `border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring ` +
                        className
                    }
                    ref={input}
                    required={required}
                    onChange={(e) => handleChange(e)}>

                    <option value="">Pilih Jenis Kelamin</option>

                    <option value="L">Laki-laki</option>

                    <option value="P">Perempuan</option>

                </select>
            </div>
            {message ?
                <div className='text-sm text-red-600'>
                    {message}
                </div>
                :
                null
            }
        </div>
    )
});
