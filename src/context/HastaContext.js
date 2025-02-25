import React, { createContext, useState } from 'react';
import { mockHastalar } from '../data/mockData';

export const HastaContext = createContext();

export const HastaProvider = ({ children }) => {
  const [hastalar, setHastalar] = useState(mockHastalar);

  const hastaEkle = (yeniHasta) => {
    // Yeni hastayı ekle
    const guncelHastalar = [...hastalar, yeniHasta];
    setHastalar(guncelHastalar);
    
    // Local Storage'a kaydet
    localStorage.setItem('hastalar', JSON.stringify(guncelHastalar));
  };

  const hastaGuncelle = (guncelHasta) => {
    const guncelHastalar = hastalar.map(hasta => 
      hasta.id === guncelHasta.id ? guncelHasta : hasta
    );
    setHastalar(guncelHastalar);
    localStorage.setItem('hastalar', JSON.stringify(guncelHastalar));
  };

  const hastaSil = (hastaId) => {
    const guncelHastalar = hastalar.filter(hasta => hasta.id !== hastaId);
    setHastalar(guncelHastalar);
    localStorage.setItem('hastalar', JSON.stringify(guncelHastalar));
  };

  // Component mount olduğunda Local Storage'dan verileri al
  React.useEffect(() => {
    const kayitliHastalar = localStorage.getItem('hastalar');
    if (kayitliHastalar) {
      setHastalar(JSON.parse(kayitliHastalar));
    }
  }, []);

  return (
    <HastaContext.Provider value={{ 
      hastalar, 
      hastaEkle, 
      hastaGuncelle, 
      hastaSil 
    }}>
      {children}
    </HastaContext.Provider>
  );
}; 