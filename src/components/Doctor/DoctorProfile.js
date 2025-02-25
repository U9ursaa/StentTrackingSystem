import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business,
  School,
  WorkHistory
} from '@mui/icons-material';
import Header from '../Layout/Header';

const DoctorProfile = () => {
  const doctorInfo = {
    name: 'Dr. Mehmet Öz',
    title: 'Kardiyoloji Uzmanı',
    email: 'mehmet.oz@hastane.com',
    phone: '+90 555 123 4567',
    hospital: 'Merkez Hastanesi',
    education: [
      'Tıp Fakültesi - Ankara Üniversitesi (1990-1996)',
      'Kardiyoloji Uzmanlık - Hacettepe Üniversitesi (1996-2001)'
    ],
    experience: [
      'Merkez Hastanesi - Kardiyoloji Uzmanı (2001-Günümüz)',
      'Devlet Hastanesi - Kardiyoloji Uzmanı (1996-2001)'
    ]
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                alt={doctorInfo.name}
                src="/doctor-avatar.png"
              />
              <Typography variant="h5" gutterBottom>
                {doctorInfo.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {doctorInfo.title}
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Kişisel Bilgiler
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary="E-posta" secondary={doctorInfo.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="Telefon" secondary={doctorInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText primary="Hastane" secondary={doctorInfo.hospital} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Eğitim
              </Typography>
              <List>
                {doctorInfo.education.map((edu, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={edu} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Deneyim
              </Typography>
              <List>
                {doctorInfo.experience.map((exp, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WorkHistory />
                    </ListItemIcon>
                    <ListItemText primary={exp} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default DoctorProfile; 