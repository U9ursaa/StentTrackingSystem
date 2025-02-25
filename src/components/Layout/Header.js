import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNavButtons = location.pathname !== '/doctor/dashboard';

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
      </Toolbar>
    </AppBar>
  );
};

export default Header; 