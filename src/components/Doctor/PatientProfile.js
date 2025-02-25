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
import { useParams, useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const patient = location.state?.patient || patients.find(p => p.id === parseInt(id));

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
          <Typography variant="h5" gutterBottom>
            Hasta Detayları
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Ad Soyad: {patient.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                T.C. No: {patient.tcNo}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Yaş: {patient.age}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Stent Tipi: {patient.stentType}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Lokasyon: {patient.location}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Tıkanıklık: 
                <Chip 
                  label={`%${patient.blockagePercentage}`}
                  color={patient.blockagePercentage >= 70 ? "error" : "warning"}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Son İşlem Tarihi: {patient.lastProcedureDate}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Sonraki Randevu: {patient.nextAppointment}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Durum: 
                <Chip 
                  label={patient.status === 'stable' ? 'Stabil' : 
                         patient.status === 'follow-up' ? 'Takipte' : 'Kritik'}
                  color={patient.status === 'stable' ? 'success' :
                         patient.status === 'follow-up' ? 'warning' : 'error'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default PatientProfile; 