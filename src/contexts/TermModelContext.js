// ------------Context To Check if Terms Modal is Open or Not----------------
import React, { createContext, useContext, useState } from "react";

const TermModalContext = createContext();

const useTermModalContext = () => {
    const context = useContext(TermModalContext);
    if (!context) {
        throw new Error("useTermModalContext must be used within a TermModalContextProvider");
    }
    return context;
};

const TermModalContextProvider = ({ children }) => {
    const [isTermModalOpen, setTermModalOpen] = useState(false);

    const value = {
        isTermModalOpen,
        setTermModalOpen,
    };

    return <TermModalContext.Provider value={value}>{children}</TermModalContext.Provider>;
};

export { TermModalContext, useTermModalContext, TermModalContextProvider };
