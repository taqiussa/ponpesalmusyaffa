import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from '@inertiajs/react';

const EyeIcon = ({ isVisible }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
        }}
        onClick={isVisible}
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
    </svg>
);

const EyeSlashIcon = ({ isVisible }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
        }}
        onClick={isVisible}
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
        />
    </svg>
);

export default function Login({ status, canResetPassword }) {
    const [isMobile, setIsMobile] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
        <Head title="Login" />
            <div
                style={{
                    display: "flex",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: isMobile ? "20px" : "0",
                    backgroundImage: isMobile
                        ? "url('https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_640.jpg')"
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {isMobile && (
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            position: "absolute",
                            top: "20%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s"
                            alt="Logo"
                            style={{
                                width: "100px",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                )}

                {/* Card for desktop */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        maxWidth: "600px",
                        width: "100%",
                        padding: isMobile ? "20px" : "40px",
                        backgroundColor: isMobile
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(255, 255, 255, 0.9)", // Desktop card background
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        position: isMobile ? "relative" : "initial",
                        margin: isMobile ? "0" : "0 20px", // Margin luar untuk desktop
                    }}
                >
                    {isMobile && (
                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "30px",
                                fontSize: "2em",
                            }}
                        >
                            Masuk
                        </h2>
                    )}
                    <form onSubmit={submit}>
                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="username"
                                style={{ marginBottom: "5px", display: "block" }}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Masukkan username"
                                required
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    boxSizing: "border-box",
                                    fontSize: "16px",
                                    paddingRight: "40px", // untuk memberikan ruang di kanan
                                }}
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="password"
                                style={{ marginBottom: "5px", display: "block" }}
                            >
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Masukkan password"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "15px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        boxSizing: "border-box",
                                        fontSize: "16px",
                                        paddingRight: "40px",
                                    }}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {showPassword ? (
                                    <EyeSlashIcon
                                        isVisible={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                ) : (
                                    <EyeIcon
                                        isVisible={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: "15px",
                                border: "none",
                                borderRadius: "4px",
                                backgroundColor: "#007bff",
                                color: "white",
                                cursor: "pointer",
                                width: "100%",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#0056b3")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#007bff")
                            }
                        >
                            Masuk
                        </button>
                    </form>
                </div>

                {/* Image for desktop */}
                {!isMobile && (
                    <div
                        style={{
                            width: "50%",
                            height: "100%",
                            backgroundImage:
                                "url('https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_640.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                        }}
                    >
                        <div className="flex-col mt-[10%] ml-[5%]">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s"
                                alt="Logo"
                                className="left-4 top-4 w-20"
                            />
                            <p className="text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
