import { useEffect, useState } from 'react';

/** True when viewport is wide enough and input is likely mouse (not primary touch). */
export function usePrefersFinePointer() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setOk(mq.matches && !reduced.matches);
    apply();
    mq.addEventListener('change', apply);
    reduced.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      reduced.removeEventListener('change', apply);
    };
  }, []);

  return ok;
}
