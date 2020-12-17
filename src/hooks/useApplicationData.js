import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData(newState) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],

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

  //updateSpotsNumber function accepts the day object for which the number of spots will be updated and change which is used to either increase or decrease the number of spots
  function updateSpotsNumber(day, change) {
    const id = day.id;
    const newDays = [...state.days]
    if (change) {
      newDays[id - 1].spots -= 1;
      setState(prev => ({ ...prev, newDays }));
    } else {
      newDays[id - 1].spots += 1;
      setState(prev => ({ ...prev, newDays }));
    }

  }

  //bookInterview function saves an interview in database by making a put request to database server
  function bookInterview(id, interview, updateSpot) {
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

        //finding the day object in days array for which the number of spots will be updated
        const findDay = state.days.find(day => {
          return day.name === state.day;
        });

        //updateSpot will be true if user creates a new appointment, and will be false if user edits the appointment, so number of spots updates only when booking a new appointment
        if (updateSpot) {
          updateSpotsNumber(findDay, true);
        }
      })
  }

  // cancelInterview function makes a delete request to delete the interview and then update spots 
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
        updateSpotsNumber(findDay, false);
      })
  }
  return { state, setDay, setState, bookInterview, cancelInterview };
}
