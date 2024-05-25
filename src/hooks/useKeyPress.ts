import { useCallback, useEffect } from "react";

function useKeyPress(
  targetKey: string,
  callback: () => void,
  ctrlKey: boolean = false
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((ctrlKey ? event.ctrlKey : true) && event.key === targetKey) {
        callback();
      }
    },
    [callback, ctrlKey, targetKey]
  );

  useEffect(() => {
    const document = window.document;
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, targetKey]);
}

export default useKeyPress;
