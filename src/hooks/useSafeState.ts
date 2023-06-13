import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import useDidMount from "./useDidMount";
import useWillUnmount from "./useWillUnmount";

const useSafeState = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>] => {
  const mountedRef = useRef(true);
  const [state, setState] = useState(initialState);

  const setSafeState = useCallback(
    (setStateAction: React.SetStateAction<S>) => {
      if (mountedRef.current) {
        setState(setStateAction);
      }
    },
    [],
  );

  useDidMount(() => {
    mountedRef.current = true;
  });

  useWillUnmount(() => {
    mountedRef.current = false;
  });

  return [state, setSafeState];
};

export default useSafeState;
