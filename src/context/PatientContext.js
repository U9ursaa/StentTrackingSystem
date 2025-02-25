import React, { createContext, useState, useEffect } from 'react';

const initialPatients = [
  {
    id: 1,
    tcNo: "12345678901",
    name: "Ahmet Yılmaz",
    birthDate: "1959-05-15",
    nationality: "TC",
    city: "İstanbul",
    address: "Ataşehir Mah. Palmiye Sok. No:5 D:12 Ataşehir/İstanbul",
    phone: "05551234567",
    email: "ahmet.yilmaz@email.com",
    age: 65,
    blockagePercentage: 80,
    lastProcedureDate: "2024-02-15",
    nextAppointment: "2024-03-15",
    procedureDate: "2024-02-15",
    appointmentHistory: [
      {
        date: "2024-03-01",
        status: "completed",
        notes: "İlk kontrol başarılı. EKG normal seyirde."
      },
      {
        date: "2024-03-15",
        status: "upcoming",
        notes: "2. kontrol randevusu"
      }
    ],
    stentDetails: "Sol ana koroner arter",
    procedureType: "İlaç kaplı stent",
    medicalHistory: [
      {
        id: 1,
        date: "2024-02-15",
        diagnosis: "Koroner Arter Hastalığı",
        treatment: "LAD'ye ilaç kaplı stent implantasyonu",
        notes: "İşlem başarılı geçti. Hasta stabil durumda."
      },
      {
        id: 2,
        date: "2024-03-01",
        diagnosis: "Kontrol Muayenesi",
        treatment: "İlaç tedavisine devam",
        notes: "EKG normal seyirde. Hasta asemptomatik."
      }
    ],
    medications: [
      {
        id: 1,
        name: "Plavix",
        dosage: "75mg",
        frequency: "Günde 1x1",
        startDate: "2024-02-15",
        notes: "Yemeklerden sonra alınmalı"
      },
      {
        id: 2,
        name: "Aspirin",
        dosage: "100mg",
        frequency: "Günde 1x1",
        startDate: "2024-02-15",
        notes: "Mide koruyucu ile birlikte"
      },
      {
        id: 3,
        name: "Atorvastatin",
        dosage: "40mg",
        frequency: "Günde 1x1 akşam",
        startDate: "2024-02-15",
        notes: "Akşam yemeğinden sonra"
      }
    ]
  },
  {
    id: 2,
    tcNo: "23456789012",
    name: "Ayşe Kaya",
    birthDate: "1979-08-23",
    nationality: "TC",
    city: "Ankara",
    address: "Çankaya Mah. Gül Sok. No:15 Çankaya/Ankara",
    phone: "05559876543",
    email: "ayse.kaya@email.com",
    age: 45,
    blockagePercentage: 20,
    lastProcedureDate: "2024-01-20",
    nextAppointment: "2024-03-01",
    procedureDate: "2024-01-20",
    appointmentHistory: [
      {
        date: "2024-02-15",
        status: "missed",
        notes: "Hasta gelmedi, telefonla ulaşılamadı"
      },
      {
        date: "2024-03-01",
        status: "upcoming",
        notes: "Telafi randevusu"
      }
    ],
    stentDetails: "Sağ koroner arter",
    procedureType: "Metal stent",
    medicalHistory: [
      {
        id: 1,
        date: "2024-01-20",
        diagnosis: "Unstabil Angina Pektoris",
        treatment: "Sirkumfleks artere stent implantasyonu",
        notes: "İşlem komplikasyonsuz tamamlandı."
      },
      {
        id: 2,
        date: "2024-02-05",
        diagnosis: "Post-op Kontrol",
        treatment: "Mevcut tedaviye devam",
        notes: "Göğüs ağrısı şikayeti gerilemiş. Efor kapasitesi artmış."
      },
      {
        id: 3,
        date: "2024-03-01",
        diagnosis: "Rutin Kontrol",
        treatment: "İlaç dozlarında düzenleme",
        notes: "Beta bloker dozu azaltıldı. Hasta stabil."
      }
    ],
    medications: [
      {
        id: 1,
        name: "Plavix",
        dosage: "75mg",
        frequency: "Günde 1x1",
        startDate: "2024-01-20",
        notes: "Yemeklerden sonra"
      },
      {
        id: 2,
        name: "Aspirin",
        dosage: "100mg",
        frequency: "Günde 1x1",
        startDate: "2024-01-20"
      }
    ]
  },
  {
    id: 3,
    tcNo: "34567890123",
    name: "Mehmet Demir",
    birthDate: "1952-03-10",
    nationality: "TC",
    city: "İzmir",
    address: "Karşıyaka Mah. Deniz Cad. No:45 Karşıyaka/İzmir",
    phone: "05557891234",
    email: "mehmet.demir@email.com",
    age: 72,
    blockagePercentage: 100,
    lastProcedureDate: "2023-03-10",
    nextAppointment: "2024-03-10",
    procedureDate: "2023-03-10",
    appointmentHistory: [
      {
        date: "2023-06-10",
        status: "completed",
        notes: "3 aylık kontrol normal, ilaç dozları ayarlandı"
      },
      {
        date: "2023-09-10",
        status: "completed",
        notes: "6 aylık kontrol, EKG değişikliği yok"
      },
      {
        date: "2024-03-10",
        status: "upcoming",
        notes: "Yıllık kontrol randevusu"
      }
    ],
    stentDetails: "Sol ön inen arter",
    procedureType: "Biyoemilebilir stent",
    medications: ["Plavix", "Aspirin", "Metoprolol", "Ramipril"]
  },
  {
    id: 4,
    tcNo: "45678901234",
    name: "Zeynep Şahin",
    birthDate: "1966-11-28",
    nationality: "TC",
    city: "Bursa",
    address: "Nilüfer Mah. Zambak Sok. No:8 D:3 Nilüfer/Bursa",
    phone: "05553456789",
    email: "zeynep.sahin@email.com",
    age: 58,
    blockagePercentage: 60,
    lastProcedureDate: "2024-02-01",
    nextAppointment: "2024-03-15",
    procedureDate: "2024-02-01",
    appointmentHistory: [
      {
        date: "2024-02-15",
        status: "completed",
        notes: "İlk kontrol başarılı, hasta asemptomatik"
      },
      {
        date: "2024-03-15",
        status: "upcoming",
        notes: "2. kontrol randevusu"
      }
    ],
    stentDetails: "Sirkumfleks arter",
    procedureType: "İlaç kaplı stent",
    medications: ["Plavix", "Aspirin", "Atorvastatin"]
  },
  {
    id: 5,
    tcNo: "56789012345",
    name: "Ali Kılıç",
    birthDate: "1971-04-05",
    nationality: "TC",
    city: "Antalya",
    address: "Muratpaşa Mah. Portakal Çiçeği Cad. No:25 Muratpaşa/Antalya",
    phone: "05552345678",
    email: "ali.kilic@email.com",
    age: 53,
    blockagePercentage: 90,
    lastProcedureDate: "2024-02-20",
    nextAppointment: "2024-03-20",
    procedureDate: "2024-02-20",
    appointmentHistory: [
      {
        date: "2024-03-05",
        status: "completed",
        notes: "İlk kontrol, EKG'de minimal değişiklik, yakın takip önerildi"
      },
      {
        date: "2024-03-20",
        status: "upcoming",
        notes: "2. kontrol randevusu"
      }
    ],
    stentDetails: "Sol ana koroner arter + LAD",
    procedureType: "İlaç kaplı stent (2 adet)",
    medicalHistory: [
      {
        id: 1,
        date: "2024-02-20",
        diagnosis: "Akut Miyokard İnfarktüsü",
        treatment: "Primer PKG ve çift damar stent implantasyonu",
        notes: "LAD ve RCA'ya başarılı stent implantasyonu yapıldı."
      },
      {
        id: 2,
        date: "2024-02-27",
        diagnosis: "Post-MI Kontrol",
        treatment: "İlaç tedavisi düzenlendi",
        notes: "Kardiyak rehabilitasyon programına alındı."
      },
      {
        id: 3,
        date: "2024-03-05",
        diagnosis: "1. Ay Kontrol",
        treatment: "Mevcut tedaviye devam",
        notes: "EKG'de minimal ST değişiklikleri mevcut. Yakın takip önerildi."
      }
    ],
    medications: ["Plavix", "Aspirin", "Atorvastatin", "Metoprolol"]
  }
];

export const PatientContext = createContext({
  patients: [],
  addPatient: () => {},
  updatePatient: () => {},
  deletePatient: () => {}
});

export const PatientProvider = ({ children }) => {
  // İlk yüklemede localStorage'ı temizle ve mock dataları kullan
  useEffect(() => {
    localStorage.removeItem('patients');
    setPatients(initialPatients);
  }, []);

  const [patients, setPatients] = useState(initialPatients);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (newPatient) => {
    const patient = {
      ...newPatient,
      id: Date.now(),
      appointmentHistory: [
        {
          date: newPatient.procedureDate,
          status: 'upcoming',
          notes: 'İlk kontrol randevusu'
        }
      ],
      nextAppointment: (() => {
        const procedureDate = new Date(newPatient.procedureDate);
        let days = 14;
        
        if (newPatient.blockagePercentage <= 20) {
          days = 40;
        } else if (newPatient.blockagePercentage <= 50) {
          days = 90;
        } else if (newPatient.blockagePercentage <= 80) {
          days = 180;
        } else {
          days = 365;
        }
        
        const nextDate = new Date(procedureDate);
        nextDate.setDate(nextDate.getDate() + days);
        return nextDate.toISOString();
      })()
    };

    setPatients(prevPatients => [...prevPatients, patient]);
    return patient;
  };

  const updatePatient = (updatedPatient) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const deletePatient = (patientId) => {
    setPatients(prevPatients =>
      prevPatients.filter(patient => patient.id !== patientId)
    );
  };

  const value = {
    patients,
    addPatient,
    updatePatient,
    deletePatient
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}; 