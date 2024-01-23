// ----------Analytics Context to gather user analytics----------------------
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../components/utills/Cookies";
import axios from "axios";

const AnalyticsContext = createContext();

const useAnalyticsContext = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error("useAnalyticsContext must be used within an AnalyticsContextProvider");
    }
    return context;
};

const AnalyticsContextProvider = ({ children }) => {
    const [totalChats, setTotalChats] = useState(0);
    const [totalCalls, setTotalCalls] = useState(0);
    const [goalsSet, setGoalsSet] = useState(0);
    const [goalsAchieved, setGoalsAchieved] = useState(0);
    const [badges, setTotalBadges] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const token = getCookie("token");
            const response = await axios.get('http://localhost:5000/get-analytics', {
                headers: {
                    authorization: token
                }
            });
            setGoalsAchieved(response.data.goalsAchieved);
            setTotalChats(response.data.totalChats);
            setTotalCalls(response.data.totalCalls);
            setGoalsSet(response.data.goalsSet);
            setTotalBadges(response.data.badges);
            setTotalCosts(response.data.totalCosts);
        }
        fetchAnalyticsData();
    }, [])

    const value = {
        totalChats,
        setTotalChats,
        totalCalls,
        setTotalCalls,
        goalsSet,
        setGoalsSet,
        goalsAchieved,
        setGoalsAchieved,
        badges,
        setTotalBadges,
        totalCosts,
        setTotalCosts
    };

    return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export { AnalyticsContext, useAnalyticsContext, AnalyticsContextProvider };
