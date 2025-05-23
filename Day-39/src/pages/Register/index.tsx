import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
} from '@mui/material';
import { useState } from 'react';
import './style.css'
import type {ChangeEvent, FormEvent, FocusEvent} from 'react';
import {useNavigate} from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const handleBlur: (e: FocusEvent<HTMLInputElement>) => void = (e: FocusEvent<HTMLInputElement> ) => {
        setTouched(prevTouched => ({
            ...prevTouched,
            [e.target.name]: true,
        }))
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = () => {
        if (!formData.password) {
            return false;
        } else if (formData.password.length < 6) {
            return false;
        }
        return true;
    }

    const validateConfirmPassword = () => {
        if (!formData.confirmPassword) {
            return false;
        } else if (formData.password && formData.confirmPassword !== formData.password) {
            return false;
        }
        return true;
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // submit form logic
    };

    const handleCancel = () => {
        // reset form state
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate('/login');
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex',justifyContent:'center', alignItems: 'center', mb: 2 }}>
                    <img src="../../assets/logo2.png" alt="Logo" width={40} height={40} />
                    <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: '#173054'}}>
                        BK
                        <Typography component="span" variant="h3" sx={{ color: '#f7a41d', fontWeight: 'bold' }}>
                            Star
                        </Typography>
                    </Typography>
                </Box>

                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#173054', textAlign: 'center' }}>
                    Đăng kí học viên
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Tên của bạn"
                        name="name"
                        margin="normal"
                        required
                        value={formData.name}
                        onChange={onChange}
                        onBlur={handleBlur}
                        error={touched.name && !formData.name.trim()}
                        helperText={touched.name && !formData.name.trim() ?"Vui lòng nhập tên của bạn.":""}
                    />

                    <TextField
                        fullWidth
                        label="Địa chỉ email"
                        name="email"
                        type="email"
                        margin="normal"
                        required
                        value={formData.email}
                        onChange={onChange}
                        onBlur={handleBlur}
                        error={touched.email && !validateEmail(formData.email)}
                        helperText={touched.email && !validateEmail(formData.email)
                                    ?"Địa chỉ email không hợp lệ.":''}
                    />

                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        margin="normal"
                        required
                        value={formData.password}
                        onChange={onChange}
                        onBlur={handleBlur}
                        error={touched.password && !validatePassword()}
                        helperText={touched.password && !validatePassword()
                                    ?"Mật khẩu phải có ít nhất 6 kí tự.":''}
                    />

                    <TextField
                        fullWidth
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        type="password"
                        margin="normal"
                        required
                        value={formData.confirmPassword}
                        onChange={onChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && !validateConfirmPassword()}
                        helperText={touched.confirmPassword && !formData.confirmPassword
                            ?"Vui lòng nhập lại mật khẩu"
                            :(touched.confirmPassword && formData.password !== formData.confirmPassword)
                                ?"Mật khẩu nhập lại không khớp."
                                :""
                    }
                    />

                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{xs: 6}}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                sx={{ textTransform: 'none' }}
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                        </Grid>
                        <Grid size={{xs: 6}}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'none' }}
                            >
                                Đăng ký
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegistrationForm;