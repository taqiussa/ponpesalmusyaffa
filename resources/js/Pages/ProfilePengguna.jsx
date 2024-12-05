import { Head, useForm } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { Grid, CssBaseline, Card, Divider, Button, Typography, FormControl, Tabs, Tab, TextField, Box, Avatar, IconButton, InputAdornment, Badge, Menu, MenuItem, Modal } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from '@mui/icons-material/PermMedia';
import ShowAlert from "@/Components/ShowAlert";
import FormField from '@/Components/FormField';
import Layout from '@/Layouts/Layout';
import InputField from '@/Components/InputField';
import PasswordField from '@/Components/PasswordField';

const theme = createTheme();

function ProfilePengguna({ user }) {
    const defaultPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s';
    const currentPhotoUrl = user.foto ? `/storage/${user.foto}` : defaultPhoto;

    const { data, setData, post, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        password: '',
        password_confirmation: '',
        foto: null,
    });

    const [newPhotoPreview, setNewPhotoPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [activeTab, setActiveTab] = useState('account');

    const [anchorEl, setAnchorEl] = useState(null);
    const inputFileRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (newPhotoPreview) {
                URL.revokeObjectURL(newPhotoPreview);
            }
            const newPreviewUrl = URL.createObjectURL(file);
            setData('foto', file);
            setNewPhotoPreview(newPreviewUrl);
        }
    };

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelectFile = () => {
        handleCloseMenu();
        inputFileRef.current.click();
    };

    const handleCapturePhoto = async () => {
        handleCloseMenu();
        setOpenModal(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };
    
    const handleTakePhoto = async () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photoURL = canvas.toDataURL('image/png');

        const response = await fetch(photoURL);
        const blob = await response.blob();
        const file = new File([blob], "captured_photo.png", { type: "image/png" });

        setData('foto', file);
        setNewPhotoPreview(photoURL);
        setOpenModal(false);
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    const handleSubmit = (route, successMsg, errorMsg) => (e) => {
        e.preventDefault();
        post(route, {
            onSuccess: () => {
                ShowAlert({ icon: "success", title: "Berhasil!", text: successMsg, timer: 3500 });
                reset();
                setNewPhotoPreview(null);
                if (response && response.foto) {
                    setNewPhotoPreview(`/storage/${response.foto}`);
                }
            },
            onError: () => {
                ShowAlert({ icon: "error", title: "Gagal!", text: errorMsg, timer: 3500 });
            },
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Head title='Profile' />
                <Grid container direction="column" sx={{ overflowX: "hidden" }}>
                    <Grid container direction={{ xs: "column", md: "row" }} spacing={3} sx={{ position: "relative" }}>
                        <Grid item md={4}>
                            <Card variant="outlined" sx={{ p: 2.5 }}>
                                <Grid container direction="column" alignItems="center">
                                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                                        <Typography variant="body2">Foto Lama</Typography>
                                        <Avatar
                                            sx={{ width: 90, height: 90, margin: "0 auto" }}
                                            src={currentPhotoUrl}
                                        />
                                    </Box>
                                    {newPhotoPreview && (
                                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                                            <Typography variant="body2">Foto Baru</Typography>
                                            <Avatar
                                                sx={{ width: 90, height: 90, margin: "0 auto" }}
                                                src={newPhotoPreview}
                                            />
                                        </Box>
                                    )}

                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    badgeContent={
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <IconButton onClick={handleOpenMenu}>
                                                <PhotoCameraIcon
                                                    sx={{
                                                        border: "4px solid white",
                                                        backgroundColor: "#ff558f",
                                                        color: "white",
                                                        borderRadius: "50%",
                                                        padding: ".3rem",
                                                        width: 40,
                                                        height: 40
                                                    }}
                                                />
                                            </IconButton>
                                            {newPhotoPreview && (
                                                <Grid sx={{ ml: 1    }}>
                                                    <IconButton onClick={handleSubmit(route('profil-pengguna.foto'), "Foto berhasil diperbarui.", "Foto gagal diperbarui.")}>
                                                        <SaveIcon
                                                            sx={{
                                                                border: "4px solid white",
                                                                backgroundColor: "#5f97ff",
                                                                color: "white",
                                                                borderRadius: "50%",
                                                                padding: ".3rem",
                                                                width: 40,
                                                                height: 40
                                                            }} 
                                                            />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                        </Box>
                                    }
                                />

                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                                        <MenuItem onClick={handleSelectFile}>Pilih dari File</MenuItem>
                                        <MenuItem onClick={handleCapturePhoto}>Foto dari Kamera</MenuItem>
                                    </Menu>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={inputFileRef}
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                    
                                    <Typography variant="h6" sx={{ mt: 3 }}>{user.name}</Typography>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item md={8}>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} textColor="primary" indicatorColor="primary">
                                    <Tab style={{ fontSize: 'sm'}} value="account" label="Akun" />
                                    <Tab style={{ fontSize: 'sm'}} value="password" label="Password" />
                                </Tabs>
                                <Divider />

                                <Box sx={{ p: 2 }}>
                                    {activeTab === 'account' && (
                                        <FormControl fullWidth>
                                            <InputField
                                                label="Nama"
                                                name="name"
                                                placeholder="Masukan Nama....."
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                error={errors.name}
                                            />
                                            <Button variant="contained" color="primary" onClick={handleSubmit(route('profil-pengguna.nama'), "Nama berhasil diperbarui.", "Nama gagal diperbarui.")}>
                                                Update Nama
                                            </Button>
                                        </FormControl>
                                    )}

                                    {activeTab === 'password' && (
                                        <FormControl fullWidth>
                                             {/* <FormField label="Password" error={errors.password}>
                                                <div className="flex items-center border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md shadow-blue-300 focus:ring">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Masukan Password Baru....."
                                                        name="password"
                                                        value={data.password}
                                                        onChange={(e) => setData("password", e.target.value)}
                                                        className="border-none rounded-tl-md rounded-bl-md focus:border-blue-500 focus:ring-blue-300 shadow-blue-300 focus:ring pl-2 w-full"
                                                    />
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        size="medium"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </div>
                                            </FormField>

                                            <FormField label="Konfirmasi Password" error={errors.password_confirmation}>
                                                <div className="flex items-center border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md shadow-blue-300 focus:ring">
                                                    <input
                                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                                        placeholder="Konfirmasi Password....."
                                                        name="password_confirmation"
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                                        className="border-none rounded-tl-md rounded-bl-md focus:border-blue-500 focus:ring-blue-300 shadow-blue-300 focus:ring pl-2 w-full"
                                                    />
                                                    <IconButton
                                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                        size="medium"
                                                    >
                                                        {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </div>
                                            </FormField> */}
                                            <PasswordField
                                                label="Password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Masukan Password....."
                                                error={errors.password}
                                            />
                                            <PasswordField
                                                label="Konfirmasi Password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Konfirmasi Password Anda....."
                                                error={errors.password_confirmation}
                                            />
                                            <Button variant="contained" color="primary" onClick={handleSubmit(route('profil-pengguna.password'), "Password berhasil diperbarui.", "Password gagal diperbarui.")}>
                                                Update Password
                                            </Button>
                                        </FormControl>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Modal open={openModal} onClick={handleCloseModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
                        <Typography variant="h6" align="center">Ambil Foto</Typography>
                        <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
                        <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
                        <Button variant="contained" onClick={handleTakePhoto} sx={{ mt: 2 }}>Ambil Foto</Button>
                        <Button variant="outlined" onClick={handleCloseModal} sx={{ mt: 2, ml: 2 }}>Tutup</Button>
                    </Box>
                </Modal>
        </ThemeProvider>
    );
}

ProfilePengguna.layout = (page) => <Layout children={page} title="Profile" />;

export default ProfilePengguna;
