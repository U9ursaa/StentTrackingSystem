import React, { useState, useContext } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [userType, setUserType] = useState('doctor');
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
    userType: 'doctor'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        userType: userType,
        identifier: credentials.identifier,
        password: credentials.password
      });
      
      // Başarılı giriş sonrası yönlendirme
      if (userType === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: '#f5f5f5' 
    }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          StentTrackingSystem
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Kullanıcı Tipi</InputLabel>
            <Select
              value={userType}
              label="Kullanıcı Tipi"
              onChange={(e) => {
                setUserType(e.target.value);
                setCredentials({ identifier: '', password: '', userType: e.target.value });
                setError('');
              }}
            >
              <MenuItem value="doctor">Doktor</MenuItem>
              <MenuItem value="patient">Hasta</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={userType === 'doctor' ? "E-posta" : "T.C. Kimlik No"}
            type={userType === 'doctor' ? "email" : "text"}
            value={credentials.identifier}
            onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Şifre"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button 
            fullWidth 
            variant="contained" 
            type="submit"
            sx={{ bgcolor: '#2c3e50' }}
          >
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 