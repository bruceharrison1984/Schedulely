import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useRect = <T extends Element>(): [
  DOMRect | undefined,
  MutableRefObject<T | null>
] => {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<DOMRect>();

  const set = () => setRect(ref.current?.getBoundingClientRect());

  useEffect(() => {
    set();
    window.addEventListener('resize', set, false);
    return () => window.removeEventListener('resize', set, false);
  }, []);

  return [rect, ref];
};
