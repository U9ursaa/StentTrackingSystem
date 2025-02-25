import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNavButtons = location.pathname !== '/doctor/dashboard';

  const handleLogout = () => {
    // Burada gerekirse logout işlemleri yapılabilir
    // Örneğin: localStorage.clear();
    navigate('/');
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {location.pathname.includes('add-patient') ? 'Yeni Hasta Ekle' :
           location.pathname.includes('patient/') ? 'Hasta Detayları' :
           'StentTrackingSystem'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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