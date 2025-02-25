import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Header from '../Layout/Header';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const mockPatients = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      tcNo: "12345678901",
      birthDate: "1959-02-15",
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
      birthDate: "1966-05-20",
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
      birthDate: "1952-08-10",
      blockagePercentage: 85,
      lastProcedureDate: "02.05.2024",
      nextAppointment: "03.05.2024",
      status: "critical",
      stentType: "İlaçsız Metal Stent (BMS)",
      location: "Cx"
    },
    {
      id: 4,
      name: "Fatma Şahin",
      tcNo: "12345678904",
      birthDate: "1963-11-25",
      blockagePercentage: 65,
      lastProcedureDate: "20.02.2024",
      nextAppointment: "20.03.2024",
      status: "stable",
      stentType: "İlaç Kaplı Stent (DES)",
      location: "LAD"
    },
    {
      id: 5,
      name: "Ali Öztürk",
      tcNo: "12345678905",
      birthDate: "1955-04-15",
      blockagePercentage: 75,
      lastProcedureDate: "02.12.2024",
      nextAppointment: "03.12.2024",
      status: "follow-up",
      stentType: "Polimer Bazlı İlaç Kaplı Stent",
      location: "RCA"
    }
  ];

  useEffect(() => {
    // LocalStorage'dan verileri al
    let storedPatients = localStorage.getItem('patients');
    
    if (!storedPatients) {
      // LocalStorage boşsa mock dataları kullan
      localStorage.setItem('patients', JSON.stringify(mockPatients));
      storedPatients = JSON.stringify(mockPatients);
    }
    
    setPatients(JSON.parse(storedPatients));
  }, []);

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

  const getStatusText = (status) => {
    switch (status) {
      case 'stable': return 'Stabil';
      case 'follow-up': return 'Takipte';
      case 'critical': return 'Kritik';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'success';
      case 'follow-up': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const handlePatientClick = (patient) => {
    navigate(`/doctor/patient/${patient.tcNo}`, { state: { patient } });
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/doctor/add-patient')}
              sx={{ backgroundColor: '#2c3e50' }}
            >
              Yeni Hasta Ekle
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hasta Adı</TableCell>
                  <TableCell>T.C. No</TableCell>
                  <TableCell>Yaş</TableCell>
                  <TableCell>Tıkanıklık %</TableCell>
                  <TableCell>Son İşlem</TableCell>
                  <TableCell>Sonraki Randevu</TableCell>
                  <TableCell>Stent Tipi</TableCell>
                  <TableCell>Lokasyon</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>İşlemler</TableCell>
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
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default DoctorDashboard; 