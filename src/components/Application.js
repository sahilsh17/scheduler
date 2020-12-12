import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getInterview } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
      },
      "2": {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      "3": {
        id: 3,
        time: '3pm',
        interview: {
          student: "John Marston",
          interviewer: {
            id: 4,
            name: "Cohana Roy",
            avatar: "https://i.imgur.com/FK8V841.jpg"
          }
        }
      },
      "4": {
        id: 4,
        time: "4pm",
        interview: {
          student: "Arthur Glen",
          interviewer: {
            id: 3,
            name: "Mildred Nazir",
            avatar: "https://i.imgur.com/T2WwVfS.png"
          }
        }
      },
      "5": {
        id: 5,
        time: '4:30pm'
      }
    },
    interviewers: {
      "1": {
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      }
    }
  });
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    })
      .then(() => {
        const appointment = {
          ...state.appointments[id - 1],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id - 1]: appointment
        };

        setState({ ...state, appointments });
      })
  }

  const setDay = day => setState({ ...state, day });
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
              bookInterview={bookInterview} />) //shorthand to send all properties of object 
          })
        }
      </section>
    </main>

  );
}
