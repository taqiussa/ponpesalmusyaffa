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
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                jenis kelamin
            </div>
            <div>
                <select
                    name={name}
                    id={id}
                    value={value}
                    className={
                        `border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring  ` +
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
