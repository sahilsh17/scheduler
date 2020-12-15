import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
 
  function transition(newValue, replace) {
    const newHistory = [...history];
    if (replace) {
      
      newHistory.pop();
      setMode(newValue);
      setHistory([...newHistory, newValue]);
    } else {
      setMode(newValue);
      setHistory([...newHistory, newValue]);
    }
  }
  function back() {
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);

    setHistory(newHistory);
  }
  return { mode, transition, back };
}