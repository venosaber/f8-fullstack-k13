import { useState } from 'react';
import {
    Container,
    Paper,
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import type { MouseEvent, FormEvent } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // login logic
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5', // Màu nền xám nhạt giống ảnh
                p: { xs: 2, md: 4 }
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    borderRadius: '16px',
                    overflow: 'hidden', // to remain effect of border-radius with child grid items
                    width: '100%',
                    maxWidth: '1000px',
                }}
            >
                <Grid container sx={{height: '100%', display: 'flex'}}>
                    {/* Left part */}
                    <Grid size={{xs: 0, md: 6}}
                        sx={{
                            backgroundColor: 'rgb(49, 130, 206)',
                            color: 'rgb(255,255,255)',
                            display: {xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Box sx={{p: {xs: 3, md: 5}}}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                GIEO MẦM SÁNG TẠO...
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right'}}>
                                ... DẪN HƯỚNG ĐAM MÊ
                            </Typography>
                        </Box>

                    </Grid>

                    {/* Right part */}
                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                p: {xs: 3, md: 5},
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <img src="../../assets/logo2.png" alt="Logo" width={40} height={40} />
                                <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: '#173054'}}>
                                    BK
                                    <Typography component="span" variant="h3" sx={{ color: '#f7a41d', fontWeight: 'bold' }}>
                                        Star
                                    </Typography>
                                </Typography>
                            </Box>

                            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                                Đăng Nhập
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
                                Cung cấp giải pháp toàn diện cho <br/> lớp học thông minh
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Nhập email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nhập mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                    }
                                    label="Ghi nhớ tôi"
                                    sx={{ mt: 1, mb: 1, alignSelf: 'flex-start' }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 2,
                                        mb: 2,
                                        py: 1.5,
                                        backgroundColor: '#3f72af',
                                        '&:hover': {
                                            backgroundColor: '#315a8c',
                                        }
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <MuiLink href="/register" variant="body2" sx={{textDecoration: 'none'}}>
                                        Đăng kí tài khoản cho học viên
                                    </MuiLink>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default LoginPage;