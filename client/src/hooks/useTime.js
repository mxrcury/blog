import { useState } from "react";

const useTime = () => {
  // const [currentTime, setCurrentTime] = useState(null);

  const getCurrentDateInISO = (date) => {
    const currentDate = new date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentTimeToISO = `${
      currentDay < 10 ? `0${currentDay}` : currentDay
    }-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-${currentYear}`;
    return currentTimeToISO;
  };

  return {
    getCurrentDateInISO,
  };
};

export default useTime;
