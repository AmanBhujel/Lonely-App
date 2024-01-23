// ---------------Call Context to Check if user is in Call or Not-------------------
import React, { createContext, useContext, useState } from "react";

const CallContext = createContext();

const useCallContext = () => {
    const context = useContext(CallContext);
    if (!context) {
        throw new Error("useCallContext must be used within a CallContextProvider");
    }
    return context;
};

const CallContextProvider = ({ children }) => {
    const [onCall, setOnCall] = useState(false);
    const [emotionArray, setEmotionArray] = useState([]);

    const value = {
        onCall,
        setOnCall,
        emotionArray,
        setEmotionArray
    };

    return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export { CallContext, useCallContext, CallContextProvider };
