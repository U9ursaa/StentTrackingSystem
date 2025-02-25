import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business,
  LocalHospital,
  MedicalServices,
  Event,
  Medication
} from '@mui/icons-material';
import Header from '../Layout/Header';

const DoctorProfile = () => {
  const doctorInfo = {
    name: 'Dr. Mehmet Öz',
    title: 'Kardiyoloji Uzmanı',
    hospital: 'Merkez Hastanesi',
    phone: '0555-123-4567',
    email: 'dr.mehmet.oz@hospital.com',
    education: [
      'Tıp Fakültesi - Ankara Üniversitesi (1990-1996)',
      'Kardiyoloji Uzmanlık - Hacettepe Üniversitesi (1996-2001)'
    ],
    experience: [
      'Merkez Hastanesi - Kardiyoloji Uzmanı (2010-Günümüz)',
      'Devlet Hastanesi - Kardiyoloji Uzmanı (2001-2010)'
    ],
    lastProcedures: [
      {
        date: '15.02.2024',
        procedure: 'LAD\'ye ilaç kaplı stent implantasyonu',
        patient: 'Ahmet Yılmaz',
        status: 'İşlem başarılı geçti. Hasta stabil durumda.'
      },
      {
        date: '10.01.2024',
        procedure: 'Anjiyografi',
        patient: 'Ayşe Demir',
        status: 'LAD\'de %70 darlık tespit edildi.'
      }
    ],
    upcomingAppointments: [
      {
        date: '15.03.2024',
        time: '14:30',
        type: 'Kontrol Muayenesi',
        patient: 'Ahmet Yılmaz'
      },
      {
        date: '20.03.2024',
        time: '10:00',
        type: 'Kontrol Muayenesi',
        patient: 'Fatma Şahin'
      }
    ],
    medications: [
      {
        name: 'Plavix 75mg (1x1)',
        description: 'Günde bir kez, sabah',
        type: 'Antiplatelet'
      },
      {
        name: 'Aspirin 100mg (1x1)',
        description: 'Günde bir kez, sabah',
        type: 'Antiplatelet'
      },
      {
        name: 'Atorvastatin 40mg (1x1)',
        description: 'Günde bir kez, akşam',
        type: 'Statin'
      }
    ]
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Sol Taraf - Doktor Bilgileri */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                  src="/path-to-doctor-image.jpg"
                />
                <Typography variant="h5" gutterBottom>
                  {doctorInfo.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {doctorInfo.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {doctorInfo.hospital}
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary={doctorInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary={doctorInfo.email} />
                </ListItem>
              </List>
            </Grid>

            {/* Sağ Taraf - Detaylı Bilgiler */}
            <Grid item xs={12} md={8}>
              {/* Son İşlemler */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <MedicalServices sx={{ mr: 1 }} />
                    Son İşlemler
                  </Typography>
                  <List>
                    {doctorInfo.lastProcedures.map((procedure, index) => (
                      <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocalHospital sx={{ mr: 1 }} color="primary" />
                          <Typography variant="subtitle1">
                            {procedure.procedure}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          Tarih: {procedure.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Hasta: {procedure.patient}
                        </Typography>
                        <Typography variant="body2">
                          {procedure.status}
                        </Typography>
                        {index < doctorInfo.lastProcedures.length - 1 && <Divider sx={{ my: 1, width: '100%' }} />}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Kullanılan İlaçlar */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Medication sx={{ mr: 1 }} />
                    Kullanılan İlaçlar
                  </Typography>
                  <Grid container spacing={2}>
                    {doctorInfo.medications.map((med, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {med.name}
                          </Typography>
                          <Chip 
                            label={med.type} 
                            size="small" 
                            color="primary" 
                            sx={{ mb: 1 }} 
                          />
                          <Typography variant="body2" color="textSecondary">
                            {med.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              {/* Yaklaşan Randevular */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Event sx={{ mr: 1 }} />
                    Yaklaşan Randevular
                  </Typography>
                  <List>
                    {doctorInfo.upcomingAppointments.map((appointment, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${appointment.date} - ${appointment.time}`}
                          secondary={`${appointment.type} - ${appointment.patient}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default DoctorProfile; 