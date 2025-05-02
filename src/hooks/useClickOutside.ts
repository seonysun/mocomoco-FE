import { useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

export default useClickOutside;
