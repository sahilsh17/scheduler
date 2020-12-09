import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  
 if(props.interview) {
   return (<Fragment><Header time={props.time}/><Show student={props.interview.student} interviewer={props.interview.interviewer}/></Fragment>);
 }
 
 return (<Fragment><Header time={props.time} /><Empty/></Fragment>)
   

 
  
  
    
}