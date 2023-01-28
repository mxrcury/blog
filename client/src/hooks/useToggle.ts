import { useCallback, useState } from "react";

interface IUseToggle {
  close: () => void;
  open: () => void;
  status: boolean;
}

export type ToggleElementType = IUseToggle

const useToggle = (): IUseToggle => {
  const [status, setStatus] = useState(false);
  // const [text, setText] = useState("");

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
