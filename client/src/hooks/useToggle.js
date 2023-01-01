import { useCallback, useState } from "react";

const useToggle = () => {
  const [status, setStatus] = useState(false);
  const [text, setText] = useState("");

  const close = useCallback(() => {
    setStatus(false);
  }, [setStatus]);
  const open = useCallback(() => {
    setStatus(true);
  }, [setStatus]);

  return {
    close,
    open,
    status,
  };
};

export default useToggle;
