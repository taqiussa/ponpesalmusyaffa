import { forwardRef, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs'

export default forwardRef(function Tahun(
        { name, id, value, message, className, required, isFocused, handleChange },
        ref
) {
        const [listTahun, setListTahun] = useState([]);

        let arrTahun = [];

        const arrayTahun = () => {
                let i;
                for (i = 2021; i <= Number(dayjs(new Date()).format('YYYY')); i++) {
                        arrTahun.push({
                                id: i,
                                tahun: i
                        });
                }
                setListTahun(arrTahun);
        }


        const input = ref ? ref : useRef();

        useEffect(() => {

                if (isFocused) {

                        input.current.focus();

                }

                arrayTahun();

        }, []);

        return (
                <div className="mb-4">
                        <div className="block text-slate-600 capitalize mb-1">
                                tahun
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
                                        onChange={(e) => handleChange(e)}
                                >

                                        <option value="">Pilih Tahun</option>

                                        {listTahun.map((tahun, index) => (
                                                <option key={index} value={`${tahun.tahun} / ${tahun.tahun + 1}`}>{`${tahun.tahun} / ${tahun.tahun + 1}`}</option>
                                        ))}

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
