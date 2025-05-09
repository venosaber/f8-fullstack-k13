import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// icons
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const settings = ['Thông tin cá nhân', 'Đăng xuất'];

const CustomLogoIcon = () => (
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

function CustomAppBar({className}: { className?: string }) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)'
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>

          {/* Logo Section */}
          <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            <CustomLogoIcon/>
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

          <Box sx={{position: 'relative', left: '130px'}}>
            <Typography sx={{fontWeight: 600, fontSize: '1.2rem'}}>
              {className}
            </Typography>
          </Box>

          {/* Spacer to push subsequent items to the right */}
          <Box sx={{flexGrow: 1}}/>

          {/* Buttons: "Tạo lớp" and "Trang chủ" */}
          <Box sx={{display: 'flex', alignItems: 'center', mr: 1 /* Margin before user section */}}>
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
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 0.5, textAlign: 'left'}}>
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
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;