import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PatientContext } from '../../context/PatientContext';
import Header from '../Layout/Header';

const DoctorDashboard = () => {
  const { patients } = useContext(PatientContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Mehmet Öz",
    title: "Kardiyoloji Uzmanı",
    email: "dr.mehmet.oz@hastane.com",
    phone: "0555-123-4567",
    hospital: "Merkez Hastanesi",
    department: "Kardiyoloji Bölümü",
    profileImage: null // Varsayılan olarak null
  });

  const mockPatients = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      tcNo: "12345678901",
      age: "65",
      blockagePercentage: 80,
      lastProcedureDate: "15.02.2024",
      nextAppointment: "15.03.2024",
      status: "stable",
      stentType: "İlaç Kaplı Stent (DES)",
      location: "LAD"
    },
    {
      id: 2,
      name: "Ayşe Demir",
      tcNo: "12345678902",
      age: "58",
      blockagePercentage: 70,
      lastProcedureDate: "02.10.2024",
      nextAppointment: "03.10.2024",
      status: "follow-up",
      stentType: "Biyoçözünür Stent (BES)",
      location: "RCA"
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      tcNo: "12345678903",
      age: "72",
      blockagePercentage: 85,
      lastProcedureDate: "02.05.2024",
      nextAppointment: "03.05.2024",
      status: "critical",
      stentType: "İlaçsız",
      location: "Cx"
    },
    {
      id: 4,
      name: "Fatma Şahin",
      tcNo: "12345678904",
      age: "61",
      blockagePercentage: 65,
      lastProcedureDate: "20.02.2024",
      nextAppointment: "20.03.2024",
      status: "stable",
      stentType: "İlaç Kaplı",
      location: "LAD"
    },
    {
      id: 5,
      name: "Ali Öztürk",
      tcNo: "12345678905",
      age: "69",
      blockagePercentage: 75,
      lastProcedureDate: "02.12.2024",
      nextAppointment: "03.12.2024",
      status: "follow-up",
      stentType: "İlaçsız",
      location: "RCA"
    }
  ];

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    handleClose();
    setOpenProfileDialog(true);
  };

  const handleProfileUpdate = () => {
    // Profil güncelleme işlemleri burada yapılacak
    setOpenProfileDialog(false);
  };

  const getBlockageColor = (percentage) => {
    if (percentage >= 70) return 'error';
    if (percentage >= 40) return 'warning';
    return 'success';
  };

  const getStatusIcon = (patient) => {
    const lastAppointment = patient.appointmentHistory[0];
    if (lastAppointment.status === 'completed') {
      return <CheckCircleIcon color="success" />;
    } else if (lastAppointment.status === 'missed') {
      return <WarningIcon color="error" />;
    } else {
      return <Chip 
        label="Bekliyor" 
        size="small" 
        color="primary" 
        sx={{ fontSize: '0.75rem' }}
      />;
    }
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'success';
      case 'follow-up':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'stable':
        return 'Stabil';
      case 'follow-up':
        return 'Takipte';
      case 'critical':
        return 'Kritik';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleAddPatient = () => {
    navigate('/doctor/add-patient');
  };

  const handlePatientClick = (patient) => {
    navigate(`/doctor/patient/${patient.tcNo}`, { 
      state: { 
        patient: {
          id: patient.id,
          name: patient.name,
          tcNo: patient.tcNo,
          age: patient.age,
          blockagePercentage: patient.blockagePercentage,
          lastProcedureDate: patient.lastProcedureDate,
          nextAppointment: patient.nextAppointment,
          status: patient.status,
          stentType: patient.stentType,
          location: patient.location
        }
      }
    });
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPatient}
              sx={{ backgroundColor: '#2c3e50' }}
            >
              YENİ HASTA EKLE
            </Button>
          </Box>

          {/* Üst Bar */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            backgroundColor: '#2c3e50',
            p: 2,
            borderRadius: 2,
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={handleProfileClick}>
                {doctorProfile.profileImage ? (
                  <Avatar 
                    src={doctorProfile.profileImage} 
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <Avatar sx={{ width: 56, height: 56, bgcolor: '#34495e' }}>
                    <PersonIcon />
                  </Avatar>
                )}
              </IconButton>
              <Box>
                <Typography variant="h6">{doctorProfile.name}</Typography>
                <Typography variant="subtitle2">{doctorProfile.title}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Ana Tablo */}
          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Hasta Adı</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>T.C. No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Yaş</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Stent Tıkanıklık %</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Son İşlem Tarihi</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sonraki Randevu</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Stent Tipi</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Lokasyon</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    hover
                    onClick={() => handlePatientClick(patient)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.tcNo}</TableCell>
                    <TableCell>{calculateAge(patient.birthDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={`%${patient.blockagePercentage}`}
                        color={patient.blockagePercentage >= 70 ? "error" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{patient.lastProcedureDate}</TableCell>
                    <TableCell>{patient.nextAppointment}</TableCell>
                    <TableCell>{patient.stentType}</TableCell>
                    <TableCell>{patient.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(patient.status)}
                        color={getStatusColor(patient.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        sx={{ color: '#2c3e50' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Profil Menüsü */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEditProfile}>
              <EditIcon sx={{ mr: 1 }} /> Profili Düzenle
            </MenuItem>
          </Menu>

          {/* Profil Düzenleme Dialog */}
          <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)}>
            <DialogTitle>Profil Bilgilerini Düzenle</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ad Soyad"
                    value={doctorProfile.name}
                    onChange={(e) => setDoctorProfile({...doctorProfile, name: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Unvan"
                    value={doctorProfile.title}
                    onChange={(e) => setDoctorProfile({...doctorProfile, title: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    value={doctorProfile.email}
                    onChange={(e) => setDoctorProfile({...doctorProfile, email: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={doctorProfile.phone}
                    onChange={(e) => setDoctorProfile({...doctorProfile, phone: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hastane"
                    value={doctorProfile.hospital}
                    onChange={(e) => setDoctorProfile({...doctorProfile, hospital: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bölüm"
                    value={doctorProfile.department}
                    onChange={(e) => setDoctorProfile({...doctorProfile, department: e.target.value})}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenProfileDialog(false)}>İptal</Button>
              <Button onClick={handleProfileUpdate} variant="contained">
                Kaydet
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
};

export default DoctorDashboard; 