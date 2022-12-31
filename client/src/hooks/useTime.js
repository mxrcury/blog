const { useState } = require("react");

const useTime = () => {
  const [currentTime, setCurrentTime] = useState(null);

  const getCurrentTimeInISO = (time) => {
    const currentTime = new time();
    const currentTimeToISO = `${currentTime.getDate()}-${currentTime.getMonth()}-${currentTime.getFullYear()}`;
    return currentTimeToISO;
  };

  return {
    getCurrentTimeInISO,
  };
};

export default useTime;
