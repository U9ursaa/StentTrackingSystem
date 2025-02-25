import React, { useContext } from 'react';
import { 
  Paper, 
  Grid, 
  Typography, 
  Button,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { HastaContext } from '../../context/HastaContext';
import { Line } from 'react-chartjs-2';

const HastaDetay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hastalar } = useContext(HastaContext);
  const hasta = hastalar.find(h => h.id === parseInt(id));

  if (!hasta) return <Typography>Hasta bulunamadı</Typography>;

  const kalpRitmiData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [{
      label: 'Kalp Ritmi Değişimi',
      data: [hasta.kalpRitmi - 5, hasta.kalpRitmi + 2, hasta.kalpRitmi - 3, 
             hasta.kalpRitmi + 4, hasta.kalpRitmi - 1, hasta.kalpRitmi],
      borderColor: hasta.saglikDurumu === 'riskli' ? '#ff0000' : 
                  hasta.saglikDurumu === 'tedavi' ? '#f39c12' : 
                  '#27ae60',
      backgroundColor: hasta.saglikDurumu === 'riskli' ? 'rgba(255, 0, 0, 0.1)' : 
                      hasta.saglikDurumu === 'tedavi' ? 'rgba(243, 156, 18, 0.15)' : 
                      'rgba(39, 174, 96, 0.1)',
      tension: 0.1,
      fill: true
    }]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        onClick={() => navigate('/admin/hastalar')}
        variant="outlined"
        size="small"
        sx={{ mb: 4 }}
      >
        GERİ DÖN
      </Button>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Sol Taraf - Hasta Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666',
                fontSize: '1.2rem',
                mb: 3
              }}
            >
              Hasta Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Ad Soyad</Typography>
                <Typography>{`${hasta.ad} ${hasta.soyad}`}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Yaş</Typography>
                <Typography>{hasta.yas}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Risk Faktörleri</Typography>
                <Typography>{hasta.riskFaktorleri.join(', ')}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Hasta Geçmişi</Typography>
                <Typography>{hasta.hastaGecmisi}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Sağ Taraf - Durum ve Kalp Resmi */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              border: '1px solid #eee',
              borderRadius: '8px'
            }}>
              {/* Üst Kısım - Durum */}
              <Box sx={{ 
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: 'none'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: hasta.saglikDurumu === 'riskli' ? '#ff0000' : 
                           hasta.saglikDurumu === 'tedavi' ? '#f39c12' : 
                           '#27ae60',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    textShadow: hasta.saglikDurumu === 'tedavi' ? '0px 0px 8px rgba(243, 156, 18, 0.3)' : 'none'
                  }}
                >
                  {hasta.saglikDurumu.toUpperCase()}
                </Typography>
              </Box>

              {/* Alt Kısım - Kalp Resmi */}
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
              }}>
                <Box sx={{ 
                  width: '100%',
                  height: '400px',
                  backgroundImage: 'url(/images/HumanHeart.jpg)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: hasta.saglikDurumu === 'riskli' ? 
                          'hue-rotate(330deg) saturate(2) brightness(1.1) contrast(1.2)' : 
                          hasta.saglikDurumu === 'tedavi' ? 
                          'hue-rotate(45deg) saturate(1.6) brightness(1.15) sepia(0.3)' : 
                          'hue-rotate(120deg) saturate(1.3) brightness(1.05)'
                }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            fontSize: '1.2rem',
            mb: 3
          }}
        >
          Kalp Ritmi Grafiği
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line 
            data={kalpRitmiData} 
            options={{ 
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  suggestedMin: Math.min(...kalpRitmiData.datasets[0].data) - 10,
                  suggestedMax: Math.max(...kalpRitmiData.datasets[0].data) + 10
                }
              }
            }} 
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HastaDetay; 