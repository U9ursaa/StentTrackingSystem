import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import {
  Person,
  Phone,
  Email,
  Home,
  CalendarToday,
  LocalHospital,
  Favorite,
  Assignment
} from '@mui/icons-material';
import Header from '../Layout/Header';

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const patient = location.state?.patient;

  // Mock tıbbi geçmiş verileri
  const medicalHistory = [
    {
      date: "15.02.2024",
      procedure: "LAD'ye ilaç kaplı stent implantasyonu",
      doctor: "Dr. Mehmet Öz",
      notes: "İşlem başarılı geçti. Hasta stabil durumda."
    },
    {
      date: "10.01.2024",
      procedure: "Anjiyografi",
      doctor: "Dr. Mehmet Öz",
      notes: "LAD'de %80 darlık tespit edildi."
    },
    {
      date: "01.01.2024",
      procedure: "İlk Muayene",
      doctor: "Dr. Mehmet Öz",
      notes: "Göğüs ağrısı şikayeti ile başvurdu."
    }
  ];

  // Mock randevu verileri
  const appointments = [
    {
      date: "15.03.2024",
      time: "14:30",
      type: "Kontrol Muayenesi",
      doctor: "Dr. Mehmet Öz",
      status: "upcoming"
    },
    {
      date: "15.02.2024",
      time: "10:00",
      type: "Stent İşlemi",
      doctor: "Dr. Mehmet Öz",
      status: "completed"
    },
    {
      date: "10.01.2024",
      time: "11:30",
      type: "Anjiyografi",
      doctor: "Dr. Mehmet Öz",
      status: "completed"
    }
  ];

  // Mock bildirim verileri
  const notifications = [
    {
      date: "15.03.2024",
      title: "Randevu Hatırlatması",
      message: "Yarınki kontrol randevunuzu unutmayınız.",
      type: "reminder"
    },
    {
      date: "01.03.2024",
      title: "İlaç Hatırlatması",
      message: "Plavix ilacınızı düzenli kullanmayı unutmayınız.",
      type: "medication"
    },
    {
      date: "15.02.2024",
      title: "Test Sonuçları",
      message: "Kan testi sonuçlarınız sisteme yüklendi.",
      type: "result"
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendSMS = () => {
    console.log('SMS gönderiliyor...');
  };

  const handleSendEmail = () => {
    console.log('E-posta gönderiliyor...');
  };

  if (!patient) {
    return (
      <>
        <Header />
        <Box sx={{ p: 4 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" color="error">
              Hasta bulunamadı
            </Typography>
          </Paper>
        </Box>
      </>
    );
  }

  const renderPersonalInfo = () => (
    <Box>
      <List>
        <ListItem>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText 
            primary="Ad Soyad" 
            secondary={patient.name} 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText 
            primary="T.C. Kimlik No" 
            secondary={patient.tcNo} 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><CalendarToday /></ListItemIcon>
          <ListItemText 
            primary="Yaş" 
            secondary={patient.age} 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><LocalHospital /></ListItemIcon>
          <ListItemText 
            primary="Stent Bilgisi" 
            secondary={`${patient.stentType} - ${patient.location}`} 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><Favorite /></ListItemIcon>
          <ListItemText 
            primary="Tıkanıklık Oranı" 
            secondary={
              <Chip 
                label={`%${patient.blockagePercentage}`}
                color={patient.blockagePercentage >= 70 ? "error" : "warning"}
                size="small"
              />
            }
          />
        </ListItem>
      </List>
    </Box>
  );

  const renderMedicalHistory = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell>İşlem</TableCell>
            <TableCell>Doktor</TableCell>
            <TableCell>Notlar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicalHistory.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.procedure}</TableCell>
              <TableCell>{record.doctor}</TableCell>
              <TableCell>{record.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAppointments = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell>Saat</TableCell>
            <TableCell>Tür</TableCell>
            <TableCell>Doktor</TableCell>
            <TableCell>Durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>
                <Chip 
                  label={appointment.status === 'upcoming' ? 'Yaklaşan' : 'Tamamlandı'}
                  color={appointment.status === 'upcoming' ? 'primary' : 'success'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderNotifications = () => (
    <Box>
      {notifications.map((notification, index) => (
        <Alert 
          key={index}
          severity={
            notification.type === 'reminder' ? 'info' : 
            notification.type === 'medication' ? 'warning' : 
            'success'
          }
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle2">{notification.date}</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {notification.title}
          </Typography>
          <Typography variant="body2">
            {notification.message}
          </Typography>
        </Alert>
      ))}
    </Box>
  );

  const renderMedications = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        İlaç Listesi
      </Typography>
      {patient.medications?.map((med, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                {med.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Doz:</strong> {med.dosage}
              </Typography>
              <Typography variant="body1">
                <strong>Kullanım Sıklığı:</strong> {med.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Kullanım Zamanı:</strong> {
                  medicationTimings.find(t => t.value === med.timing)?.label
                }
              </Typography>
              {med.specialInstructions && (
                <Typography variant="body1">
                  <strong>Özel Talimatlar:</strong> {med.specialInstructions}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hasta Profili
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="KİŞİSEL BİLGİLER" />
            <Tab label="TIBBİ GEÇMİŞ" />
            <Tab label="RANDEVULAR" />
            <Tab label="BİLDİRİMLER" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSendSMS}
            sx={{ mr: 2 }}
          >
            SMS GÖNDER
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSendEmail}
          >
            E-POSTA GÖNDER
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && renderPersonalInfo()}
        {activeTab === 1 && (
          <Box>
            {renderMedications()}
            {renderMedicalHistory()}
          </Box>
        )}
        {activeTab === 2 && renderAppointments()}
        {activeTab === 3 && renderNotifications()}
      </Box>
    </>
  );
};

export default PatientProfile; 