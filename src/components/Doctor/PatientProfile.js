import React, { useContext, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add as AddIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { PatientContext } from '../../context/PatientContext';
import Header from '../Layout/Header';

const PatientProfile = () => {
  const { id } = useParams();
  const { patients, updatePatient } = useContext(PatientContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [notificationDialog, setNotificationDialog] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationContent, setNotificationContent] = useState('');

  // Yeni state'ler
  const [medicalHistoryDialog, setMedicalHistoryDialog] = useState(false);
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  const [newMedicalHistory, setNewMedicalHistory] = useState({
    date: new Date(),
    notes: '',
    diagnosis: '',
    treatment: ''
  });
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    notes: '',
    type: 'checkup' // 'checkup' veya 'procedure'
  });
  const [medicationDialog, setMedicationDialog] = useState(false);

  const patient = patients.find(p => p.id === parseInt(id));

  if (!patient) {
    return <Typography>Hasta bulunamadı</Typography>;
  }

  const handleNotificationSend = () => {
    console.log(`${notificationType} gönderiliyor:`, notificationContent);
    setNotificationDialog(false);
    setNotificationContent('');
  };

  const handleAddMedicalHistory = () => {
    const updatedPatient = {
      ...patient,
      medicalHistory: [
        ...(patient.medicalHistory || []),
        {
          ...newMedicalHistory,
          id: Date.now(),
          date: newMedicalHistory.date.toISOString()
        }
      ]
    };
    updatePatient(updatedPatient);
    setMedicalHistoryDialog(false);
    setNewMedicalHistory({
      date: new Date(),
      notes: '',
      diagnosis: '',
      treatment: ''
    });
  };

  const handleAddAppointment = () => {
    const updatedPatient = {
      ...patient,
      appointmentHistory: [
        ...(patient.appointmentHistory || []),
        {
          ...newAppointment,
          id: Date.now(),
          date: newAppointment.date.toISOString(),
          status: 'upcoming'
        }
      ]
    };
    updatePatient(updatedPatient);
    setAppointmentDialog(false);
    setNewAppointment({
      date: new Date(),
      notes: '',
      type: 'checkup'
    });
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Hasta Profili
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
                  <Tab label="KİŞİSEL BİLGİLER" />
                  <Tab label="TIBBİ GEÇMİŞ" />
                  <Tab label="İLAÇLAR" />
                  <Tab label="RANDEVULAR" />
                  <Tab label="BİLDİRİMLER" />
                </Tabs>
              </Box>

              {currentTab === 0 && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" color="textSecondary">
                        T.C. Kimlik No
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.tcNo}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        Ad Soyad
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.name}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        Doğum Tarihi
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {new Date(patient.birthDate).toLocaleDateString('tr-TR')}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        Uyruk
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.nationality}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Şehir
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.city}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        Adres
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.address}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        Telefon
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.phone}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        E-posta
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {patient.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {currentTab === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setMedicalHistoryDialog(true)}
                    >
                      Tıbbi Geçmiş Ekle
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {patient.medicalHistory?.map((history) => (
                      <Paper key={history.id} sx={{ p: 2 }}>
                        <Typography variant="subtitle1">
                          {new Date(history.date).toLocaleDateString('tr-TR')}
                        </Typography>
                        <Typography variant="h6">{history.diagnosis}</Typography>
                        <Typography>{history.treatment}</Typography>
                        <Typography color="text.secondary">{history.notes}</Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {currentTab === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setMedicationDialog(true)}
                    >
                      İlaç Ekle
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {patient.medications?.map((medication) => (
                      <Paper key={medication.id} sx={{ p: 2 }}>
                        <Typography variant="h6">{medication.name}</Typography>
                        <Typography>Doz: {medication.dosage}</Typography>
                        <Typography>Kullanım: {medication.frequency}</Typography>
                        <Typography>
                          Başlangıç: {new Date(medication.startDate).toLocaleDateString('tr-TR')}
                        </Typography>
                        {medication.endDate && (
                          <Typography>
                            Bitiş: {new Date(medication.endDate).toLocaleDateString('tr-TR')}
                          </Typography>
                        )}
                        {medication.notes && (
                          <Typography color="text.secondary">Not: {medication.notes}</Typography>
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {currentTab === 3 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setAppointmentDialog(true)}
                    >
                      Randevu Ekle
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {patient.appointmentHistory?.map((appointment) => (
                      <Paper key={appointment.id} sx={{ p: 2 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="h6">
                              {new Date(appointment.date).toLocaleDateString('tr-TR')}
                            </Typography>
                            <Typography variant="body2">{appointment.notes}</Typography>
                          </Grid>
                          <Grid item>
                            <Chip
                              label={
                                appointment.status === 'completed' ? 'Tamamlandı' :
                                appointment.status === 'missed' ? 'Gelmedi' : 'Bekliyor'
                              }
                              color={
                                appointment.status === 'completed' ? 'success' :
                                appointment.status === 'missed' ? 'error' : 'primary'
                              }
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {currentTab === 4 && (
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button 
                      variant="contained" 
                      onClick={() => {
                        setNotificationType('sms');
                        setNotificationDialog(true);
                      }}
                    >
                      SMS Gönder
                    </Button>
                    <Button 
                      variant="contained"
                      onClick={() => {
                        setNotificationType('email');
                        setNotificationDialog(true);
                      }}
                    >
                      E-posta Gönder
                    </Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={notificationDialog} onClose={() => setNotificationDialog(false)}>
          <DialogTitle>
            {notificationType === 'sms' ? 'SMS Gönder' : 'E-posta Gönder'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={notificationContent}
              onChange={(e) => setNotificationContent(e.target.value)}
              placeholder="Mesajınızı yazın..."
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotificationDialog(false)}>İptal</Button>
            <Button onClick={handleNotificationSend} variant="contained">
              Gönder
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tıbbi Geçmiş Ekleme Dialog */}
        <Dialog 
          open={medicalHistoryDialog} 
          onClose={() => setMedicalHistoryDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Tıbbi Geçmiş Ekle</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DatePicker
                  label="Tarih"
                  value={newMedicalHistory.date}
                  onChange={(newValue) => setNewMedicalHistory({
                    ...newMedicalHistory,
                    date: newValue
                  })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tanı"
                  value={newMedicalHistory.diagnosis}
                  onChange={(e) => setNewMedicalHistory({
                    ...newMedicalHistory,
                    diagnosis: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tedavi"
                  value={newMedicalHistory.treatment}
                  onChange={(e) => setNewMedicalHistory({
                    ...newMedicalHistory,
                    treatment: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notlar"
                  value={newMedicalHistory.notes}
                  onChange={(e) => setNewMedicalHistory({
                    ...newMedicalHistory,
                    notes: e.target.value
                  })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMedicalHistoryDialog(false)}>İptal</Button>
            <Button onClick={handleAddMedicalHistory} variant="contained">
              Ekle
            </Button>
          </DialogActions>
        </Dialog>

        {/* Randevu Ekleme Dialog */}
        <Dialog 
          open={appointmentDialog} 
          onClose={() => setAppointmentDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Randevu Ekle</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DatePicker
                  label="Randevu Tarihi"
                  value={newAppointment.date}
                  onChange={(newValue) => setNewAppointment({
                    ...newAppointment,
                    date: newValue
                  })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Randevu Tipi</InputLabel>
                  <Select
                    value={newAppointment.type}
                    label="Randevu Tipi"
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      type: e.target.value
                    })}
                  >
                    <MenuItem value="checkup">Kontrol</MenuItem>
                    <MenuItem value="procedure">İşlem</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notlar"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value
                  })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAppointmentDialog(false)}>İptal</Button>
            <Button onClick={handleAddAppointment} variant="contained">
              Randevu Oluştur
            </Button>
          </DialogActions>
        </Dialog>

        {/* İlaç Ekleme Dialog */}
        <Dialog 
          open={medicationDialog} 
          onClose={() => setMedicationDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {/* ... mevcut ilaç ekleme dialog içeriği ... */}
        </Dialog>
      </Box>
    </>
  );
};

export default PatientProfile; 