import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode,setMode] = useState(initial)
   const [history, setHistory] = useState([initial]);
 
  function transition(newValue,replace) {
   if(replace) {
     history.pop();
     setMode(newValue);
     setHistory([...history,newValue]);
   } else {
   setMode(newValue);
   setHistory(([...history,newValue]));
  }
  }
  function back() {
    if(history.length < 2) {
      return;
    }
   history.pop();
    setMode(history.slice(-1)[0]);

    // setHistory(prev => ([...prev, mode]));
  }
  return {mode,transition,back};
}