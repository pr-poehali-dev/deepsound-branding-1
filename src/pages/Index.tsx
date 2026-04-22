import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const STUDIO_IMAGE = "https://cdn.poehali.dev/projects/b7030c8f-8c46-411d-bfca-4cf486303403/files/0d16cb6f-167e-4452-974f-070876d27ae7.jpg";

const NAV_LINKS = [
  { id: "about", label: "О студии" },
  { id: "services", label: "Услуги" },
  { id: "prices", label: "Цены" },
  { id: "reviews", label: "Отзывы" },
  { id: "merch", label: "Мерч" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Mic", title: "Запись вокала", desc: "Профессиональные студийные микрофоны Neumann и AKG. Идеальная акустика для чистого звука." },
  { icon: "Music2", title: "Сведение", desc: "Балансировка треков, EQ, компрессия, реверб — создаём глубину и объём вашего звука." },
  { icon: "Radio", title: "Мастеринг", desc: "Финальная обработка для стриминга, CD и виниловых релизов с LUFS-нормализацией." },
  { icon: "Headphones", title: "Запись инструментов", desc: "Барабаны, бас, гитары, клавишные — полный студийный комплект под любой жанр." },
  { icon: "Layers", title: "Продакшн битов", desc: "Создание треков с нуля: от идеи до готового мастера вместе с нашими продюсерами." },
  { icon: "Video", title: "Запись подкастов", desc: "Студия оборудована для видео и аудио подкастов — монтаж и сведение в комплекте." },
];

const PRICES = [
  {
    name: "Базовый",
    price: "3 500",
    per: "час",
    color: "from-[#181818] to-[#111111]",
    popular: false,
    features: ["Запись голоса или инструмента", "Базовая обработка", "Сведение до 8 треков", "1 правка в подарок"],
  },
  {
    name: "Профи",
    price: "7 900",
    per: "сессия (4ч)",
    color: "from-[rgba(232,40,26,0.15)] to-[rgba(244,99,26,0.05)]",
    popular: true,
    features: ["Всё из базового", "Сведение без ограничений", "Мастеринг включён", "3 правки", "Референс-анализ"],
  },
  {
    name: "Альбом",
    price: "от 45 000",
    per: "проект",
    color: "from-[#181818] to-[#111111]",
    popular: false,
    features: ["Полный EP / LP (до 12 треков)", "Запись, сведение, мастеринг", "Фото и видео сессия", "Приоритетная поддержка", "Дистрибуция на платформы"],
  },
];

const REVIEWS = [
  { name: "Артём Власов", role: "Рэп-артист", text: "DEEPSOUND — единственная студия, где я могу оставаться собой. Звук получается живым и тёплым. Отдельное спасибо за терпение с моими многочисленными дублями.", avatar: "А" },
  { name: "Дарья Климова", role: "Поп-исполнитель", text: "После трёх лет работы с разными студиями наконец нашла своё место. Тут понимают с первого слова. Мой альбом звучит именно так, как я представляла.", avatar: "Д" },
  { name: "DJ Phantom", role: "Продюсер / DJ", text: "Записываю все свои релизы здесь уже 2 года. Мастеринг на уровне лучших европейских студий. Рекомендую без раздумий — ребята знают своё дело.", avatar: "P" },
  { name: "Иван Горев", role: "Рок-гитарист", text: "Записывали живые инструменты — барабаны, гитары, бас. Акустика в зале просто потрясающая. Звук на выходе — будто записывались в Abbey Road.", avatar: "И" },
];

const MERCH_ITEMS = [
  { name: "Худи DEEPSOUND", price: "4 990 ₽", tag: "Хит", emoji: "👕" },
  { name: "Футболка оверсайз", price: "2 490 ₽", tag: null, emoji: "👕" },
  { name: "Кепка Snapback", price: "1 990 ₽", tag: "Новинка", emoji: "🧢" },
  { name: "Тотальная сумка", price: "990 ₽", tag: null, emoji: "🛍" },
  { name: "Значки набор", price: "490 ₽", tag: null, emoji: "📎" },
  { name: "Стикерпак", price: "290 ₽", tag: "Новинка", emoji: "🎨" },
];

function WaveformBars() {
  const delays = [0, 0.15, 0.3, 0.45, 0.1, 0.25, 0.4, 0.05, 0.35, 0.2, 0.5, 0.12, 0.28, 0.42, 0.08, 0.22, 0.38, 0.55, 0.18, 0.32];
  const heights = [16, 28, 12, 32, 20, 36, 14, 24, 18, 30, 10, 22, 34, 16, 28, 20, 14, 32, 18, 26];
  return (
    <div className="flex items-end gap-[3px] h-10">
      {delays.map((delay, i) => (
        <div
          key={i}
          className="w-[3px] bg-[#f4631a] rounded-full animate-pulse-bar"
          style={{ animationDelay: `${delay}s`, height: `${heights[i]}px`, opacity: 0.5 + (i % 3) * 0.17 }}
        />
      ))}
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["contacts", "merch", "reviews", "prices", "services", "about", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#080808] text-[#f0f0f0] font-ibm min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#2a2a2a]" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-unbounded text-lg font-black tracking-wider text-[#f0f0f0]">
            DEEP<span className="text-[#f4631a]">SOUND</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-sm font-ibm tracking-wide transition-colors ${activeSection === link.id ? "text-[#f4631a]" : "text-[#c8c8c8] hover:text-[#f0f0f0]"}`}>
                {link.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("contacts")} className="hidden md:block bg-[#f4631a] text-[#080808] font-unbounded text-xs font-bold px-5 py-2.5 tracking-widest hover:bg-[#f0a020] transition-colors">
            ЗАПИСАТЬСЯ
          </button>
          <button className="md:hidden text-[#f0f0f0]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-[#2a2a2a] px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-[#c8c8c8] hover:text-[#f0f0f0] font-ibm text-base">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")} className="mt-2 bg-[#f4631a] text-[#080808] font-unbounded text-xs font-bold px-5 py-3 tracking-widest">
              ЗАПИСАТЬСЯ
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${STUDIO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <WaveformBars />
              <span className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase font-light">Студия звукозаписи</span>
            </div>
            <h1 className="font-unbounded text-6xl md:text-8xl font-black leading-none mb-6 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
              DEEP<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #f4631a" }}>SOUND</span>
            </h1>
            <p className="text-[#c8c8c8] font-ibm font-light text-lg md:text-xl leading-relaxed mb-10 max-w-lg animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
              Профессиональная студия звукозаписи в Москве. Место, где рождаются хиты.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
              <button onClick={() => scrollTo("contacts")} className="bg-[#f4631a] text-[#080808] font-unbounded text-xs font-bold px-8 py-4 tracking-widest hover:bg-[#f0a020] transition-all hover:scale-105 active:scale-95">
                ЗАПИСАТЬСЯ
              </button>
              <button onClick={() => scrollTo("services")} className="border border-[#2a2a2a] text-[#f0f0f0] font-unbounded text-xs font-bold px-8 py-4 tracking-widest hover:border-[#f4631a] hover:text-[#f4631a] transition-all">
                УСЛУГИ
              </button>
            </div>
            <div className="flex gap-10 mt-16 animate-fade-up" style={{ animationDelay: "0.9s", opacity: 0 }}>
              {[["8+", "лет опыта"], ["500+", "релизов"], ["200+", "артистов"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-unbounded text-2xl font-black text-[#f4631a]">{num}</div>
                  <div className="text-[#444444] text-sm font-ibm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[#444444]" />
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#f4631a] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(2).fill(null).map((_, i) => (
            <span key={i} className="font-unbounded text-[#080808] text-xs font-bold tracking-widest">
              {["ЗАПИСЬ", "СВЕДЕНИЕ", "МАСТЕРИНГ", "ПРОДАКШН", "ПОДКАСТЫ", "МЕРЧ"].map(w => (
                <span key={w} className="mr-12">★ {w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-[#f4631a]/30 -z-10" />
              <img src={STUDIO_IMAGE} alt="Студия DEEPSOUND" className="w-full aspect-[4/3] object-cover grayscale contrast-110" />
              <div className="absolute -bottom-4 -right-4 bg-[#f4631a] text-[#080808] font-unbounded text-xs font-bold px-4 py-2 tracking-widest">
                С 2016 ГОДА
              </div>
            </div>
          </RevealSection>
          <RevealSection>
            <div>
              <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">О студии</p>
              <h2 className="font-unbounded text-4xl md:text-5xl font-black leading-tight mb-6">
                МЫ СОЗДАЁМ<br />ЗВУКИ,<br />КОТОРЫЕ<br /><span className="text-[#f4631a]">СЛЫШАТ</span>
              </h2>
              <p className="text-[#c8c8c8] font-ibm font-light text-base leading-relaxed mb-6">
                DEEPSOUND — это не просто студия. Это пространство, где технологии встречаются с искусством. Мы работаем с артистами разных жанров — от андеграунда до мейнстрима.
              </p>
              <p className="text-[#c8c8c8] font-ibm font-light text-base leading-relaxed mb-8">
                Наше оборудование: Pro Tools HDX, консоль SSL 4000, мониторы Genelec 8351, преды Neve 1073. Всё это создаёт тот самый звук, который запоминается.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[["SSL 4000", "Консоль"], ["Pro Tools HDX", "DAW"], ["Neumann U87", "Микрофон"], ["Neve 1073", "Преамп"]].map(([name, type]) => (
                  <div key={name} className="border border-[#2a2a2a] p-4 hover:border-[#f4631a]/40 transition-colors">
                    <div className="text-[#f0f0f0] font-unbounded text-sm font-bold">{name}</div>
                    <div className="text-[#444444] text-xs mt-1">{type}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-[#111111] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">Что мы делаем</p>
              <h2 className="font-unbounded text-4xl md:text-5xl font-black">УСЛУГИ</h2>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2a]">
            {SERVICES.map((service) => (
              <RevealSection key={service.title}>
                <div className="bg-[#111111] p-8 hover:bg-[#181818] transition-colors group h-full">
                  <div className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center mb-6 group-hover:border-[#f4631a] transition-colors">
                    <Icon name={service.icon as "Mic"} size={20} className="text-[#f4631a]" />
                  </div>
                  <h3 className="font-unbounded text-sm font-bold tracking-wide mb-3 text-[#f0f0f0]">{service.title}</h3>
                  <p className="text-[#c8c8c8] font-ibm font-light text-sm leading-relaxed">{service.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-28 px-6 max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">Прозрачные условия</p>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black">ЦЕНЫ</h2>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICES.map((plan) => (
            <RevealSection key={plan.name}>
              <div className={`relative border ${plan.popular ? "border-[#f4631a]" : "border-[#2a2a2a]"} bg-gradient-to-b ${plan.color} p-8 flex flex-col h-full`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f4631a] text-[#080808] font-unbounded text-xs font-black px-4 py-1 tracking-widest whitespace-nowrap">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div className="mb-8">
                  <p className="text-[#444444] font-ibm text-xs tracking-[0.2em] uppercase mb-3">{plan.name}</p>
                  <div className="font-unbounded text-3xl font-black text-[#f0f0f0]">
                    {plan.price} <span className="text-[#444444] text-sm font-light">₽/{plan.per}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-[#c8c8c8] font-ibm text-sm">
                      <span className="text-[#f4631a] mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("contacts")}
                  className={`w-full font-unbounded text-xs font-bold py-3 tracking-widest transition-all hover:scale-105 active:scale-95 ${plan.popular ? "bg-[#f4631a] text-[#080808] hover:bg-[#f0a020]" : "border border-[#2a2a2a] text-[#f0f0f0] hover:border-[#f4631a] hover:text-[#f4631a]"}`}
                >
                  ВЫБРАТЬ
                </button>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-[#111111] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">Говорят наши артисты</p>
              <h2 className="font-unbounded text-4xl md:text-5xl font-black">ОТЗЫВЫ</h2>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <RevealSection key={review.name}>
                <div className="border border-[#2a2a2a] bg-[#181818] p-8 relative hover:border-[#f4631a]/30 transition-colors">
                  <div className="text-[#f4631a]/15 font-unbounded text-8xl font-black absolute top-4 right-6 leading-none select-none">"</div>
                  <p className="text-[#c8c8c8] font-ibm font-light text-base leading-relaxed mb-6 relative z-10">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#f4631a] text-[#080808] font-unbounded font-black text-sm flex items-center justify-center shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="text-[#f0f0f0] font-unbounded text-xs font-bold">{review.name}</div>
                      <div className="text-[#444444] text-xs font-ibm mt-0.5">{review.role}</div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#f4631a] text-xs">★</span>)}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section id="merch" className="py-28 px-6 max-w-7xl mx-auto">
        <RevealSection>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">Носи звук</p>
              <h2 className="font-unbounded text-4xl md:text-5xl font-black">МЕРЧ</h2>
            </div>
            <span className="text-[#444444] font-ibm text-sm">Скоро в продаже онлайн</span>
          </div>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#2a2a2a]">
          {MERCH_ITEMS.map((item) => (
            <RevealSection key={item.name}>
              <div className="bg-[#080808] p-6 md:p-8 hover:bg-[#111111] transition-colors group flex flex-col h-full">
                <div className="aspect-square bg-[#111111] border border-[#2a2a2a] mb-6 flex items-center justify-center group-hover:border-[#f4631a]/30 transition-colors">
                  <span className="text-4xl opacity-25 group-hover:opacity-50 transition-opacity">{item.emoji}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-unbounded text-xs font-bold text-[#f0f0f0] mb-2 leading-snug">{item.name}</h3>
                    <p className="text-[#f4631a] font-ibm font-light text-sm">{item.price}</p>
                  </div>
                  {item.tag && (
                    <span className="text-[#080808] bg-[#f4631a] font-unbounded text-xs font-bold px-2 py-1 shrink-0">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-[#111111] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <RevealSection>
              <div>
                <p className="text-[#f4631a] font-ibm text-xs tracking-[0.3em] uppercase mb-4">Напиши нам</p>
                <h2 className="font-unbounded text-4xl md:text-5xl font-black mb-6">
                  ЗАБРОНИРУЙ<br /><span className="text-[#f4631a]">СЕССИЮ</span>
                </h2>
                <p className="text-[#c8c8c8] font-ibm font-light text-base leading-relaxed mb-10">
                  Оставь заявку — мы свяжемся в течение часа и подберём удобное время.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: "MapPin", text: "Москва, ул. Звуковая, 12" },
                    { icon: "Phone", text: "+7 (999) 000-00-00" },
                    { icon: "Mail", text: "info@deepsound.ru" },
                    { icon: "Clock", text: "Пн–Вс: 10:00 — 04:00" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center shrink-0">
                        <Icon name={icon as "MapPin"} size={14} className="text-[#f4631a]" />
                      </div>
                      <span className="text-[#c8c8c8] font-ibm text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#444444] font-ibm text-xs tracking-wide uppercase block mb-2">Имя</label>
                    <input type="text" placeholder="Артём" className="w-full bg-[#181818] border border-[#2a2a2a] text-[#f0f0f0] font-ibm text-sm px-4 py-3 focus:outline-none focus:border-[#f4631a] transition-colors placeholder:text-[#444444]" />
                  </div>
                  <div>
                    <label className="text-[#444444] font-ibm text-xs tracking-wide uppercase block mb-2">Телефон</label>
                    <input type="tel" placeholder="+7 (999) ..." className="w-full bg-[#181818] border border-[#2a2a2a] text-[#f0f0f0] font-ibm text-sm px-4 py-3 focus:outline-none focus:border-[#f4631a] transition-colors placeholder:text-[#444444]" />
                  </div>
                </div>
                <div>
                  <label className="text-[#444444] font-ibm text-xs tracking-wide uppercase block mb-2">Услуга</label>
                  <select className="w-full bg-[#181818] border border-[#2a2a2a] text-[#c8c8c8] font-ibm text-sm px-4 py-3 focus:outline-none focus:border-[#f4631a] transition-colors appearance-none cursor-pointer">
                    <option value="">Выбери услугу...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[#444444] font-ibm text-xs tracking-wide uppercase block mb-2">Комментарий</label>
                  <textarea rows={4} placeholder="Расскажи о своём проекте..." className="w-full bg-[#181818] border border-[#2a2a2a] text-[#f0f0f0] font-ibm text-sm px-4 py-3 focus:outline-none focus:border-[#f4631a] transition-colors resize-none placeholder:text-[#444444]" />
                </div>
                <button type="submit" className="w-full bg-[#f4631a] text-[#080808] font-unbounded text-xs font-black py-4 tracking-widest hover:bg-[#f0a020] transition-all hover:scale-[1.02] active:scale-95">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2a2a2a] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-unbounded text-sm font-black">DEEP<span className="text-[#f4631a]">SOUND</span></span>
          <span className="text-[#444444] font-ibm text-xs">© 2024 DEEPSOUND. Все права защищены.</span>
          <div className="flex gap-6">
            {["VK", "TG", "YT"].map(s => (
              <button key={s} className="text-[#444444] hover:text-[#f4631a] font-unbounded text-xs font-bold transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
