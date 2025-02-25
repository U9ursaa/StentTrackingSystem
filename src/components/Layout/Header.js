import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  // Ana sayfa dışındaki sayfalarda geri dön ve ana sayfa butonlarını göster
  const showNavButtons = location.pathname !== '/doctor/dashboard';

  const handleLogout = () => {
    // Burada gerekirse logout işlemleri yapılabilir
    // Örneğin context'ten logout fonksiyonu çağırılabilir
    navigate('/'); // Login sayfasına yönlendir
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
        
        <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{ ml: 2 }}
          title="Çıkış Yap"
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 