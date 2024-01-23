// ------------Context To Check if Feedback Modal is Open or Not----------------
import React, { createContext, useContext, useState } from "react";

const FeedbackModalContext = createContext();

const useFeedbackModalContext = () => {
  const context = useContext(FeedbackModalContext);
  if (!context) {
    throw new Error("useFeedbackModalContext must be used within a FeedbackModalContextProvider");
  }
  return context;
};

const FeedbackModalContextProvider = ({ children }) => {
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const value = {
    isFeedbackModalOpen,
    setFeedbackModalOpen,
  };

  return <FeedbackModalContext.Provider value={value}>{children}</FeedbackModalContext.Provider>;
};

export { FeedbackModalContext, useFeedbackModalContext, FeedbackModalContextProvider };
