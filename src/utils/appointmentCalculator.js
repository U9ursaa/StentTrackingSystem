export const calculateControlAppointments = (stentBlockagePercentage) => {
  let controlPeriod;
  let numberOfControls = 3;
  
  // Tıkanıklık yüzdesine göre kontrol periyodu belirleme
  if (stentBlockagePercentage <= 20) {
    controlPeriod = 40; // 40 gün
  } else if (stentBlockagePercentage <= 50) {
    controlPeriod = 90; // 3 ay
  } else if (stentBlockagePercentage <= 80) {
    controlPeriod = 180; // 6 ay
  } else {
    controlPeriod = 365; // 12 ay
  }

  const appointments = [];
  const today = new Date();

  for (let i = 0; i < numberOfControls; i++) {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + (controlPeriod * (i + 1)));
    appointments.push({
      date: appointmentDate,
      status: 'pending' // 'pending', 'completed', 'missed'
    });
  }

  return appointments;
}; 