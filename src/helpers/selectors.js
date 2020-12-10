export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filterDay = state.days.filter(dayItem => dayItem.name === day);
  if(filterDay.length === 0) {
    return [];
  }
  
  let appoinmentForDay = [];
    filterDay[0].appointments.forEach(AppoinmentID => {
    for(let appoinment in state.appointments) {
      if (AppoinmentID == appoinment) {
        appoinmentForDay.push(state.appointments[appoinment]);
      }
    }
  }) 
  return appoinmentForDay;
} 

