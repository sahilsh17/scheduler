import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props.bookInterview(props.id,interview)
    .then(()=>{transition("SHOW");})
    
  }
  return (
    
    <Fragment>
      {mode === SAVING && <Fragment><Header time={props.time} /><Status message='SAVING' /></Fragment>}
      {mode === EMPTY && <Fragment><Header time={props.time} /><Empty onAdd={() => transition('CREATE')} /></Fragment>}
      {mode === SHOW && (
        <Fragment><Header time={props.time} /><Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
         
        /> </Fragment>
      )}
      {mode === CREATE && (
        <Fragment><Header time={props.time} /><Form onSave={save}  onCancel={()=> back()}  interviewers ={props.interviewers} /> </Fragment>
      )}
    </Fragment>

  )
}
//  if(props.interview) {
//    return (<Fragment><Header time={props.time}/><Show student={props.interview.student} interviewer={props.interview.interviewer}/></Fragment>);
//  }

//  return (<Fragment><Header time={props.time} /><Empty/></Fragment>)






