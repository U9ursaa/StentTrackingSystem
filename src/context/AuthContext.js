import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Mock kullanıcı doğrulama
    if (credentials.userType === 'doctor' && 
        credentials.identifier === 'dr.mehmet.oz@hospital.com' && 
        credentials.password === '123456') {
      setUser({
        id: 1,
        name: 'Dr. Mehmet Öz',
        type: 'doctor',
        title: 'Kardiyoloji Uzmanı'
      });
      return true;
    } 
    else if (credentials.userType === 'patient' && 
             credentials.identifier === '12345678901' && 
             credentials.password === '123456') {
      setUser({
        id: 2,
        name: 'Ahmet Yılmaz',
        type: 'patient',
        tcNo: credentials.identifier
      });
      return true;
    }
    else {
      throw new Error('Geçersiz kullanıcı bilgileri');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 