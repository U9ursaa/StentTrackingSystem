export const mockHastalar = [
  {
    id: 1,
    ad: "Ahmet",
    soyad: "Yılmaz",
    yas: 34,
    riskFaktorleri: ["Açık Kalp Ameliyatı", "Anjiyoplasti (2 kez)"],
    hastaGecmisi: "Hipertansiyon, Diyabet",
    kalpRitmi: 90,
    saglikDurumu: "riskli" // riskli, saglikli, tedavi
  },
  {
    id: 2,
    ad: "Ayşe",
    soyad: "Kaya",
    yas: 45,
    riskFaktorleri: ["Bypass"],
    hastaGecmisi: "Kolesterol",
    kalpRitmi: 75,
    saglikDurumu: "tedavi"
  }
];

export const kalphastaliklariveRiskFaktorleri = [
  // Kalp Ameliyatları
  "Açık Kalp Ameliyatı",
  "Bypass Ameliyatı",
  "Kalp Kapağı Ameliyatı",
  "Anjiyoplasti",
  "Stent Takılması",
  
  // Kalp Hastalıkları
  "Koroner Arter Hastalığı",
  "Kalp Yetmezliği",
  "Kalp Ritim Bozukluğu",
  "Kalp Kapak Hastalıkları",
  "Kardiyomiyopati",
  
  // Risk Faktörleri
  "Hipertansiyon",
  "Diyabet",
  "Yüksek Kolesterol",
  "Obezite",
  "Sigara Kullanımı",
  
  // Diğer Kalp Sorunları
  "Doğumsal Kalp Hastalığı",
  "Perikardit",
  "Miyokardit",
  "Endokardit",
  "Aort Anevrizması",
  
  // Damar Hastalıkları
  "Ateroskleroz",
  "Derin Ven Trombozu",
  "Periferik Arter Hastalığı",
  "Varis",
  "Pulmoner Emboli"
];

export const mockPatients = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    age: 65,
    blockagePercentage: 80,
    lastProcedureDate: "2024-02-15",
    nextAppointment: "2024-03-15",
    appointmentHistory: [
      {
        date: "2024-03-01",
        status: "completed",
        notes: "İlk kontrol başarılı. EKG normal."
      },
      {
        date: "2024-03-15",
        status: "upcoming",
        notes: "2. kontrol"
      },
      {
        date: "2024-03-29",
        status: "upcoming",
        notes: "3. kontrol"
      }
    ],
    stentDetails: "Sol ana koroner arter",
    procedureType: "İlaç kaplı stent",
    medications: ["Plavix", "Aspirin", "Atorvastatin"]
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    age: 45,
    blockagePercentage: 20,
    lastProcedureDate: "2024-01-20",
    nextAppointment: "2024-03-01",
    appointmentHistory: [
      {
        date: "2024-02-15",
        status: "missed",
        notes: "Hasta gelmedi, telefonla ulaşılamadı"
      },
      {
        date: "2024-03-01",
        status: "upcoming",
        notes: "Tekrar randevu"
      }
    ],
    stentDetails: "Sağ koroner arter",
    procedureType: "Metal stent",
    medications: ["Plavix", "Aspirin"]
  },
  {
    id: 3,
    name: "Mehmet Demir",
    age: 72,
    blockagePercentage: 100,
    lastProcedureDate: "2023-03-10",
    nextAppointment: "2024-03-10",
    appointmentHistory: [
      {
        date: "2023-06-10",
        status: "completed",
        notes: "3 aylık kontrol normal"
      },
      {
        date: "2023-09-10",
        status: "completed",
        notes: "6 aylık kontrol normal"
      },
      {
        date: "2024-03-10",
        status: "upcoming",
        notes: "Yıllık kontrol"
      }
    ],
    stentDetails: "Sol ön inen arter",
    procedureType: "Biyoemilebilir stent",
    medications: ["Plavix", "Aspirin", "Metoprolol", "Ramipril"]
  },
  {
    id: 4,
    name: "Zeynep Şahin",
    age: 58,
    blockagePercentage: 60,
    lastProcedureDate: "2024-02-01",
    nextAppointment: "2024-03-15",
    appointmentHistory: [
      {
        date: "2024-02-15",
        status: "completed",
        notes: "İlk kontrol başarılı"
      },
      {
        date: "2024-03-15",
        status: "upcoming",
        notes: "2. kontrol"
      }
    ],
    stentDetails: "Sirkumfleks arter",
    procedureType: "İlaç kaplı stent",
    medications: ["Plavix", "Aspirin", "Atorvastatin"]
  },
  {
    id: 5,
    name: "Ali Kılıç",
    age: 53,
    blockagePercentage: 90,
    lastProcedureDate: "2024-02-20",
    nextAppointment: "2024-03-20",
    appointmentHistory: [
      {
        date: "2024-03-05",
        status: "completed",
        notes: "İlk kontrol, EKG'de minimal değişiklik"
      },
      {
        date: "2024-03-20",
        status: "upcoming",
        notes: "2. kontrol, Efor testi yapılacak"
      }
    ],
    stentDetails: "Sol ana koroner arter + LAD",
    procedureType: "İlaç kaplı stent (2 adet)",
    medications: ["Plavix", "Aspirin", "Atorvastatin", "Metoprolol"]
  },
  {
    id: 6,
    name: "Fatma Yıldız",
    age: 68,
    blockagePercentage: 40,
    lastProcedureDate: "2024-01-15",
    nextAppointment: "2024-03-15",
    appointmentHistory: [
      {
        date: "2024-02-01",
        status: "completed",
        notes: "İlk kontrol normal"
      },
      {
        date: "2024-02-15",
        status: "missed",
        notes: "Hasta grip nedeniyle gelemedi"
      },
      {
        date: "2024-03-15",
        status: "upcoming",
        notes: "Tekrar randevu"
      }
    ],
    stentDetails: "RCA proksimal",
    procedureType: "İlaç kaplı stent",
    medications: ["Plavix", "Aspirin", "Rosuvastatin"]
  },
  {
    id: 7,
    name: "Mustafa Öztürk",
    age: 61,
    blockagePercentage: 75,
    lastProcedureDate: "2024-02-10",
    nextAppointment: "2024-03-10",
    appointmentHistory: [
      {
        date: "2024-02-25",
        status: "completed",
        notes: "İlk kontrol, Holter takıldı"
      },
      {
        date: "2024-03-10",
        status: "upcoming",
        notes: "2. kontrol, Holter sonucu değerlendirilecek"
      }
    ],
    stentDetails: "Diagonal arter",
    procedureType: "Metal stent",
    medications: ["Plavix", "Aspirin", "Atorvastatin", "Diltiazem"]
  },
  {
    id: 8,
    name: "Aysel Çelik",
    age: 49,
    blockagePercentage: 30,
    lastProcedureDate: "2024-01-05",
    nextAppointment: "2024-03-05",
    appointmentHistory: [
      {
        date: "2024-02-05",
        status: "completed",
        notes: "İlk kontrol normal"
      },
      {
        date: "2024-03-05",
        status: "upcoming",
        notes: "2. kontrol"
      }
    ],
    stentDetails: "RCA distal",
    procedureType: "İlaç kaplı stent",
    medications: ["Plavix", "Aspirin"]
  }
]; 