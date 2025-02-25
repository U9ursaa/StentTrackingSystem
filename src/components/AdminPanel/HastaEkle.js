import React, { useState, useContext } from 'react';
import { 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Autocomplete,
  Chip,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HastaContext } from '../../context/HastaContext';
import { kalphastaliklariveRiskFaktorleri } from '../../data/mockData';

const HastaEkle = () => {
  const { hastaEkle } = useContext(HastaContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hastaData, setHastaData] = useState({
    ad: '',
    soyad: '',
    yas: '',
    riskFaktorleri: [],
    hastaGecmisi: '',
    kalpRitmi: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!hastaData.ad || !hastaData.soyad || !hastaData.yas || !hastaData.kalpRitmi) {
      alert("Lütfen zorunlu alanları doldurun!");
      return;
    }

    const yas = parseInt(hastaData.yas);
    const kalpRitmi = parseInt(hastaData.kalpRitmi);
    
    let saglikDurumu = "saglikli";
    const normalKalpRitmi = 120;
    if (kalpRitmi < normalKalpRitmi * 0.8) {
      saglikDurumu = "riskli";
    } else if (kalpRitmi < normalKalpRitmi * 0.9) {
      saglikDurumu = "tedavi";
    }

    const yeniHasta = {
      ...hastaData,
      yas,
      kalpRitmi,
      saglikDurumu,
      id: Date.now()
    };

    // Hastayı ekle
    hastaEkle(yeniHasta);
    
    // Başarı mesajını göster
    setOpenSnackbar(true);

    // 1.5 saniye sonra hasta detay sayfasına yönlendir
    setTimeout(() => {
      navigate(`/admin/hasta/${yeniHasta.id}`);
    }, 1500);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, position: 'relative', minHeight: '600px' }}>
            <Typography variant="h6" gutterBottom>Hasta Bilgileri</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Adı"
                margin="normal"
                value={hastaData.ad}
                onChange={(e) => setHastaData({...hastaData, ad: e.target.value})}
              />
              <TextField
                fullWidth
                label="Soyadı"
                margin="normal"
                value={hastaData.soyad}
                onChange={(e) => setHastaData({...hastaData, soyad: e.target.value})}
              />
              <TextField
                fullWidth
                label="Yaş"
                type="number"
                margin="normal"
                value={hastaData.yas}
                onChange={(e) => setHastaData({...hastaData, yas: e.target.value})}
              />
              <Autocomplete
                multiple
                options={kalphastaliklariveRiskFaktorleri}
                value={hastaData.riskFaktorleri}
                onChange={(event, newValue) => {
                  setHastaData({...hastaData, riskFaktorleri: newValue});
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Risk Faktörleri"
                    margin="normal"
                    helperText="Hastalık seçin veya yeni bir hastalık yazın"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
                freeSolo
                filterSelectedOptions
              />
              <TextField
                fullWidth
                label="Hasta Geçmişi"
                margin="normal"
                multiline
                rows={4}
                value={hastaData.hastaGecmisi}
                onChange={(e) => setHastaData({...hastaData, hastaGecmisi: e.target.value})}
              />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                mt: 2
              }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  size="medium"
                  sx={{ width: '200px' }}
                >
                  Hasta Ekle
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, minHeight: '600px' }}>
            <Typography variant="h6" gutterBottom>Kalp Durumu</Typography>
            <div style={{ 
              backgroundImage: 'url(/heart.png)',
              height: '300px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              marginBottom: '20px'
            }}>
            </div>
            <TextField
              fullWidth
              label="Kalp Ritmi"
              type="number"
              margin="normal"
              value={hastaData.kalpRitmi}
              onChange={(e) => setHastaData({...hastaData, kalpRitmi: e.target.value})}
              helperText="Normal kalp ritmi: 120"
            />
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Hasta başarıyla eklendi! Yönlendiriliyorsunuz...
        </Alert>
      </Snackbar>
    </>
  );
};

export default HastaEkle; 