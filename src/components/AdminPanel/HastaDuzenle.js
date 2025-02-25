import React, { useState, useContext, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { HastaContext } from '../../context/HastaContext';

const HastaDuzenle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hastalar, hastaGuncelle } = useContext(HastaContext);
  const [hastaData, setHastaData] = useState(null);
  const [mesaj, setMesaj] = useState('');

  useEffect(() => {
    const hasta = hastalar.find(h => h.id === parseInt(id));
    if (hasta) {
      setHastaData(hasta);
    }
  }, [id, hastalar]);

  if (!hastaData) return <Typography>Hasta bulunamadı</Typography>;

  const handleSubmit = (e) => {
    e.preventDefault();
    hastaGuncelle(hastaData);
    setMesaj('Hasta bilgileri güncellendi');
    setTimeout(() => navigate('/admin/hastalar'), 1500);
  };

  return (
    <Box>
      {mesaj && <Alert severity="success" sx={{ mb: 2 }}>{mesaj}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={() => navigate('/admin/hastalar')}>Geri Dön</Button>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Hasta Bilgilerini Düzenle</Typography>
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
              {/* Diğer alanlar */}
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Güncelle
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HastaDuzenle; 