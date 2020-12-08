import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewersListItemClass = classNames("interviwers__item", {
    "interviewers__item-image": props.image,
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewersListItemClass} onClick={()=>props.setInterviewer(props.name)}>

  <img
    className={interviewersListItemClass}
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.name}
</li>
  );
}