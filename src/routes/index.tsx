import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, Check, Coffee, MapPin, MonitorPlay, Mic, Phone, Mail, Sparkles, Star, Sun, Camera, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoomViewer } from '@/components/RoomViewer';
import { ArinaTour } from '@/components/ArinaTour';
import { ArkaLogo } from '@/components/ArkaLogo';
import { Preloader } from '@/components/Preloader';
import windows from '@/assets/windows-clean.jpg';
import room from '@/assets/room-clean.jpg';
import workshop from '@/assets/layout-workshop.jpg';
import shared from '@/assets/layout-shared.jpg';
import tables from '@/assets/layout-tables.jpg';
import arina from '@/assets/arina-guide.png';
import entrance from '@/assets/entrance.asset.json';
import interior from '@/assets/interior.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'АРКА 123 — аренда зала для мастер-классов в Минске' },
    { name: 'description', content: 'Зал 123 м² с арочными окнами напротив Национальной библиотеки: мастер-классы, семинары, встречи. Тарифы, услуги, галерея и отзывы.' },
    { property: 'og:title', content: 'АРКА 123 — Встречаемся напротив Библиотеки' },
    { property: 'og:description', content: 'Светлый зал 123 м² с видом на Библиотеку для мастер-классов и семинаров в Минске.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const services = [
  { icon: MonitorPlay, title: 'Проектор и экран', text: 'Лазерный проектор, экран 3 м, HDMI и беспроводной показ.', price: '30 BYN / час' },
  { icon: Mic, title: 'Звук и микрофоны', text: 'Акустика на зал, два радиомикрофона, петличка для спикера.', price: '25 BYN / час' },
  { icon: Coffee, title: 'Кофе-брейк', text: 'Кофе, чай, вода и выпечка. Сервировка у арочных окон.', price: 'от 12 BYN / гость' },
  { icon: Armchair, title: 'Расстановка мебели', text: 'Театр, класс, общий стол или группы — подготовим к вашему приходу.', price: 'включено' },
  { icon: Camera, title: 'Фото и видео', text: 'Фотограф на мероприятие и короткий ролик для соцсетей.', price: 'от 150 BYN' },
  { icon: Sparkles, title: 'Администратор', text: 'Встретит гостей, поможет с техникой и порядком в зале.', price: '20 BYN / час' },
];

const tariffs = [
  { name: 'Час', price: '90', unit: 'BYN / час', items: ['от 2 часов', 'до 40 гостей', 'Wi-Fi и климат-контроль', 'Базовая мебель'] },
  { name: 'Полдня', price: '320', unit: 'BYN / 4 часа', featured: true, items: ['4 часа в зале', 'Проектор и звук включены', 'Любая расстановка', 'Вода и чай для гостей'] },
  { name: 'Весь день', price: '590', unit: 'BYN / 9 часов', items: ['9 часов в зале', 'Вся техника включена', 'Администратор на месте', 'Зона кофе-брейка'] },
];

const reviews = [
  { name: 'Ольга К.', role: 'Мастер-класс по акварели', text: 'Свет из окон — лучший помощник художника. Ученики не хотели уходить, а вид на Библиотеку попал в половину работ.' },
  { name: 'Дмитрий С.', role: 'Семинар для команды', text: 'Проектор, звук, кофе — всё было готово к нашему приходу. Высокий потолок, легко дышится даже на восьмичасовом интенсиве.' },
  { name: 'Анна В.', role: 'Встреча книжного клуба', text: 'Встречаться напротив Библиотеки — это отдельное удовольствие. Уютно, стильно и очень удобно добираться.' },
];

const gallery = [
  { src: windows, alt: 'Арочные окна на закате' },
  { src: room, alt: 'Зал целиком' },
  { src: interior.url, alt: 'Паркет и детали' },
  { src: workshop, alt: 'Концепция: мастер-класс' },
  { src: entrance.url, alt: 'Вход в пространство' },
  { src: shared, alt: 'Концепция: общий стол' },
  { src: tables, alt: 'Концепция: группы' },
];

function Index() {
  return <main>
    <Preloader />
    <header className="site-header">
      <a href="#top" aria-label="АРКА 123 — наверх"><ArkaLogo id="hd" className="header-logo" /></a>
      <nav aria-label="Основная навигация"><a href="#about">Об АРКА 123</a><a href="#space">Помещение</a><a href="#services">Услуги</a><a href="#gallery">Галерея</a><a href="#tariffs">Тарифы</a><a href="#reviews">Отзывы</a></nav>
      <Button asChild className="header-cta"><a href="#tariffs">Забронировать<ArrowUpRight /></a></Button>
    </header>

    <section className="hero" id="top">
      <img src={windows} alt="Арочные окна АРКА 123 с видом на Национальную библиотеку Беларуси" className="hero-photo" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="hero-eyebrow"><span />ПРОСТРАНСТВО ДЛЯ МАСТЕР-КЛАССОВ И СЕМИНАРОВ</span>
        <h1>АРКА 123</h1>
        <ArkaLogo id="hr" className="hero-logo" />
        <p className="hero-description">Светлый зал 123 м² в Минске с арочными окнами 4 × 3,5 м<br />и видом на Национальную библиотеку.</p>
        <Button asChild size="lg" className="hero-cta"><a href="#tour">Пройти с Ариной<ArrowUpRight /></a></Button>
      </div>
      <div className="hero-bottom"><span><MapPin size={15} />Минск, ул. Мстиславца, 10</span><a href="#about" aria-label="Листать вниз"><ArrowDown size={18} /></a><span className="hero-bottom-right">ВСТРЕЧАЕМСЯ НАПРОТИВ БИБЛИОТЕКИ</span></div>
    </section>

    <section className="facts section-wrap" aria-label="Особенности помещения"><div><strong>123<span>м²</span></strong><p>пространства для идей</p></div><div><strong>4,5<span>м</span></strong><p>высота потолка — до</p></div><div><strong>2<span>арки</span></strong><p>окна 4 × 3,5 м</p></div><div className="fact-view"><Sun /><p>Естественный свет<br /><span>и вид на Библиотеку</span></p></div></section>

    <section id="about" className="block section-wrap">
      <div className="about-grid">
        <img src={arina} alt="Арина — хозяйка окна, фирменный герой АРКА 123" width={768} height={1344} loading="lazy" style={{ objectFit: 'contain', background: 'var(--surface-soft)' }} />
        <div className="about-text">
          <span className="eyebrow">01 / ОБ АРКА 123</span>
          <h2 className="block-head" style={{ display: 'block', fontSize: 'clamp(30px,3.4vw,44px)', fontWeight: 700, margin: '12px 0 24px' }}>Арка — это окно и проход</h2>
          <p className="lead">Два высоких дома соединены аркой, и через неё с променада открывается вид на Библиотеку.</p>
          <p>Наш зал повторяет эту идею: огромные арочные окна, свет весь день и тот самый вид. 123 — это площадь в квадратных метрах, где хватает места и спикеру, и слушателям, и кофе-брейку.</p>
          <p>Гостей встречает Арина — хозяйка окна. Вместо лица у неё арка с видом на Библиотеку: она всегда смотрит туда же, куда и вы.</p>
          <div className="about-points"><div><strong>до 40 гостей</strong>в формате театра</div><div><strong>5 минут</strong>от метро «Восток»</div><div><strong>Свет весь день</strong>окна на юго-запад</div><div><strong>Всё включено</strong>техника и мебель</div></div>
        </div>
      </div>
    </section>

    <div id="tour"><ArinaTour /></div>
    <RoomViewer />

    <section id="services" className="services block">
      <div className="section-wrap">
        <div className="block-head"><div><span className="eyebrow">03 / НАШИ УСЛУГИ И ЦЕНЫ</span><h2>Всё, чтобы вы думали только о встрече</h2></div><p>Добавьте к аренде то, что нужно вашему мероприятию. Остальное мы подготовим сами.</p></div>
        <div className="service-list">{services.map(s => <article key={s.title} className="service"><s.icon size={26} /><h3>{s.title}</h3><p>{s.text}</p><span className="price">{s.price}</span></article>)}</div>
      </div>
    </section>

    <section id="gallery" className="block section-wrap">
      <div className="block-head"><div><span className="eyebrow">04 / ФОТОГАЛЕРЕЯ</span><h2>Свет, воздух и вид</h2></div><p>Реальные фотографии зала и концепции расстановки под разные форматы.</p></div>
      <div className="gallery">{gallery.map(g => <figure key={g.alt}><img src={g.src} alt={g.alt} loading="lazy" /><figcaption>{g.alt}</figcaption></figure>)}</div>
    </section>

    <section id="tariffs" className="block section-wrap">
      <div className="block-head"><div><span className="eyebrow">05 / ТАРИФЫ И УСЛУГИ</span><h2>Выберите своё время</h2></div><p>Цены указаны за весь зал. Для регулярных занятий — скидка до 20%.</p></div>
      <div className="tariffs">{tariffs.map(t => <article key={t.name} className={t.featured ? 'tariff featured' : 'tariff'}><h3>{t.name}</h3><div className="price">{t.price} <small>{t.unit}</small></div><ul>{t.items.map(i => <li key={i}><Check size={16} />{i}</li>)}</ul><Button asChild variant={t.featured ? 'default' : 'outline'}><a href="tel:+375290000123">Забронировать</a></Button></article>)}</div>
      <p className="price-note">Утро буднего дня до 12:00 — минус 15%. Вечер пятницы и выходные — по запросу.</p>
    </section>

    <section id="reviews" className="reviews block">
      <div className="section-wrap">
        <div className="block-head"><div><span className="eyebrow">06 / ОТЗЫВЫ</span><h2>Нам доверяют встречи</h2></div><p>Что говорят те, кто уже провёл у нас занятия.</p></div>
        <div className="review-grid">{reviews.map(r => <figure key={r.name} className="review"><div className="stars">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={15} fill="currentColor" />)}</div><blockquote>«{r.text}»</blockquote><footer><span className="avatar">{r.name[0]}</span><span><strong>{r.name}</strong>{r.role}</span></footer></figure>)}</div>
      </div>
    </section>

    <footer className="site-footer">
      <div className="footer-inner section-wrap">
        <div><ArkaLogo id="ft" className="footer-logo" /></div>
        <div><h4>КОНТАКТЫ</h4><ul><li><a href="tel:+375290000123"><Phone size={14} style={{ display: 'inline', marginRight: 8 }} />+375 29 000-01-23</a></li><li><a href="mailto:hello@arka123.by"><Mail size={14} style={{ display: 'inline', marginRight: 8 }} />hello@arka123.by</a></li><li><MapPin size={14} style={{ display: 'inline', marginRight: 8 }} />Минск, ул. Мстиславца, 10</li></ul></div>
        <div><h4>РАЗДЕЛЫ</h4><ul><li><a href="#about">Об АРКА 123</a></li><li><a href="#space">Наше помещение</a></li><li><a href="#services">Услуги и цены</a></li><li><a href="#tariffs">Тарифы</a></li><li><a href="#reviews">Отзывы</a></li></ul></div>
      </div>
      <div className="footer-bottom section-wrap"><span>© 2026 АРКА 123</span><span>Встречаемся напротив Библиотеки.</span></div>
    </footer>
  </main>;
}
