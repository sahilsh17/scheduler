import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  //transition function set mode to a new mode and then sets history
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

  //back function removes last element in newHistory array and then sets the previous mode
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