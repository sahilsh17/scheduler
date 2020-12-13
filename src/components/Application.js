import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getInterview } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    setState,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let dailyAppointments = [];
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        const appointments = Object.values(all[1].data)

        setState(prev => ({ ...prev, days: all[0].data, appointments, interviewers: all[2].data }));


      });

  }, [state.day]);
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

            const interview = getInterview(state, appointment.interview);
            console.log(interview);
            return (<Appointment key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewersForday}
              bookInterview={bookInterview}
              cancelInterview = {cancelInterview} />) //shorthand to send all properties of object 
          })
        }
      </section>
    </main>

  );
}
