import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNavButtons = location.pathname !== '/doctor/dashboard';
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/doctor/profile');
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', mb: 2 }}>
      <Toolbar>
        {showNavButtons && (
          <>
            <IconButton
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate('/doctor/dashboard')}
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar 
            alt="Doctor" 
            src="/doctor-avatar.png" 
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div">
            Dr. Mehmet Öz
          </Typography>
          <Typography variant="subtitle2" sx={{ ml: 1, color: 'rgba(255,255,255,0.7)' }}>
            Kardiyoloji Uzmanı
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <NotificationsIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profil</MenuItem>
            <MenuItem onClick={handleClose}>Ayarlar</MenuItem>
            <MenuItem onClick={handleClose}>Bildirimler</MenuItem>
          </Menu>

          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Çıkış Yap
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 