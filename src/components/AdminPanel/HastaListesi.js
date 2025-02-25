import React, { useContext } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { HastaContext } from '../../context/HastaContext';

const HastaListesi = () => {
  const navigate = useNavigate();
  const { hastalar } = useContext(HastaContext);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, color: '#2c3e50', fontWeight: 500 }}>
        Hasta Listesi
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        backgroundColor: '#f8f9fa',
        p: 3,
        borderRadius: 2
      }}>
        <TextField
          label="Hasta Ara"
          variant="outlined"
          size="small"
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Durum</InputLabel>
          <Select
            label="Durum"
            defaultValue="Hepsi"
          >
            <MenuItem value="Hepsi">Hepsi</MenuItem>
            <MenuItem value="riskli">Riskli</MenuItem>
            <MenuItem value="tedavi">Tedavi</MenuItem>
            <MenuItem value="saglikli">Sağlıklı</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Ad Soyad</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Yaş</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Kalp Ritmi</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Durum</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hastalar.map((hasta) => (
              <TableRow 
                key={hasta.id}
                sx={{ 
                  '&:hover': { backgroundColor: '#f8f9fa' },
                  transition: 'background-color 0.2s'
                }}
              >
                <TableCell>{hasta.ad} {hasta.soyad}</TableCell>
                <TableCell>{hasta.yas}</TableCell>
                <TableCell>{hasta.kalpRitmi}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: 
                        hasta.saglikDurumu === 'riskli' ? '#fee2e2' :
                        hasta.saglikDurumu === 'tedavi' ? '#fef3c7' : 
                        '#dcfce7',
                      color: 
                        hasta.saglikDurumu === 'riskli' ? '#dc2626' :
                        hasta.saglikDurumu === 'tedavi' ? '#d97706' : 
                        '#15803d',
                      py: 0.5,
                      px: 2,
                      borderRadius: 1,
                      display: 'inline-block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }}
                  >
                    {hasta.saglikDurumu}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => navigate(`/admin/hasta/${hasta.id}`)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <Visibility sx={{ color: '#64748b' }} />
                  </IconButton>
                  <IconButton 
                    onClick={() => navigate(`/admin/hasta/duzenle/${hasta.id}`)}
                    size="small"
                  >
                    <Edit sx={{ color: '#64748b' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HastaListesi; 