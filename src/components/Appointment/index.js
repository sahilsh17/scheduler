import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = "EDIT";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETING = "ERROR_DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    const updateSpot = mode === CREATE ? true : false;

    transition('SAVING');
    props.bookInterview(props.id, interview, updateSpot)
      .then(() => transition("SHOW"))
      .catch((err) => {
        console.log(err);
        transition("ERROR_SAVING", true);
      })
  }

  function Delete() {
    const interview = null;
    transition('DELETING', true);
    console.log(props.id);
    props.cancelInterview(props.id, interview)
      .then(() => { transition("EMPTY"); })
      .catch(() => transition('ERROR_DELETING', true));
  }
  return (

    <article data-testid="appointment">
      {mode === SAVING && <Fragment><Header time={props.time} /><Status message='SAVING' /></Fragment>}
      {mode === DELETING && <Fragment><Header time={props.time} /><Status message='Deleting' /></Fragment>}
      {mode === CONFIRM && <Fragment><Header time={props.time} /><Confirm message="Are you sure you want to delete" onConfirm={Delete} onCancel={() => transition('SHOW')} /></Fragment>}
      {mode === ERROR_SAVING && <Fragment><Header time={props.time} /><Error onClose={() => back()} message='ERROR SAVING' /></Fragment>}
      {mode === ERROR_DELETING && <Fragment><Header time={props.time} /><Error onClose={() => back()} message='ERROR DELETING' /></Fragment>}
      {mode === EMPTY && <Fragment><Header time={props.time} /><Empty onAdd={() => transition('CREATE')} /></Fragment>}
      {mode === SHOW && (
        <Fragment><Header time={props.time} /><Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition('CONFIRM') }}
          onEdit={() => transition('EDIT')}
        /> </Fragment>
      )}
      {mode === CREATE && (
        <Fragment><Header time={props.time} /><Form onSave={save} onCancel={() => back()} interviewers={props.interviewers} /> </Fragment>
      )}
      {mode === EDIT && <Fragment><Header time={props.time} /><Form onSave={save} onCancel={() => back()} name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} /></Fragment>}

    </article>

  )
}






