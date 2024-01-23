import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetchFilteredEvents=async()=>{
      filteredEvents.then((res)=>{
        const events = res.filter(
          (evt) =>
            dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
      })
    }
    fetchFilteredEvents();
  }, [filteredEvents, day]);

  // useEffect(() => {
  //   const events = filteredEvents.filter(
  //     (evt) =>
  //       dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  //   );
  //   setDayEvents(events);
  // }, [filteredEvents, day]);
  
  // useEffect(() => {
  //   const fetchFilteredEvents = async () => {
  //     try {
  //       const resolvedEvents =  filteredEvents;
  //       const events = resolvedEvents.filter(
  //         (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  //       );
  //       setDayEvents(events);
  //     } catch (error) {
  //       console.error("Error fetching and filtering events:", error);
  //     }
  //   };

  //   fetchFilteredEvents();
  // }, [filteredEvents, day]);
  

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
