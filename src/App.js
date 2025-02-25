import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import Login from './components/Auth/Login';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import PatientDashboard from './components/Patient/PatientDashboard';
import AddPatient from './components/Doctor/AddPatient';
import PatientProfile from './components/Doctor/PatientProfile';

// Protected Route bileşeni
const ProtectedRoute = ({ children, allowedUserType }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.type !== allowedUserType) {
    return <Navigate to="/login" />;
  }
 
  return children;
};

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/add-patient" element={<AddPatient />} />
              <Route path="/doctor/patient/:id" element={<PatientProfile />} />
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App; 