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

export function getInterview(state,interview) {
  if(!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewersObject = state.interviewers;
  
  for(let interviewer in interviewersObject) {
  
    if (interviewer == interviewerID) {
      
      interview.interviewer = interviewersObject[interviewer];
      return interview;
    }
  }
}
export function getInterviewersForDay (state,day) {
  const filterDay = state.days.filter(dayItem => dayItem.name === day);
  if(filterDay.length === 0) {
    return [];
  }
  
  let interviewersForDay = [];
    filterDay[0].interviewers.forEach(interviewerID => {
    for(let interviewer in state.interviewers) {
      if (interviewerID == interviewer) {
        interviewersForDay.push(state.interviewers[interviewer]);
      }
    }
  }) 
  return interviewersForDay;
}
