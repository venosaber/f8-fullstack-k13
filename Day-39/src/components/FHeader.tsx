import {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// icons
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Avatar, Menu, MenuItem} from "@mui/material";
import {useLocation} from "react-router-dom";

export const CustomLogoIcon = () => (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 0.8}}>
        {/* Monitor part */}
        <Box
            sx={{
                width: '28px',
                height: '16px',
                border: '2.5px solid #0b3d91', // Dark blue
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography sx={{
                color: '#0b3d91',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                lineHeight: '1',
                letterSpacing: '1px'
            }}>--</Typography>
        </Box>
        {/* Bowtie part */}
        <Box
            sx={{
                width: '10px',
                height: '6px',
                backgroundColor: '#ff8c00',
                clipPath: 'polygon(0% 0%, 100% 0%, 80% 50%, 100% 100%, 0% 100%, 20% 50%)', // Bowtie shape
                marginTop: '1px',
            }}
        />
    </Box>
);

const drawerWidth = 240;
const navItems = ['Tổng quan', 'Bài thi', 'Thành viên'];
const settings = ['Thông tin cá nhân', 'Đăng xuất'];

export default function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ m: 2}}>
                <CustomLogoIcon />
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const location = useLocation();
    const [className, setClassName] = useState<string>('');

    useEffect(() => {
        const nameFromState = location.state?.className;
        if (nameFromState) {
            setClassName(nameFromState);
        }
    }, [location.state?.className]);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ backgroundColor: '#fff', color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo Section */}
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <Box sx={{ display: { xs: 'none', lg: 'block'} }}>
                            <CustomLogoIcon/>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '.05rem',
                                    lineHeight: 1.2
                                }}
                            >
                                <span style={{color: '#0b3d91'}}>BK</span>
                                <span style={{color: '#ff8c00'}}>Star</span>
                            </Typography>
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{color: '#0b3d91', marginTop: '-4px', fontSize: '0.7rem', letterSpacing: '.05rem'}}
                            >
                                Classroom
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{position: 'relative', left: '130px', display: {xs: 'none', md: 'block'}}}>
                        <Typography sx={{fontWeight: 600, fontSize: '1.2rem'}}>
                            {className}
                        </Typography>
                    </Box>

                    {/* Buttons: "Tạo lớp" and "Trang chủ" */}
                    <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center', ml: 'auto', mr: 1 /* Margin before user section */}}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            sx={{
                                mr: 2,
                                color: '#1976d2',
                                borderColor: '#1976d2',
                                textTransform: 'none',
                                fontWeight: 500,
                                padding: '5px 15px',
                                '&:hover': {
                                    borderColor: '#1976d2',
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                }
                            }}
                        >
                            Tạo lớp
                        </Button>
                        <Button
                            startIcon={<HomeIcon/>}
                            sx={{
                                color: '#1976d2',
                                textTransform: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Trang chủ
                        </Button>
                    </Box>

                    {/* User Section */}
                    <Box sx={{flexGrow: 0, ml: 2, display: 'flex', alignItems: 'center'}}>

                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{
                                p: 0.5,
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <Avatar
                                alt="Trần Xuân Bằng"
                                src="https://i.pravatar.cc/40?u=tranxuanbang" // Placeholder avatar
                                sx={{width: 36, height: 36, mr: 1}}
                            />
                            <Box
                                sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'column', alignItems: 'flex-start', mr: 0.5, textAlign: 'left'}}>
                                <Typography variant="body2" sx={{color: '#202124', fontWeight: 500, lineHeight: 1.2}}>
                                    Trần Xuân Bảng
                                </Typography>
                                <Typography variant="caption" sx={{color: '#5f6368', lineHeight: 1.2}}>
                                    Giáo viên
                                </Typography>
                            </Box>
                            <ArrowDropDownIcon sx={{color: '#5f6368'}}/>
                        </IconButton>

                        <Menu
                            sx={{mt: '55px'}} // Adjust margin-top from anchor
                            id="menu-appbar-user"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}

                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{fontSize: '0.9rem', padding: '8px 16px'}}>
                                    <Typography textAlign="left">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}
