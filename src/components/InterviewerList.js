import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
 console.log(props.interviewers);
  const interViewerListItemArray = props.interviewers.map((interviewer)=>{
    return (<InterviewerListItem
    key={interviewer.id}
    name = {interviewer.name}
    id = {interviewer.id}
    avatar={interviewer.avatar}
    selected={interviewer.id ===props.interviewer}
    setInterviewer = {props.setInterviewer}
    />

    )
  })
  return interViewerListItemArray;
}