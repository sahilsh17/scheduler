import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
export default function DayListItem(props) {
  const DayListItemClass = classNames('day-list__item --selected',{
   'day-list__item--selected': props.selected,
   'day-list__item--full': props.spots === 0
  });
  
  return (
    <li className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3 >{props.spots}</h3>
    </li>
  );
}