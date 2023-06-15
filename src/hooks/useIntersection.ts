import "intersection-observer";
import { RefObject, useEffect } from "react";
import useSafeState from "./useSafeState";

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
): IntersectionObserverEntry | null => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useSafeState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && IntersectionObserver) {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
  }, [ref.current, options?.threshold, options?.root, options?.rootMargin]);

  return intersectionObserverEntry;
};

export default useIntersection;
