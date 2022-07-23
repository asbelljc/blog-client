import { useState, useRef, useCallback } from 'react';

export default function useResizeObserver() {
  const [rect, setRect] = useState({});
  const observer = useRef(null);

  const callbackRef = useCallback((element) => {
    // If we don't have an element yet, we can't observe it
    if (!element) return;

    if (observer.current) {
      // If we already have an active observer, we need to stop observing the old element
      observer.current.disconnect();
    } else {
      // If we don't have an active observer, we need to instantiate one
      observer.current = new ResizeObserver(([entry]) => {
        setRect(entry.target.getBoundingClientRect());
      });
    }

    // Then we start observing the new element
    observer.current.observe(element);
  }, []);

  return [callbackRef, rect];
}
