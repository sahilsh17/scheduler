export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filterDay = state.days.filter(dayItem => dayItem.name === day);
  if (filterDay.length === 0) {
    return [];
  }

  let appointmentForDay = [];
  let appointments = state.appointments;
  filterDay[0].appointments.forEach(AppoinmentID => {
    for (let appointment in appointments) {

      if (AppoinmentID == appointments[appointment].id) {
        appointmentForDay.push(appointments[appointment]);
      }
    }
  })
  return appointmentForDay;
}

// returns the interview object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewerID;
  if (typeof interview.interviewer === 'object') {
    interviewerID = interview.interviewer.id;
  } else {
    interviewerID = interview.interviewer;
  }

  const interviewersObject = state.interviewers;

  for (let interviewer in interviewersObject) {

    if (interviewer == interviewerID) {

      interview.interviewer = interviewersObject[interviewer];
      return interview;
    }
  }
}
// returns array of interviewers for a day
export function getInterviewersForDay(state, day) {
  const filterDay = state.days.filter(dayItem => dayItem.name === day);
  if (filterDay.length === 0) {
    return [];
  }

  let interviewersForDay = [];
  filterDay[0].interviewers.forEach(interviewerID => {
    for (let interviewer in state.interviewers) {
      if (interviewerID == interviewer) {
        interviewersForDay.push(state.interviewers[interviewer]);
      }
    }
  })
  return interviewersForDay;
}
