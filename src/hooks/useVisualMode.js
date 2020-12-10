import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode,setMode] = useState(initial)
   const [history, setHistory] = useState([initial]);
 
  function transition(newValue,replace) {
   if(replace) {
     history.pop();
     history.push(newValue);
     setMode(newValue);
   } else {
   history.push(newValue);
   setMode(newValue);
   }
  }
  function back() {
    if(history.length < 2) {
      return;
    }
   history.pop();
    setMode(history.slice(-1)[0]);
  }
  return {mode,transition,back};
}