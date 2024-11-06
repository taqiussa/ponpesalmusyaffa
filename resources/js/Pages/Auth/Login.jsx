import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import Logo from "@/img/logo.png";
import Foto_A from "@/img/Foto_A.jpeg";
import { IconButton } from '@mui/material';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { data, setData, post, processing, errors, reset } = useForm({
      username: '',
      password: '',
      remember: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const submit = (e) => {
      e.preventDefault();
      post(route('login'), {
          onFinish: () => reset('password'),
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
        <Head title="Login" />
        <div className={`min-h-screen flex justify-center items-center ${isMobile ? 'bg-cover bg-center' : 'bg-white'}`} style={{ backgroundImage: isMobile ? `url(${Foto_A})` : 'none' }}>
           <div className={`max-w-screen-xl w-full m-10 shadow rounded-lg flex justify-center flex-1 overflow-hidden ${isMobile ? 'bg-white' : 'bg-[#0AD1C8]'}`} style={{ backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.5)' : '' }}>
            <div className="lg:w-1/2 xl:w-5/12 md:p-20 lg:p-16 p-5 flex flex-col justify-center">
              <div className='flex justify-center'>
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-32"
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full flex-1">
                  <div className={`mt-3 mb-16 ${isMobile ? '' : 'border-b'} text-center`}>
                    <div className={`leading-none px-5 inline-block text-xl tracking-wide font-medium transform translate-y-1/2 ${isMobile ? 'text-gray-900' : 'bg-[#0AD1C8] text-white'}`}>
                        Masuk
                    </div>
                  </div>

                  <form onSubmit={submit}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className={`w-full px-8 py-4 rounded-lg font-medium ${isMobile ? 'bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white' : 'border-none'} text-sm`}
                        type="text"
                        name="username"
                        autoComplete="off"
                        placeholder="Username"
                        value={data.username}
                        required
                        onChange={(e) => setData('username', e.target.value)}
                      />

                      <div className={`flex items-center border border-gray-200 ${isMobile ? 'bg-gray-100' : 'bg-white'} rounded-lg mt-3`}>
                        <input
                          className={`w-full px-8 py-4 rounded-lg font-medium ${isMobile ? 'bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white' : 'border-none'} text-sm`}
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          autoComplete="off"
                          placeholder="Password"
                          value={data.password}
                          required
                          onChange={(e) => setData('password', e.target.value)}
                        />
                        <IconButton
                          onClick={togglePasswordVisibility}
                          className="p-2"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <Eye style={{ color: '#6B7280' }} />
                          ) : (
                            <EyeOff style={{ color: '#6B7280' }} />
                          )}
                        </IconButton>
                      </div>

                      <button
                        type="submit"
                        className="mt-10 tracking-wide font-semibold bg-[#14919B] text-white w-full py-3 rounded-lg hover:bg-[#0B6477] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        Masuk
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-green-100 text-center hidden lg:flex">
              <img src={Foto_A} alt="" className="w-full h-full bg-cover bg-center bg-no-repeat" />
            </div>
          </div>
        </div>
    </>
  );
}

export default Login;
