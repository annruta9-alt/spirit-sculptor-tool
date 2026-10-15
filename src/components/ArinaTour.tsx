import { useEffect, useRef, useState } from 'react';
import arina from '@/assets/arina-guide.png';
import room from '@/assets/room-clean.jpg';
import windows from '@/assets/windows-clean.jpg';
import entrance from '@/assets/entrance.asset.json';
import interior from '@/assets/interior.asset.json';

const scenes = [
  { img: entrance.url, kicker: '01 · Встреча', text: 'Здравствуйте! Я Арина. Проходите — двери АРКИ открыты.' },
  { img: room, kicker: '02 · Зал', text: '123 м² света и воздуха. Потолок — до 4,5 метра.' },
  { img: interior.url, kicker: '03 · Детали', text: 'Паркет, тёплый свет, спокойный ритм — всё для сосредоточенной работы.' },
  { img: windows, kicker: '04 · Вид из окна', text: 'А это моё любимое: два окна 4 × 3 м и Библиотека напротив.' },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ArinaTour() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / (r.height - window.innerHeight)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const pos = p * (scenes.length - 1);
  const active = Math.round(pos);
  // Arina walks from right to left across the tour, then steps aside at the window.
  const x = 30 - p * 55;
  const bob = Math.sin(pos * Math.PI * 2) * 6;

  return (
    <section ref={ref} className="tour" aria-label="Арина проводит экскурсию по пространству">
      <div className="tour-stage">
        {scenes.map((s, i) => {
          const d = pos - i;
          const opacity = clamp(1 - Math.abs(d));
          const scale = 1.12 - clamp(d + 1) * 0.12;
          return <img key={i} src={s.img} alt="" aria-hidden className="tour-bg" style={{ opacity, transform: `scale(${scale})` }} />;
        })}
        <div className="tour-shade" />
        <img src={arina} alt="Арина — хозяйка окна" width={768} height={1344} className="tour-arina" style={{ transform: `translateX(${x}vw) translateY(${bob}px)` }} />
        <div className="tour-caption" key={active}>
          <span className="eyebrow">{scenes[active].kicker}</span>
          <p>{scenes[active].text}</p>
        </div>
        <div className="tour-progress"><span style={{ transform: `scaleX(${p})` }} /></div>
      </div>
    </section>
  );
}
