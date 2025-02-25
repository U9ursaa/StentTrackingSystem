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
  Alert,
  AlertTitle,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import {
  Person,
  Phone,
  Email,
  Home,
  CalendarToday,
  LocalHospital,
  Favorite,
  Assignment,
  Edit,
  Delete
} from '@mui/icons-material';
import Header from '../Layout/Header';

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openMedicationDialog, setOpenMedicationDialog] = useState(false);
  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient);

  // İlaç zamanları tanımı eklendi
  const medicationTimings = [
    { value: 'ac', label: 'Aç Karnına' },
    { value: 'pc', label: 'Tok Karnına' },
    { value: 'morning', label: 'Sabah' },
    { value: 'noon', label: 'Öğlen' },
    { value: 'evening', label: 'Akşam' },
    { value: 'night', label: 'Gece Yatmadan' }
  ];

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

  // Bildirimler için örnek veri
  const notifications = [
    {
      date: '15.03.2024',
      type: 'Randevu Hatırlatması',
      message: 'Yarınki kontrol randevunuzu unutmayınız.',
      severity: 'info'
    },
    {
      date: '01.03.2024',
      type: 'İlaç Hatırlatması',
      message: 'Plavix ilacınızı düzenli kullanmayı unutmayınız.',
      severity: 'warning'
    },
    {
      date: '15.02.2024',
      type: 'Test Sonuçları',
      message: 'Kan testi sonuçlarınız sisteme yüklendi.',
      severity: 'success'
    }
  ];

  // Genişletilmiş ilaç listesi
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
    },
    {
      id: 9,
      name: 'Ramipril',
      commonDosages: ['2.5mg', '5mg', '10mg'],
      commonFrequencies: ['Günde 1 kez'],
      defaultInstructions: 'Sabah aç karnına alınmalıdır.'
    },
    {
      id: 10,
      name: 'Lasix (Furosemid)',
      commonDosages: ['20mg', '40mg', '80mg'],
      commonFrequencies: ['Günde 1 kez', 'Günde 2 kez'],
      defaultInstructions: 'Sabah aç karnına alınmalıdır.'
    }
  ];

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    timing: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    active: true,
    specialInstructions: ''
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendSMS = () => {
    console.log('SMS gönderiliyor...');
  };

  const handleSendEmail = () => {
    console.log('E-posta gönderiliyor...');
  };

  const handleOpenMedicationDialog = () => {
    setOpenMedicationDialog(true);
  };

  const handleCloseMedicationDialog = () => {
    setOpenMedicationDialog(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      timing: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      active: true,
      specialInstructions: ''
    });
  };

  const handleMedicationChange = (event) => {
    const selectedMed = availableMedications.find(med => med.name === event.target.value);
    if (selectedMed) {
      setNewMedication({
        ...newMedication,
        name: selectedMed.name,
        dosage: selectedMed.commonDosages[0],
        frequency: selectedMed.commonFrequencies[0],
        specialInstructions: selectedMed.defaultInstructions
      });
    }
  };

  const handleAddMedication = () => {
    const updatedPatient = {
      ...patient,
      medications: [...(patient.medications || []), newMedication]
    };
    setPatient(updatedPatient);
    
    // LocalStorage'ı güncelle
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const updatedPatients = patients.map(p => 
      p.id === patient.id ? updatedPatient : p
    );
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    
    handleCloseMedicationDialog();
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Tıbbi Geçmiş
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tarih</TableCell>
              <TableCell>İşlem</TableCell>
              <TableCell>Detay</TableCell>
              <TableCell>Doktor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>15.02.2024</TableCell>
              <TableCell>Stent İşlemi</TableCell>
              <TableCell>LAD'ye İlaç Kaplı Stent (DES) yerleştirildi</TableCell>
              <TableCell>Dr. Mehmet Öz</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10.01.2024</TableCell>
              <TableCell>Anjiyografi</TableCell>
              <TableCell>LAD'de %80 darlık tespit edildi</TableCell>
              <TableCell>Dr. Mehmet Öz</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
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
          severity={notification.severity} 
          sx={{ mb: 2 }}
        >
          <AlertTitle>
            {notification.type} - {notification.date}
          </AlertTitle>
          {notification.message}
        </Alert>
      ))}
    </Box>
  );

  const renderMedicationDialog = () => (
    <Dialog 
      open={openMedicationDialog} 
      onClose={handleCloseMedicationDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5">Yeni İlaç Ekle</Typography>
      </DialogTitle>
      <DialogContent sx={{ minHeight: '500px' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          mt: 2,
          '& .MuiFormControl-root': { minWidth: '100%' }
        }}>
          <FormControl fullWidth>
            <InputLabel>İlaç Seçimi</InputLabel>
            <Select
              value={newMedication.name}
              onChange={handleMedicationChange}
              label="İlaç Seçimi"
              sx={{ minWidth: '100%' }}
            >
              {availableMedications.map((med) => (
                <MenuItem key={med.id} value={med.name}>
                  {med.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {newMedication.name && (
            <>
              <FormControl fullWidth>
                <InputLabel>Doz</InputLabel>
                <Select
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  label="Doz"
                >
                  {availableMedications
                    .find(med => med.name === newMedication.name)
                    ?.commonDosages.map((dosage) => (
                      <MenuItem key={dosage} value={dosage}>
                        {dosage}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Kullanım Sıklığı</InputLabel>
                <Select
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                  label="Kullanım Sıklığı"
                >
                  {availableMedications
                    .find(med => med.name === newMedication.name)
                    ?.commonFrequencies.map((freq) => (
                      <MenuItem key={freq} value={freq}>
                        {freq}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Kullanım Zamanı</InputLabel>
                <Select
                  value={newMedication.timing}
                  onChange={(e) => setNewMedication({...newMedication, timing: e.target.value})}
                  label="Kullanım Zamanı"
                >
                  {medicationTimings.map((timing) => (
                    <MenuItem key={timing.value} value={timing.value}>
                      {timing.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Başlangıç Tarihi"
                type="date"
                value={newMedication.startDate}
                onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />

              <TextField
                label="Bitiş Tarihi"
                type="date"
                value={newMedication.endDate}
                onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />

              <TextField
                label="Özel Talimatlar"
                multiline
                rows={3}
                value={newMedication.specialInstructions}
                onChange={(e) => setNewMedication({...newMedication, specialInstructions: e.target.value})}
                fullWidth
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleCloseMedicationDialog} 
          size="large"
        >
          İptal
        </Button>
        <Button 
          onClick={handleAddMedication} 
          variant="contained" 
          color="primary"
          size="large"
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderMedicationTab = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">İlaç Listesi</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenMedicationDialog}
        >
          Yeni İlaç Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>İlaç Adı</TableCell>
              <TableCell>Doz</TableCell>
              <TableCell>Kullanım</TableCell>
              <TableCell>Başlangıç</TableCell>
              <TableCell>Bitiş</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patient?.medications?.map((med, index) => (
              <TableRow key={index}>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell>
                  {med.frequency}
                  <Typography variant="caption" display="block" color="textSecondary">
                    {medicationTimings.find(t => t.value === med.timing)?.label}
                  </Typography>
                </TableCell>
                <TableCell>{med.startDate}</TableCell>
                <TableCell>{med.endDate}</TableCell>
                <TableCell>
                  <Chip
                    label={med.active ? 'Aktif' : 'Pasif'}
                    color={med.active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {patient?.medications?.some(med => med.specialInstructions) && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Özel Talimatlar ve Notlar
          </Typography>
          {patient.medications.map((med, index) => (
            med.specialInstructions && (
              <Paper key={index} sx={{ p: 2, mt: 1 }}>
                <Typography variant="subtitle1" color="primary">
                  {med.name}
                </Typography>
                <Typography variant="body2">
                  {med.specialInstructions}
                </Typography>
              </Paper>
            )
          ))}
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Hasta Profili
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="KİŞİSEL BİLGİLER" />
            <Tab label="TIBBİ GEÇMİŞ" />
            <Tab label="RANDEVULAR" />
            <Tab label="İLAÇLAR" />
            <Tab label="BİLDİRİMLER" />
          </Tabs>

          {activeTab === 0 && renderPersonalInfo()}
          {activeTab === 1 && renderMedicalHistory()}
          {activeTab === 2 && renderAppointments()}
          {activeTab === 3 && renderMedicationTab()}
          {activeTab === 4 && renderNotifications()}
          {renderMedicationDialog()}
        </Paper>
      </Box>
    </>
  );
};

export default PatientProfile; 