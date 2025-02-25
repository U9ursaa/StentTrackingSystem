import React, { useState, useContext } from 'react';
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
  Chip,
  Stack,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PatientContext } from '../../context/PatientContext';
import Header from '../Layout/Header';

const AddPatient = () => {
  const navigate = useNavigate();
  const { addPatient } = useContext(PatientContext);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState({
    tcNo: '',
    name: '',
    birthDate: null,
    nationality: 'TC',
    city: '',
    address: '',
    phone: '',
    email: '',
    blockagePercentage: 0,
    procedureDate: null,
    stentDetails: '',
    procedureType: '',
    medications: []
  });

  const [selectedMed, setSelectedMed] = useState('');

  const medicationOptions = [
    'Plavix',
    'Aspirin',
    'Atorvastatin',
    'Metoprolol',
    'Ramipril',
    'Diltiazem',
    'Rosuvastatin'
  ];

  const stentTypes = [
    'İlaç kaplı stent',
    'Metal stent',
    'Biyoemilebilir stent'
  ];

  const stentLocations = [
    'Sol ana koroner arter',
    'Sağ koroner arter',
    'Sol ön inen arter',
    'Sirkumfleks arter',
    'Diagonal arter',
    'RCA proksimal',
    'RCA distal'
  ];

  const cities = [
    'Adana', 'Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya', 
    // ... diğer şehirler
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationAdd = () => {
    if (selectedMed && !patient.medications.includes(selectedMed)) {
      setPatient(prev => ({
        ...prev,
        medications: [...prev.medications, selectedMed]
      }));
      setSelectedMed('');
    }
  };

  const handleMedicationDelete = (medToDelete) => {
    setPatient(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med !== medToDelete)
    }));
  };

  // Yaş hesaplama fonksiyonu
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Doğum tarihi değiştiğinde
  const handleBirthDateChange = (newValue) => {
    setPatient(prev => ({
      ...prev,
      birthDate: newValue,
      age: calculateAge(newValue) // Yaşı state'de tutuyoruz ama göstermiyoruz
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Form validasyonu
      if (!patient.name || !patient.procedureDate || 
          !patient.stentDetails || !patient.procedureType) {
        setError('Lütfen tüm zorunlu alanları doldurun');
        return;
      }

      // Hasta verilerini hazırla
      const newPatient = {
        ...patient,
        procedureDate: patient.procedureDate.toISOString(),
        lastProcedureDate: patient.procedureDate.toISOString(),
      };

      // Context üzerinden hasta ekle
      addPatient(newPatient);
      
      // Başarılı ekleme sonrası yönlendirme
      navigate('/doctor/dashboard');
    } catch (err) {
      setError('Hasta eklenirken bir hata oluştu: ' + err.message);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, color: '#2c3e50' }}>
            Yeni Hasta Ekle
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="T.C. Kimlik No"
                  name="tcNo"
                  value={patient.tcNo}
                  onChange={handleChange}
                  required
                  inputProps={{ 
                    maxLength: 11,
                    pattern: "[0-9]*"
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Doğum Tarihi"
                  name="birthDate"
                  type="date"
                  value={patient.birthDate ? patient.birthDate.toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Uyruk"
                  name="nationality"
                  value={patient.nationality}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Şehir</InputLabel>
                  <Select
                    name="city"
                    value={patient.city}
                    label="Şehir"
                    onChange={handleChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Açık Adres"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefon Numarası"
                  name="phone"
                  value={patient.phone}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 11 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  name="email"
                  type="email"
                  value={patient.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom>
                  Stent Tıkanıklık Yüzdesi: {patient.blockagePercentage}%
                </Typography>
                <Slider
                  value={patient.blockagePercentage}
                  onChange={(e, newValue) => setPatient(prev => ({...prev, blockagePercentage: newValue}))}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Stent Tipi</InputLabel>
                  <Select
                    name="procedureType"
                    value={patient.procedureType}
                    label="Stent Tipi"
                    onChange={handleChange}
                  >
                    {stentTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Stent Lokasyonu</InputLabel>
                  <Select
                    name="stentDetails"
                    value={patient.stentDetails}
                    label="Stent Lokasyonu"
                    onChange={handleChange}
                  >
                    {stentLocations.map((location) => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="İşlem Tarihi"
                  name="procedureDate"
                  type="date"
                  value={patient.procedureDate ? patient.procedureDate.toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel>İlaçlar</InputLabel>
                    <Select
                      value={selectedMed}
                      label="İlaçlar"
                      onChange={(e) => setSelectedMed(e.target.value)}
                    >
                      {medicationOptions.map((med) => (
                        <MenuItem key={med} value={med}>{med}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button 
                    variant="outlined" 
                    onClick={handleMedicationAdd}
                    disabled={!selectedMed}
                  >
                    İlaç Ekle
                  </Button>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {patient.medications.map((med) => (
                    <Chip
                      key={med}
                      label={med}
                      onDelete={() => handleMedicationDelete(med)}
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/doctor/dashboard')}
                  >
                    İptal
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#2c3e50',
                      '&:hover': { backgroundColor: '#34495e' }
                    }}
                  >
                    Hasta Ekle
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddPatient; 