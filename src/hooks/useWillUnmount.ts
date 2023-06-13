import { useEffect, useRef } from "react";

const useWillUnmount = (unmountCb: () => void) => {
  const unmountCbRef = useRef(unmountCb);
  unmountCbRef.current = unmountCb;

  useEffect(
    () => () => {
      unmountCbRef.current?.();
    },
    [],
  );
};

export default useWillUnmount;
