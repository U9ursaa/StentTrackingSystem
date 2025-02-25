import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  Timeline as TimelineIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Medication as MedicationIconMUI,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';
import PatientHeader from './PatientHeader';

const PatientDashboard = () => {
  // Mock data - gerçek uygulamada API'den gelecek
  const doctorInfo = {
    name: "Dr. Mehmet Öz",
    title: "Kardiyoloji Uzmanı",
    hospital: "Merkez Hastanesi",
    phone: "0555-123-4567",
    email: "dr.mehmet.oz@hospital.com",
    image: "https://placehold.co/400x400" // Doktor fotoğrafı için placeholder
  };

  const patientInfo = {
    lastProcedure: {
      date: "15.02.2024",
      type: "LAD'ye ilaç kaplı stent implantasyonu",
      details: "İşlem başarılı geçti. Hasta stabil durumda."
    },
    nextAppointment: {
      date: "15.03.2024",
      type: "Kontrol Randevusu"
    },
    medications: [
      {
        name: "Plavix",
        frequency: "1x1",
        timing: "ac",
        specialInstructions: null,
        warnings: null
      },
      {
        name: "Aspirin",
        frequency: "1x1",
        timing: "ac",
        specialInstructions: null,
        warnings: null
      },
      {
        name: "Atorvastatin",
        frequency: "1x1",
        timing: "ac",
        specialInstructions: null,
        warnings: null
      }
    ],
    stentInfo: {
      location: "Sol ön inen arter (LAD)",
      type: "İlaç kaplı stent",
      blockagePercentage: 80
    }
  };

  const renderMedications = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Kullanılan İlaçlar
      </Typography>
      <List>
        {patientInfo.medications.map((med, index) => (
          <Paper 
            key={index} 
            sx={{ 
              mb: 2, 
              p: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MedicationIconMUI color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                {med.name}
              </Typography>
            </Box>

            <Box sx={{ pl: 4 }}>
              {/* Doz ve Kullanım */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">
                  <AccessTimeIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'middle' }} />
                  <strong>Ne Zaman:</strong> Günde {med.frequency.split('x')[0]} kez
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  ({med.frequency.split('x')[0]} defa, her seferinde {med.frequency.split('x')[1]} tablet)
                </Typography>
              </Box>

              {/* Yemek Durumu */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">
                  <RestaurantIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'middle' }} />
                  <strong>Nasıl:</strong> {
                    med.timing === 'ac' ? 'Aç karnına alınmalı' :
                    med.timing === 'pc' ? 'Tok karnına alınmalı' :
                    med.timing === 'morning' ? 'Sabah alınmalı' :
                    med.timing === 'evening' ? 'Akşam alınmalı' : 'Belirtilen saatlerde alınmalı'
                  }
                </Typography>
              </Box>

              {/* Özel Talimatlar */}
              {med.specialInstructions && (
                <Box sx={{ 
                  mt: 1,
                  p: 1.5,
                  bgcolor: 'info.light',
                  borderRadius: 1,
                  color: 'info.contrastText'
                }}>
                  <Typography variant="body2">
                    <strong>Önemli Not:</strong> {med.specialInstructions}
                  </Typography>
                </Box>
              )}

              {/* Uyarılar */}
              {med.warnings && (
                <Box sx={{ 
                  mt: 1,
                  p: 1.5,
                  bgcolor: 'warning.light',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <WarningIcon color="warning" />
                  <Typography variant="body2" color="warning.dark">
                    <strong>Uyarı:</strong> {
                      med.name === 'Aspirin' ? 'Mide hassasiyeti olan hastalar dikkat etmeli' :
                      med.name === 'Plavix' ? 'Kanama riski artabilir' :
                      'Yan etkiler görülürse doktorunuza danışın'
                    }
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <PatientHeader />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Sol Taraf - Doktor Bilgileri */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={doctorInfo.image}
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {doctorInfo.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {doctorInfo.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {doctorInfo.hospital}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={doctorInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={doctorInfo.email} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Sağ Taraf - Hasta Bilgileri */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Son İşlem Bilgisi */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Son İşlem
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <HospitalIcon sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        {patientInfo.lastProcedure.type}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Tarih: {patientInfo.lastProcedure.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {patientInfo.lastProcedure.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Sonraki Randevu */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Sonraki Randevu
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ mr: 1 }} />
                      <Typography>
                        {patientInfo.nextAppointment.date}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {patientInfo.nextAppointment.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Stent Bilgisi */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Stent Bilgisi
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TimelineIcon sx={{ mr: 1 }} />
                      <Typography>
                        {patientInfo.stentInfo.location}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`Tıkanıklık: %${patientInfo.stentInfo.blockagePercentage}`}
                      color={patientInfo.stentInfo.blockagePercentage >= 70 ? "error" : "warning"}
                      sx={{ mr: 1 }}
                    />
                    <Chip label={patientInfo.stentInfo.type} />
                  </CardContent>
                </Card>
              </Grid>

              {/* İlaçlar */}
              <Grid item xs={12}>
                {renderMedications()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PatientDashboard; 