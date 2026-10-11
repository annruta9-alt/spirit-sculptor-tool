import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, MapPin, Sun, MoveUpRight, PanelsTopLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoomViewer } from '@/components/RoomViewer';
import windows from '@/assets/windows-clean.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'АРКА 123 — пространство напротив Библиотеки' },
    { name: 'description', content: 'Исследуйте пространство АРКА 123 в Минске: 123 м², арочные окна и варианты расстановки для мастер-классов и встреч.' },
    { property: 'og:title', content: 'АРКА 123 — пространство для ваших встреч' },
    { property: 'og:description', content: 'Фотообзор зала и концепции расстановки. Встречаемся напротив Национальной библиотеки.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  return <main>
    <header className="site-header"><a href="#" className="brand" aria-label="АРКА 123 — главная"><span className="arch-mark">123</span><span>АРКА<span className="brand-number">123</span></span></a><nav aria-label="Основная навигация"><a href="#space">Пространство</a><a href="#formats">Форматы встреч</a><a href="#view">Вид из окна</a></nav><span className="header-location"><MapPin size={15} />Минск</span><Button asChild variant="outline" className="header-cta"><a href="#space">Заглянуть внутрь<ArrowUpRight /></a></Button></header>
    <section className="hero">
      <img src={windows} alt="Арочные окна АРКА 123 с видом на Национальную библиотеку Беларуси" className="hero-photo" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content"><span className="hero-eyebrow"><span />ПРОСТРАНСТВО ДЛЯ ВАШИХ ВСТРЕЧ</span><h1>АРКА 123</h1><p className="hero-tagline">Встречаемся<br />напротив Библиотеки.</p><p className="hero-description">Светлое пространство в Минске<br />для мастер-классов, семинаров и ваших идей.</p><Button asChild size="lg" className="hero-cta"><a href="#space">Посмотреть пространство<ArrowUpRight /></a></Button></div>
      <div className="hero-bottom"><span><MapPin size={15} />Минск · Национальная библиотека</span><a href="#space" aria-label="Перейти к обзору пространства"><ArrowDown size={18} /></a><span className="hero-bottom-right">МЕСТО, КОТОРОЕ ВДОХНОВЛЯЕТ</span></div>
      <div className="hero-side">СВЕТ / ПРОСТРАНСТВО / ВСТРЕЧИ</div>
    </section>
    <section className="facts section-wrap" aria-label="Особенности помещения"><div><strong>123<span>м²</span></strong><p>пространства для идей</p></div><div><strong>4,5<span>м</span></strong><p>высота потолка — до</p></div><div><strong>2<span>арки</span></strong><p>огромных окна 4 × 3 м</p></div><div className="fact-view"><Sun /><p>Естественный свет<br /><span>и вид на Библиотеку</span></p></div></section>
    <RoomViewer />
    <section id="view" className="window-section section-wrap"><div className="section-heading"><div><span className="eyebrow">02 / ВИД ИЗ ОКНА</span><h2>Вдохновение за окном</h2></div><p>Та самая Библиотека.<br />Тот самый свет.</p></div><div className="window-photo"><img src={windows} alt="Национальная библиотека через два арочных окна на закате" loading="lazy" /><span><MapPin size={17} />Национальная библиотека Беларуси</span></div><div className="window-details"><div><PanelsTopLeft /><h3>Арочные окна</h3><p>Два окна размером 4 × 3 метра.<br />Город становится частью пространства.</p></div><div><Sun /><h3>Естественный свет</h3><p>Дневной свет и тёплые оттенки заката.<br />У каждой встречи своё настроение.</p></div><div><MoveUpRight /><h3>Воздух и высота</h3><p>Открытый потолок высотой до 4,5 метра.<br />Свобода для новых идей.</p></div></div></section>
    <footer className="site-footer section-wrap"><a href="#" className="footer-brand">АРКА 123</a><span>Встречаемся напротив Библиотеки.</span><a href="#space">Вернуться в пространство<ArrowUpRight size={16} /></a></footer>
  </main>;
}
