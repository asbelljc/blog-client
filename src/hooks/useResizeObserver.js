import { useState, useEffect, useRef } from 'react';

export default function useResizeObserver(ref) {
  const [rect, setRect] = useState({});
  const observer = useRef(null);

  const cleanObserver = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    const ob = (observer.current = new ResizeObserver(([entry]) => {
      setRect(entry.target.getBoundingClientRect());
    }));

    ob.observe(ref.current);

    return () => {
      cleanObserver();
    };
  }, [ref]);

  return rect;
}
