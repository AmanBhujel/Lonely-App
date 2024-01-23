import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

//Schedule Page
function SchedulePage() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            <div className="w-full h-screen flex md:hidden items-center justify-center"
                        style={{
                            background: 'linear-gradient(to top right, #FAD4D4, #dfd5f6)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                <p className="text-lg font-bold text-center">Our Schedule feature is only available in bigger width devices.</p>
            </div>
            <div className="h-screen w-full hidden md:flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currenMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default SchedulePage;