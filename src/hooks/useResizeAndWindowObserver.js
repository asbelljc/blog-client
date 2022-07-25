import { useState, useCallback, useRef, useEffect } from 'react';

export default function useWindowAndResizeObserver() {
  const [rect, setRect] = useState({});
  const observer = useRef(null);
  // WINDOW MOD
  const abortController = useRef(new AbortController());

  const callbackRef = useCallback((element) => {
    // If we don't have an element yet, we can't observe it
    if (!element) return;

    if (observer.current) {
      // If we already have an active observer, we need to stop observing the old element
      observer.current.disconnect();
      // WINDOW MOD
      abortController.current.abort();
    } else {
      // If we don't have an active observer, we need to instantiate one
      observer.current = new ResizeObserver(([entry]) => {
        setRect(entry.target.getBoundingClientRect());
      });
    }

    // Then we start observing the new element
    observer.current.observe(element);

    // WINDOW MOD
    window.addEventListener(
      'resize',
      () => {
        setRect(element.getBoundingClientRect());
      },
      { signal: abortController.current.signal }
    );
  }, []);

  // WINDOW MOD
  useEffect(() => {
    const controller = abortController.current;

    return () => controller.abort();
  }, []);

  return [callbackRef, rect];
}
