import React from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getInterview } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let dailyAppointments = [];

 // dailyAppointments receives array of appointments for a day by calling getAppointmentsForDay in selectors
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewersForday = getInterviewersForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        {<React.Fragment><img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu"><DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          /></nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          /></React.Fragment>}
      </section>
      <section className="schedule">
        {
          dailyAppointments.map((appointment) => {
            //interview receives interview object by calling getInterview function in selectors file
            const interview = getInterview(state, appointment.interview);
            return (<Appointment key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewersForday}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview} />)  
          })
        }
      </section>
    </main>

  );
}
