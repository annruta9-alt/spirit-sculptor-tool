import { useEffect, useRef, useState } from 'react';
import { runLoader } from '@/lib/arka-logo';

export function Preloader() {
  const veil = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!veil.current || !stage.current) return;
    document.documentElement.classList.add('is-loading');
    const stop = runLoader(veil.current, stage.current, () => setDone(true));
    return () => { stop(); document.documentElement.classList.remove('is-loading'); };
  }, []);
  useEffect(() => { if (done) document.documentElement.classList.remove('is-loading'); }, [done]);
  if (done) return null;
  return <div ref={veil} className="veil" aria-label="Загрузка АРКА 123" role="status"><div ref={stage} className="veil-stage" /></div>;
}
