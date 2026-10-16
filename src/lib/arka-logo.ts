import P from './arka-paths.json';

// Ported from the client's logo animation file: vector logo, hover glint and loader.
export function logoSVG(id: string, o: { mark?: boolean; fill?: boolean; hov?: boolean } = {}) {
  const { mark = false, fill = false, hov = false } = o;
  const vb = mark ? '220 197 420 483' : '215 195 1350 490';
  const digits = `<g class="dg"><path d="${P.d1}"/></g><g class="dg"><path d="${P.d2}"/></g><g class="dg"><path d="${P.d3}"/></g>`;
  const ring = 'M246 657V405A184.5 184.5 0 0 1 615 405V657Z';
  const text = mark ? '' : `<g class="tt" clip-path="url(#${id}-tb)">${(P.title as string[]).map(d => `<path class="tg" d="${d}"/>`).join('')}</g>
    <g class="sl"><g clip-path="url(#${id}-s1)"><path class="sg" d="${P.s1}"/></g><g clip-path="url(#${id}-s2)"><path class="sg" d="${P.s2}"/></g></g>`;
  const fillLayer = fill ? `<g clip-path="url(#${id}-if)"><rect class="fr" x="240" y="656" width="382" height="0" fill="currentColor"/></g>
      <g clip-path="url(#${id}-in)"><g clip-path="url(#${id}-fw)"><g class="wd" fill="var(--on)"><path d="${P.d1}"/><path d="${P.d2}"/><path d="${P.d3}"/></g></g></g>` : '';
  return `<svg class="arka${hov ? ' hov' : ''}" viewBox="${vb}" role="img" aria-label="АРКА 123. Встречаемся напротив Библиотеки." fill="currentColor" fill-rule="evenodd">
  <defs>
    <clipPath id="${id}-in"><path d="M262 644V403A169 169 0 0 1 600 403V644Z"/></clipPath>
    <clipPath id="${id}-if"><path d="M251 656V403A180 180 0 0 1 611 403V656Z"/></clipPath>
    <clipPath id="${id}-fw"><rect class="fw" x="200" y="644" width="460" height="0"/></clipPath>
    <clipPath id="${id}-tb"><rect x="660" y="335" width="900" height="170"/></clipPath>
    <clipPath id="${id}-s1"><rect x="660" y="520" width="900" height="80"/></clipPath>
    <clipPath id="${id}-s2"><rect x="660" y="600" width="900" height="75"/></clipPath>
    <mask id="${id}-fm" maskUnits="userSpaceOnUse" x="150" y="150" width="600" height="600"><path class="fm" pathLength="1" d="${ring}" fill="none" stroke="#fff" stroke-width="64" stroke-linecap="square" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask>
    <mask id="${id}-cm" maskUnits="userSpaceOnUse" x="150" y="150" width="600" height="600"><path class="cm" pathLength="1" d="${ring}" fill="none" stroke="#fff" stroke-width="64" stroke-dasharray="0.16 2" stroke-dashoffset="0.16"/></mask>
  </defs>
  <g class="mk" fill="currentColor">
    <g mask="url(#${id}-fm)"><path d="${P.frame}"/></g>
    ${hov ? `<g mask="url(#${id}-cm)" fill="var(--brand-gold)"><path d="${P.frame}"/></g>` : ''}
    <g clip-path="url(#${id}-in)">${digits}</g>
    ${fillLayer}
  </g>
  ${text}
</svg>`;
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t: number, a: number, d: number) => clamp((t - a) / d);
const eo3 = (x: number) => 1 - Math.pow(1 - x, 3);
const eio3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eio2 = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

type S = { frame: number; dg: number[]; fill: number; wd: number; dx: number; tg: number[]; sg: number[]; text: number };

export function runLoader(veil: HTMLElement, stage: HTMLElement, done: () => void) {
  let pageReady = document.readyState === 'complete';
  const onLoad = () => { pageReady = true; };
  addEventListener('load', onLoad);
  stage.innerHTML = logoSVG('ld', { fill: true }) + '<p class="count"><span>0</span> м²</p>';
  const svg = stage.querySelector('svg') as SVGSVGElement;
  const count = stage.querySelector('.count') as HTMLElement;
  const n = count.querySelector('span') as HTMLElement;
  const q = <T extends Element>(s: string) => svg.querySelector(s) as T;
  const qa = (s: string) => [...svg.querySelectorAll<SVGElement>(s)];
  const r = { fm: q<SVGElement>('.fm'), fr: q<SVGElement>('.fr'), fw: q<SVGElement>('.fw'), wd: q<SVGElement>('.wd'), dg: qa('.dg'), tg: qa('.tg'), sg: qa('.sg'), mk: q<SVGElement>('.mk'), tt: q<SVGElement>('.tt'), sl: q<SVGElement>('.sl') };
  const apply = (s: S) => {
    r.fm.style.visibility = s.frame <= 0.001 ? 'hidden' : 'visible';
    r.fm.setAttribute('stroke-dashoffset', String(1 - s.frame));
    r.dg.forEach((g, i) => (g.style.transform = `translateY(${(1 - (s.dg[i] ?? 1)) * 280}px)`));
    const y = 656 - s.fill * 434, h = s.fill > 0 ? s.fill * 434 + 2 : 0;
    [r.fr, r.fw].forEach(el => { el.setAttribute('y', String(y)); el.setAttribute('height', String(h)); });
    r.wd.style.opacity = String(s.wd);
    r.mk.setAttribute('transform', `translate(${s.dx} 0)`);
    r.tg.forEach((g, i) => (g.style.transform = `translateY(${(1 - (s.tg[i] ?? 1)) * 180}px)`));
    r.sg.forEach((g, i) => (g.style.transform = `translateY(${(1 - (s.sg[i] ?? 1)) * 90}px)`));
    r.tt.style.opacity = r.sl.style.opacity = String(s.text);
  };
  let raf = 0;
  const finish = () => { removeEventListener('load', onLoad); done(); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply({ frame: 1, dg: [1, 1, 1], fill: 1, wd: 1, dx: 0, tg: [1, 1, 1, 1, 1, 1], sg: [1, 1], text: 1 });
    veil.style.transition = 'opacity .5s';
    const a = setTimeout(() => (veil.style.opacity = '0'), 700), b = setTimeout(finish, 1300);
    return () => { clearTimeout(a); clearTimeout(b); };
  }
  svg.style.transformOrigin = `${((431 - 215) / 1350) * 100}% ${((430 - 195) / 490) * 100}%`;
  let t0: number | null = null, tDone: number | null = null, Smax = 1;
  const measure = () => {
    const b = svg.getBoundingClientRect(), k = b.width / 1350;
    const cx = b.left + (431 - 215) * k, cy = b.top + (430 - 195) * k;
    Smax = 1.25 * Math.max(Math.max(cx, innerWidth - cx) / (169 * k), Math.max(cy, innerHeight - cy) / (205 * k));
  };
  const tick = (now: number) => {
    if (t0 === null) t0 = now;
    const t = now - t0;
    let fp = eio2(seg(t, 1300, 1700));
    if (!pageReady) fp = Math.min(fp, 0.9);
    if (fp >= 1 && tDone === null) { tDone = t; measure(); }
    const u = tDone === null ? -1 : t - tDone, o = u >= 0;
    apply({
      frame: eio3(seg(t, 150, 900)),
      dg: [0, 1, 2].map(i => eo3(seg(t, 700 + i * 150, 550))),
      fill: fp,
      wd: o ? 1 - seg(u, 2700, 500) : 1,
      dx: o ? 460 * (1 - eio3(seg(u, 250, 700))) : 460,
      tg: [0, 1, 2, 3, 4, 5].map(i => (o ? eo3(seg(u, 600 + i * 70, 600)) : 0)),
      sg: [0, 1].map(j => (o ? eo3(seg(u, 1050 + j * 120, 650)) : 0)),
      text: o ? 1 - seg(u, 2300, 350) : 1,
    });
    n.textContent = String(Math.round(123 * fp));
    count.style.opacity = String(seg(t, 1200, 300) * (o ? 1 - seg(u, 100, 300) : 1));
    if (o) {
      svg.style.transform = `scale(${Math.pow(Smax, eio3(seg(u, 2300, 1200)))})`;
      veil.style.background = `color-mix(in oklab, var(--primary) ${100 * seg(u, 2800, 500)}%, var(--background))`;
      veil.style.opacity = String(1 - seg(u, 3400, 500));
    }
    if (u >= 3900) { finish(); return; }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); removeEventListener('load', onLoad); };
}
