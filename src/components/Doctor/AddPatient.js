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
    id: Date.now(),
    name: '',
    tcNo: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    blockagePercentage: 0,
    stentType: '',
    location: '',
    lastProcedureDate: new Date().toLocaleDateString('tr-TR'),
    nextAppointment: '',
    status: 'stable',
    medications: []
  });

  // Hazır ilaç listesi
  const availableMedications = [
    {
      id: 1,
      name: 'Aspirin',
      commonDosages: ['81mg', '100mg', '300mg'],
      commonFrequencies: ['Günde 1 kez', 'Günde 2 kez'],
      defaultInstructions: 'Yemeklerden sonra alınmalıdır.'
    },
    {
      id: 2,
      name: 'Plavix (Clopidogrel)',
      commonDosages: ['75mg', '150mg', '300mg'],
      commonFrequencies: ['Günde 1 kez'],
      defaultInstructions: 'Yemeklerden bağımsız alınabilir.'
    },
    {
      id: 3,
      name: 'Brilinta (Ticagrelor)',
      commonDosages: ['60mg', '90mg'],
      commonFrequencies: ['Günde 2 kez'],
      defaultInstructions: 'Yemeklerden bağımsız alınabilir.'
    },
    {
      id: 4,
      name: 'Coumadin (Warfarin)',
      commonDosages: ['2.5mg', '5mg', '7.5mg', '10mg'],
      commonFrequencies: ['Günde 1 kez'],
      defaultInstructions: 'INR takibi gereklidir. Yeşil yapraklı sebzelerle etkileşime dikkat.'
    },
    {
      id: 5,
      name: 'Eliquis (Apixaban)',
      commonDosages: ['2.5mg', '5mg'],
      commonFrequencies: ['Günde 2 kez'],
      defaultInstructions: 'Yemeklerden bağımsız alınabilir.'
    },
    {
      id: 6,
      name: 'Xarelto (Rivaroxaban)',
      commonDosages: ['10mg', '15mg', '20mg'],
      commonFrequencies: ['Günde 1 kez'],
      defaultInstructions: 'Akşam yemeği ile birlikte alınmalıdır.'
    },
    {
      id: 7,
      name: 'Metoprolol',
      commonDosages: ['25mg', '50mg', '100mg'],
      commonFrequencies: ['Günde 1 kez', 'Günde 2 kez'],
      defaultInstructions: 'Yemeklerden sonra alınmalıdır.'
    },
    {
      id: 8,
      name: 'Atorvastatin',
      commonDosages: ['10mg', '20mg', '40mg', '80mg'],
      commonFrequencies: ['Günde 1 kez'],
      defaultInstructions: 'Akşam yemeğinden sonra alınmalıdır.'
    }
  ];

  const [medicationForm, setMedicationForm] = useState({
    selectedMedication: '',
    dosage: '',
    frequency: '',
    timing: '',
    specialInstructions: ''
  });

  // Stent tipleri
  const stentTypes = [
    { value: 'İlaç Kaplı Stent (DES)', label: 'İlaç Kaplı Stent (DES)' },
    { value: 'Biyoçözünür Stent (BES)', label: 'Biyoçözünür Stent (BES)' },
    { value: 'İlaçsız Metal Stent (BMS)', label: 'İlaçsız Metal Stent (BMS)' },
    { value: 'Polimer Bazlı İlaç Kaplı Stent', label: 'Polimer Bazlı İlaç Kaplı Stent' },
    { value: 'Polimer İçermeyen İlaç Kaplı Stent', label: 'Polimer İçermeyen İlaç Kaplı Stent' }
  ];

  // Stent lokasyonları
  const stentLocations = [
    { value: 'LAD', label: 'Sol Ön İnen Arter (LAD)' },
    { value: 'LCX', label: 'Sol Sirkumfleks Arter (LCX)' },
    { value: 'RCA', label: 'Sağ Koroner Arter (RCA)' },
    { value: 'LMCA', label: 'Sol Ana Koroner Arter (LMCA)' },
    { value: 'Cx', label: 'Sirkumfleks Arter (Cx)' },
    { value: 'Diagonal', label: 'Diagonal Dal' },
    { value: 'OM', label: 'Obtus Marginalis' },
    { value: 'PDA', label: 'Posterior İnen Arter (PDA)' },
    { value: 'PLV', label: 'Posterolateral Dal (PLV)' }
  ];

  const medicationTimings = [
    { value: 'ac', label: 'Aç Karnına' },
    { value: 'pc', label: 'Tok Karnına' },
    { value: 'morning', label: 'Sabah' },
    { value: 'noon', label: 'Öğlen' },
    { value: 'evening', label: 'Akşam' },
    { value: 'night', label: 'Gece Yatmadan' }
  ];

  // Yaş hesaplama fonksiyonu
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mevcut hastaları al
    const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    // Yeni hastayı ekle
    const newPatient = {
      ...patientData,
      id: Date.now() // Benzersiz ID
    };
    
    // Hastaları güncelle
    const updatedPatients = [...existingPatients, newPatient];
    
    // LocalStorage'a kaydet
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    
    // Dashboard'a dön
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

  const handleMedicationSelect = (event) => {
    const selectedMed = availableMedications.find(med => med.id === event.target.value);
    if (selectedMed) {
      setMedicationForm({
        selectedMedication: selectedMed.id,
        dosage: selectedMed.commonDosages[0],
        frequency: selectedMed.commonFrequencies[0],
        timing: '',
        specialInstructions: selectedMed.defaultInstructions
      });
    }
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
                  required
                  fullWidth
                  label="Ad Soyad"
                  name="name"
                  value={patientData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="T.C. Kimlik No"
                  name="tcNo"
                  value={patientData.tcNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Doğum Tarihi"
                  name="birthDate"
                  type="date"
                  value={patientData.birthDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                <FormControl fullWidth>
                  <InputLabel>Stent Tipi</InputLabel>
                  <Select
                    name="stentType"
                    value={patientData.stentType}
                    onChange={handleChange}
                    label="Stent Tipi"
                  >
                    {stentTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Stent Lokasyonu</InputLabel>
                  <Select
                    name="location"
                    value={patientData.location}
                    onChange={handleChange}
                    label="Stent Lokasyonu"
                  >
                    {stentLocations.map((loc) => (
                      <MenuItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  İlaç Bilgileri
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>İlaç Seçimi</InputLabel>
                  <Select
                    value={medicationForm.selectedMedication}
                    onChange={handleMedicationSelect}
                    label="İlaç Seçimi"
                  >
                    {availableMedications.map((med) => (
                      <MenuItem key={med.id} value={med.id}>
                        {med.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Doz</InputLabel>
                  <Select
                    value={medicationForm.dosage}
                    onChange={(e) => setMedicationForm(prev => ({...prev, dosage: e.target.value}))}
                    label="Doz"
                  >
                    {availableMedications
                      .find(med => med.id === medicationForm.selectedMedication)
                      ?.commonDosages.map((dosage) => (
                        <MenuItem key={dosage} value={dosage}>
                          {dosage}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Kullanım Sıklığı</InputLabel>
                  <Select
                    value={medicationForm.frequency}
                    onChange={(e) => setMedicationForm(prev => ({...prev, frequency: e.target.value}))}
                    label="Kullanım Sıklığı"
                  >
                    {availableMedications
                      .find(med => med.id === medicationForm.selectedMedication)
                      ?.commonFrequencies.map((freq) => (
                        <MenuItem key={freq} value={freq}>
                          {freq}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Kullanım Zamanı</InputLabel>
                  <Select
                    value={medicationForm.timing}
                    onChange={(e) => setMedicationForm(prev => ({...prev, timing: e.target.value}))}
                    label="Kullanım Zamanı"
                  >
                    {medicationTimings.map((timing) => (
                      <MenuItem key={timing.value} value={timing.value}>
                        {timing.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Özel Talimatlar"
                  value={medicationForm.specialInstructions}
                  onChange={(e) => setMedicationForm(prev => ({...prev, specialInstructions: e.target.value}))}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setPatientData(prev => ({
                      ...prev,
                      medications: [...prev.medications, medicationForm]
                    }));
                    setMedicationForm({
                      selectedMedication: '',
                      dosage: '',
                      frequency: '',
                      timing: '',
                      specialInstructions: ''
                    });
                  }}
                  sx={{ mt: 1 }}
                >
                  İlaç Ekle
                </Button>
              </Grid>

              {patientData.medications.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Eklenen İlaçlar
                  </Typography>
                  {patientData.medications.map((med, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 1 }}>
                      <Typography variant="subtitle1">{med.name}</Typography>
                      <Typography variant="body2">
                        Doz: {med.dosage} | Sıklık: {med.frequency} | 
                        Zaman: {medicationTimings.find(t => t.value === med.timing)?.label}
                      </Typography>
                      {med.specialInstructions && (
                        <Typography variant="body2" color="textSecondary">
                          Özel Talimatlar: {med.specialInstructions}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Grid>
              )}
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