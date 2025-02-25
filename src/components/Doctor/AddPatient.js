import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';

const AddPatient = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: '',
    tcNo: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    blockagePercentage: 0,
    stentType: '',
    stentLocation: '',
    nextAppointment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemleri
    navigate('/doctor/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setPatientData(prevState => ({
      ...prevState,
      blockagePercentage: newValue
    }));
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Yeni Hasta Ekle
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  name="name"
                  value={patientData.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="T.C. Kimlik No"
                  name="tcNo"
                  value={patientData.tcNo}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Doğum Tarihi"
                  name="birthDate"
                  type="date"
                  value={patientData.birthDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Cinsiyet</InputLabel>
                  <Select
                    name="gender"
                    value={patientData.gender}
                    onChange={handleChange}
                    label="Cinsiyet"
                  >
                    <MenuItem value="male">Erkek</MenuItem>
                    <MenuItem value="female">Kadın</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  name="phone"
                  value={patientData.phone}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  name="email"
                  type="email"
                  value={patientData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adres"
                  name="address"
                  multiline
                  rows={2}
                  value={patientData.address}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Tıkanıklık Yüzdesi: {patientData.blockagePercentage}%
                </Typography>
                <Slider
                  value={patientData.blockagePercentage}
                  onChange={handleSliderChange}
                  aria-labelledby="blockage-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 25, label: '25%' },
                    { value: 50, label: '50%' },
                    { value: 75, label: '75%' },
                    { value: 100, label: '100%' }
                  ]}
                  sx={{
                    color: (theme) => {
                      if (patientData.blockagePercentage >= 70) return theme.palette.error.main;
                      if (patientData.blockagePercentage >= 50) return theme.palette.warning.main;
                      return theme.palette.success.main;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Stent Tipi</InputLabel>
                  <Select
                    name="stentType"
                    value={patientData.stentType}
                    onChange={handleChange}
                    label="Stent Tipi"
                  >
                    <MenuItem value="ilacsiz">İlaçsız Stent</MenuItem>
                    <MenuItem value="ilacli">İlaç Kaplı Stent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stent Lokasyonu"
                  name="stentLocation"
                  value={patientData.stentLocation}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sonraki Randevu"
                  name="nextAppointment"
                  type="date"
                  value={patientData.nextAppointment}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#2c3e50' }}
              >
                Hasta Ekle
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddPatient; 