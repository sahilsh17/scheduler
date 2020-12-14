import { useState } from 'react';
import axios from "axios";

export default function useApplicationData(newState) {
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
  const setDay = day => setState({ ...state, day });

  function updateSpots(day, change) {
    const id = day.id;
    const newDays = [...state.days]
    if (change) {
      newDays[id - 1].spots -= 1;
      setState(prev => ({ ...prev,newDays}));
    } else {
      newDays[id - 1].spots += 1;
      setState(prev => ({ ...prev,newDays}));
    }
    
  }
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
        const findDay = state.days.find(day => {
          return day.name === state.day;
        });
        updateSpots(findDay, true);
      })
  }
  function cancelInterview(id, interview) {

    return axios.delete(`/api/appointments/${id}`, {
      interview
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
        const findDay = state.days.find(day => {
          return day.name === state.day;
        });
        updateSpots(findDay, false);
      })
  }
  return { state, setDay, setState, bookInterview, cancelInterview };
}
