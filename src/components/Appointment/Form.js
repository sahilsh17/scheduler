import React,{ useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");
function validate() {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }

  props.onSave(name, interviewer);
}
  function reset() {
  setName("");
  setInterviewer(null);
}
 function cancel() {
   reset();
   props.onCancel();
 }
 return( <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
   
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value ={name}
        onChange = {(event) =>setName(event.target.value)}
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList onClick={(event) =>setInterviewer(props.interviewer)} interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={()=>{cancel()}} danger>Cancel</Button>
      <Button onClick={()=>validate()} confirm>Save</Button>
    </section>
  </section>
</main>
 );
}