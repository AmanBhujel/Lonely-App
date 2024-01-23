import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getCookie } from "../../utills/Cookies";
import axios from "axios";

async function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...(await state), payload];
    case "update":
      return (await state).map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      try {
        const token = getCookie("token");
        const deletedEventId = payload._id;

        await axios.post("http://localhost:5000/delete-schedule", {
          id: deletedEventId
        }, {
          headers: {
            authorization: token,
            "Content-Type": "application/json"

          }
        });
        return (await state).filter((evt) => evt.id !== payload.id);

      } catch (error) {
        console.error("Error deleting event:", error);
      }

    default:
      throw new Error();
  }
}



async function initEvents() {
  const token = getCookie("token");

  try {
    const { data } = await axios.get("http://localhost:5000/get-schedule", {
      headers: {
        authorization: token
      }
    });

    return data.scheduleDays;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return [];
  }
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const fetchFilteredEvents = async () => {
    try {
      // Wait for savedEvents to be resolved
      console.log(savedEvents, "saved from fetch filtered");

      const resolvedEvents = await savedEvents;
      console.log(resolvedEvents, "response from here");
      console.log(labels, "labels from just");

      return resolvedEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.label)
      );
    } catch (error) {
      console.error("Error fetching and filtering events:", error);
      return [];
    }
  };




  const filteredEvents = useMemo(async () => {
    console.log("from memo", fetchFilteredEvents())
    return fetchFilteredEvents();
  }, [savedEvents, labels]);

  const fetchScheduleFromServer = async () => {
    try {
      const token = getCookie("token");
      const response = await axios.get("http://localhost:5000/get-schedule", {
        headers: {
          authorization: token
        }
      });
      const { data } = response;
      dispatchCalEvent({ type: "update", payload: data.scheduleDays });
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  fetchFilteredEvents().then((res) => {
    console.log(res, "from fetch promise")
  });

  useEffect(() => {
    fetchScheduleFromServer();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedEvents = await savedEvents;

      setLabels((prevLabels) => {
        console.log(resolvedEvents, "from labels set");
        return [...new Set(resolvedEvents.map((evt) => evt.label))].map(
          (label) => {
            console.log(label, "label from here set");
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    };

    fetchData();
    console.log(labels)
  }, [savedEvents]);


  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

