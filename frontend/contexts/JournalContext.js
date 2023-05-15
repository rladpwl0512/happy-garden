import React, { createContext, useState } from "react";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [thanks, setThanks] = useState([""]);
  const [selectedMood, setSelectedMood] = useState("");
  const [journalText, setJournalText] = useState("");
  const [counsellingAnswer, setCounsellingAnswer] = useState("");

  const addThanksItem = () => {
    setThanks([...thanks, ""]);
  };

  const updateThanks = (idx, text) => {
    const newThanks = [...thanks];
    newThanks[idx] = text;
    setThanks(newThanks);
  };

  const deleteThanksItem = (idx) => {
    const newThanks = [...thanks];
    newThanks.splice(idx, 1);
    setThanks(newThanks);
  };

  const updateSelectedMood = (mood) => {
    setSelectedMood(mood);
  };

  const updateJournalText = (text) => {
    setJournalText(text);
  };

  const updateCounsellingAnswer = (text) => {
    setCounsellingAnswer(text);
  };

  return (
    <JournalContext.Provider
      value={{
        thanks,
        addThanksItem,
        updateThanks,
        deleteThanksItem,
        selectedMood,
        updateSelectedMood,
        journalText,
        updateJournalText,
        counsellingAnswer,
        updateCounsellingAnswer,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
