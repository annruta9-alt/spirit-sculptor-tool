import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Pause, Play, X, Armchair, Presentation, Table2, Columns3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import room from '@/assets/room-clean.jpg';
import windows from '@/assets/windows-clean.jpg';
import workshop from '@/assets/layout-workshop.jpg';
import shared from '@/assets/layout-shared.jpg';
import tables from '@/assets/layout-tables.jpg';
import entrance from '@/assets/entrance.asset.json';
import interior from '@/assets/interior.asset.json';
import tour from '@/assets/room-tour.mp4.asset.json';

const views = [
  { src: room, name: 'Общий вид', description: 'Свет, воздух и свободное пространство' },
  { src: windows, name: 'У арочных окон', description: 'Национальная библиотека — прямо перед вами' },
  { src: interior.url, name: 'Детали интерьера', description: 'Паркет, открытый потолок и линейный свет' },
  { src: entrance.url, name: 'Вход в пространство', description: 'Стеклянная перегородка со стороны галереи' },
] as const;
const layouts = [
  { name: 'Пустой зал', icon: Armchair, src: room, text: 'Пространство без расстановки', description: 'Открытый зал для ваших идей. Арочные окна, паркет и свободная планировка.' },
  { name: 'Мастер-класс', icon: Presentation, src: workshop, text: 'Презентация и обсуждение', description: 'Слушатели перед экраном, преподаватель рядом с презентацией. Свободный проход между зонами.' },
  { name: 'Общий стол', icon: Table2, src: shared, text: 'За одним столом', description: 'Общий стол для совместной работы, камерной встречи или творческого занятия.' },
  { name: 'Отдельные столы', icon: Columns3, src: tables, text: 'Работа в небольших группах', description: 'Несколько рабочих зон для практики, командных заданий и материалов.' },
] as const;

export function RoomViewer() {
  const [layout, setLayout] = useState(0);
  const [view, setView] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const selected = layouts[layout] ?? layouts[0];
  const currentView = views[view] ?? views[0];
  const image = layout === 0 ? currentView.src : selected.src;
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && layout === 0) {
      video.play().catch(() => setPlaying(false));
    } else video.pause();
  }, [playing, layout]);
  const changeView = (direction: number) => { setView(v => (v + direction + views.length) % views.length); setPlaying(false); };

  return <section id="space" className="room-section section-wrap">
    <div className="section-heading">
      <div><span className="eyebrow">01 / ПРОСТРАНСТВО</span><h2>Представьте себя здесь</h2></div>
      <p>Один зал. Много возможностей.<br />Найдите свой формат встречи.</p>
    </div>
    <div id="formats" className="layout-tabs" role="tablist" aria-label="Вариант расстановки">
      {layouts.map((item, index) => <Button key={item.name} variant="ghost" role="tab" aria-selected={layout === index} className={layout === index ? 'layout-tab selected' : 'layout-tab'} onClick={() => { setLayout(index); setPlaying(false); setView(0); }}><item.icon />{item.name}</Button>)}
    </div>
    <div className="viewer">
      <div className="viewer-image-wrap"><img key={image} className="viewer-image" src={image} alt={layout === 0 ? currentView.name : `Концепция: ${selected.name}`} />{layout === 0 && <video ref={videoRef} src={tour.url} poster={room} muted playsInline loop preload="metadata" className={playing ? 'room-video visible' : 'room-video'} aria-label="Видео пространства" onError={() => setPlaying(false)} />}</div>
      <div className="viewer-top"><span className="image-label"><span className="live-dot" />{layout === 0 ? (playing ? 'ВИДЕОВИЗУАЛИЗАЦИЯ ПО ФОТО' : 'РЕАЛЬНОЕ ПРОСТРАНСТВО') : 'КОНЦЕПЦИЯ РАССТАНОВКИ'}</span><Button size="icon" className="glass-button" title="Развернуть фотографию" aria-label="Развернуть фотографию" onClick={() => { setPlaying(false); setExpanded(true); }}><Maximize2 /></Button></div>
      <div className="viewer-bottom"><div><span className="viewer-number">{layout === 0 ? `0${view + 1} / 04` : 'ВАРИАНТ РАССТАНОВКИ'}</span><h3>{layout === 0 ? currentView.name : selected.text}</h3></div>
        {layout === 0 && <div className="viewer-controls"><Button className="glass-button play-control" onClick={() => { setView(0); setPlaying(p => !p); }} aria-label={playing ? 'Остановить видео' : 'Смотреть видео'}>{playing ? <Pause /> : <Play />}<span>{playing ? 'Пауза' : 'Видеообзор'}</span></Button><Button size="icon" className="glass-button" aria-label="Предыдущий ракурс" onClick={() => changeView(-1)}><ArrowLeft /></Button><Button size="icon" className="glass-button" aria-label="Следующий ракурс" onClick={() => changeView(1)}><ArrowRight /></Button></div>}
      </div>
    </div>
    <div className="viewer-caption"><p>{layout === 0 ? currentView.description : selected.description}</p><span>{layout === 0 ? (playing ? 'Анимация фотографии · не панорама 360°' : 'Фотообзор · 4 ракурса') : 'Визуализация · мебель и оборудование показаны как идея'}</span></div>
    {layout === 0 ? <div className="view-thumbnails">{views.map((item, index) => <Button key={item.name} variant="ghost" className={view === index ? 'thumbnail active' : 'thumbnail'} onClick={() => { setView(index); setPlaying(false); }} aria-label={`Показать: ${item.name}`}><img src={item.src} alt="" /><span><small>0{index + 1}</small>{item.name}</span></Button>)}</div> : <div className="concept-note"><span>Обратите внимание</span><p>Это возможный сценарий использования, а не фотография проведённого мероприятия. Комплектацию и количество мест нужно согласовать отдельно.</p></div>}
    <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="photo-dialog" aria-describedby={undefined}><DialogTitle className="sr-only">{layout === 0 ? currentView.name : selected.name}</DialogTitle><Button className="photo-close glass-button" size="icon" onClick={() => setExpanded(false)} aria-label="Закрыть фотографию"><X /></Button><img src={image} alt={layout === 0 ? currentView.name : `Концепция: ${selected.name}`} /></DialogContent></Dialog>
  </section>;
}