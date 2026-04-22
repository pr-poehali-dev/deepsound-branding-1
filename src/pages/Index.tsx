import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const STUDIO_IMAGE = "https://cdn.poehali.dev/projects/b7030c8f-8c46-411d-bfca-4cf486303403/files/82ba4418-3148-4b55-a8a0-2ef9650f0526.jpg";

const NAV_LINKS = [
  { id: "about", label: "О студии" },
  { id: "services", label: "Услуги" },
  { id: "prices", label: "Цены" },
  { id: "reviews", label: "Отзывы" },
  { id: "merch", label: "Мерч" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Mic", title: "Запись вокала", desc: "Neumann U87, Rode NT1 — чистое звукоизолированное пространство для точного звука без артефактов." },
  { icon: "Sliders", title: "Сведение", desc: "Балансировка, EQ, компрессия, пространственная обработка. Каждый инструмент — на своём месте." },
  { icon: "Disc3", title: "Мастеринг", desc: "Финальная нормализация для стриминга, CD и цифровых платформ. LUFS, True Peak, динамика." },
  { icon: "Guitar", title: "Живые инструменты", desc: "Барабаны, бас, гитары, клавишные. Живой зал с настраиваемой акустикой." },
  { icon: "Cpu", title: "Продакшн", desc: "Написание и создание битов с нуля совместно с резидентными продюсерами студии." },
  { icon: "Podcast", title: "Подкасты и Voice-over", desc: "Профессиональная запись голоса для подкастов, аудиокниг и рекламных проектов." },
];

const PRICES = [
  {
    name: "Запись",
    price: "3 500",
    per: "час",
    popular: false,
    features: ["Запись голоса или инструмента", "Мониторинг в реальном времени", "Базовая обработка", "1 файл на выходе"],
  },
  {
    name: "Сессия",
    price: "7 900",
    per: "4 часа",
    popular: true,
    features: ["Запись + сведение", "До 24 треков", "Мастеринг включён", "3 правки", "WAV + MP3 форматы"],
  },
  {
    name: "Проект",
    price: "от 45 000",
    per: "EP / LP",
    popular: false,
    features: ["До 12 треков полного цикла", "Запись, сведение, мастеринг", "Арт-сессия для обложки", "Дистрибуция на платформы", "Поддержка 30 дней"],
  },
];

const REVIEWS = [
  { name: "Артём Власов", role: "Артист", text: "Очень спокойная атмосфера — именно то, что нужно при работе. Звук получается точным и живым.", avatar: "АВ" },
  { name: "Дарья Климова", role: "Поп-исполнитель", text: "Нашла здесь своё место после долгих поисков. Понимают с первого слова, без лишней суеты.", avatar: "ДК" },
  { name: "Максим Федин", role: "Продюсер", text: "Мастеринг здесь — это серьёзно. Уровень европейских студий при адекватной цене.", avatar: "МФ" },
  { name: "Иван Горев", role: "Звукорежиссёр", text: "Работаю с несколькими студиями — здесь самый стабильный результат. Акустика в зале продумана.", avatar: "ИГ" },
];

const MERCH_ITEMS = [
  { name: "Лонгслив DEEPSOUND", price: "5 490 ₽", tag: "Хит", emoji: "👕" },
  { name: "Лонгслив sound.mix.out.", price: "5 490 ₽", tag: null, emoji: "👕" },
  { name: "Бандана", price: "1 490 ₽", tag: "Новинка", emoji: "🧣" },
  { name: "Наклейки — набор", price: "390 ₽", tag: null, emoji: "🎨" },
  { name: "Наклейка — логотип", price: "190 ₽", tag: null, emoji: "🎨" },
  { name: "Упаковка (USB)", price: "890 ₽", tag: "Новинка", emoji: "📦" },
];

const C = {
  black: "#0a0a0c",
  dark: "#10111a",
  card: "#161722",
  border: "#252633",
  muted: "#4a4d66",
  text: "#b8bdd6",
  white: "#eeeef5",
  blue: "#4a6fa5",
  navy: "#1e2d4a",
  steel: "#6b7fa3",
  grey: "#8892aa",
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "text-base", md: "text-xl", lg: "text-5xl md:text-7xl" }[size];
  return (
    <span className={`font-blackops tracking-wider ${s}`} style={{ color: C.white }}>
      DEEP<span style={{ color: C.blue }}>SOUND</span>
    </span>
  );
}

function Slogan({ className = "" }: { className?: string }) {
  return (
    <span className={`font-ibm font-light tracking-[0.25em] uppercase ${className}`} style={{ color: C.steel }}>
      sound<span style={{ color: C.blue }}>.</span> mix<span style={{ color: C.blue }}>.</span> out<span style={{ color: C.blue }}>.</span>
    </span>
  );
}

function WaveDecor() {
  const bars = [4, 10, 18, 28, 22, 34, 26, 14, 30, 20, 8, 32, 16, 24, 6, 28, 20, 12, 36, 18, 10, 24, 30, 16, 8];
  return (
    <div className="flex items-center gap-[2px] h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: h,
            background: i % 4 === 0 ? C.blue : C.muted,
            opacity: 0.5 + (i % 3) * 0.15,
            borderRadius: 1,
            animation: `pulse-bar ${1 + (i % 5) * 0.2}s ease-in-out ${i * 0.04}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div style={{ height: 1, flex: 1, background: C.border }} />
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
      <div style={{ height: 1, flex: 1, background: C.border }} />
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["contacts", "merch", "reviews", "prices", "services", "about", "home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const to = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="min-h-screen overflow-x-hidden font-ibm" style={{ background: C.black, color: C.white }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? `${C.dark}f2` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => to("home")}><Logo size="sm" /></button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => to(l.id)}
                className="text-xs tracking-widest uppercase font-ibm transition-colors"
                style={{ color: activeSection === l.id ? C.blue : C.grey }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => to("contacts")}
            className="hidden md:block text-xs tracking-widest uppercase font-ibm px-5 py-2.5 border transition-all hover:opacity-80"
            style={{ borderColor: C.blue, color: C.white, background: `${C.navy}80` }}
          >
            Записаться
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.white }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-6 flex flex-col gap-5" style={{ background: C.dark, borderTop: `1px solid ${C.border}` }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => to(l.id)} className="text-left text-sm tracking-wide font-ibm" style={{ color: C.text }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => to("contacts")} className="mt-2 text-xs tracking-widest uppercase font-ibm px-5 py-3 border text-left" style={{ borderColor: C.blue, color: C.white }}>
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={STUDIO_IMAGE} alt="" className="w-full h-full object-cover" style={{ opacity: 0.15, filter: "grayscale(50%) contrast(1.1)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.black} 40%, ${C.navy}50 100%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.black} 0%, transparent 60%)` }} />
        </div>

        {/* Вертикальная акцентная полоса слева */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: `linear-gradient(to bottom, transparent 10%, ${C.blue} 50%, transparent 90%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-10" style={{ opacity: 0, animation: "fade-up 0.8s ease 0.1s forwards" }}>
              <WaveDecor />
              <span className="text-xs tracking-[0.3em] uppercase font-ibm" style={{ color: C.steel }}>
                Студия звукозаписи · Москва
              </span>
            </div>

            <h1
              className="font-blackops leading-none mb-4"
              style={{ fontSize: "clamp(3.5rem, 11vw, 7.5rem)", color: C.white, opacity: 0, animation: "fade-up 0.9s ease 0.25s forwards" }}
            >
              DEEP<span style={{ color: C.blue }}>SOUND</span>
            </h1>

            <div style={{ opacity: 0, animation: "fade-up 0.8s ease 0.4s forwards" }} className="mb-8">
              <Slogan className="text-sm md:text-base" />
            </div>

            <p className="text-base font-light leading-relaxed max-w-md mb-10" style={{ color: C.text, opacity: 0, animation: "fade-up 0.8s ease 0.55s forwards" }}>
              Чистое пространство для записи и работы со звуком. Минимум лишнего — максимум результата.
            </p>

            <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: "fade-up 0.8s ease 0.7s forwards" }}>
              <button onClick={() => to("contacts")} className="text-xs tracking-widest uppercase font-ibm px-8 py-4 transition-all hover:opacity-85" style={{ background: C.blue, color: C.white }}>
                Записаться
              </button>
              <button onClick={() => to("services")} className="text-xs tracking-widest uppercase font-ibm px-8 py-4 transition-all hover:opacity-70 border" style={{ borderColor: C.border, color: C.grey }}>
                Услуги
              </button>
            </div>

            <div className="flex gap-12 mt-16" style={{ opacity: 0, animation: "fade-up 0.8s ease 0.85s forwards" }}>
              {[["8+", "лет"], ["500+", "релизов"], ["200+", "артистов"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-blackops text-2xl" style={{ color: C.blue }}>{n}</div>
                  <div className="text-xs mt-1 tracking-wide" style={{ color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} style={{ color: C.muted }} />
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden py-4 border-y" style={{ background: C.navy, borderColor: `${C.blue}50` }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(2).fill(null).map((_, i) => (
            <span key={i} className="font-blackops text-sm tracking-widest" style={{ color: `${C.white}60` }}>
              {["SOUND", "MIX", "OUT", "RECORD", "MASTER", "PRODUCE"].map(w => (
                <span key={w} className="mr-14"><span style={{ color: C.blue }}>·</span> {w} </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full border" style={{ borderColor: `${C.blue}20` }} />
              <img src={STUDIO_IMAGE} alt="Студия DEEPSOUND" className="w-full aspect-[4/3] object-cover relative z-10" style={{ filter: "grayscale(40%) contrast(1.05)", opacity: 0.85 }} />
              <div className="absolute bottom-0 left-0 right-0 z-20 px-5 py-3 text-xs tracking-widest uppercase font-ibm" style={{ background: `${C.dark}e8`, color: C.steel, backdropFilter: "blur(4px)" }}>
                Основана в 2016 году · Москва
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-6 font-ibm" style={{ color: C.blue }}>О студии</p>
              <h2 className="font-blackops text-3xl md:text-4xl leading-tight mb-6" style={{ color: C.white }}>
                МЫ СОЗДАЁМ<br />ЗВУКИ,<br />КОТОРЫЕ<br /><span style={{ color: C.blue }}>СЛЫШАТ</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4 font-light" style={{ color: C.text }}>
                DEEPSOUND — студия для тех, кто ценит структуру, точность и результат. Работаем спокойно и методично: без суеты, но с полной отдачей каждому проекту.
              </p>
              <p className="text-sm leading-relaxed mb-8 font-light" style={{ color: C.text }}>
                Наша аудитория: артисты, продюсеры, подкастеры, независимые музыканты и голосовые актёры — все, для кого важен качественный звук.
              </p>
              <Divider />
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[["SSL 4000", "Консоль"], ["Pro Tools HDX", "DAW"], ["Neumann U87", "Микрофон"], ["Genelec 8351", "Мониторы"]].map(([n, t]) => (
                  <div key={n} className="p-4 border" style={{ borderColor: C.border, background: `${C.card}80` }}>
                    <div className="font-ibm text-sm font-medium" style={{ color: C.white }}>{n}</div>
                    <div className="text-xs mt-1" style={{ color: C.muted }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 border-y" style={{ background: C.dark, borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-ibm" style={{ color: C.blue }}>Что мы делаем</p>
              <h2 className="font-blackops text-3xl md:text-4xl" style={{ color: C.white }}>УСЛУГИ</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: C.border }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
                <div
                  className="p-8 h-full transition-colors duration-200"
                  style={{ background: C.dark }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.card)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.dark)}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-6 border" style={{ borderColor: C.border }}>
                    <Icon name={s.icon as "Mic"} size={15} style={{ color: C.blue }} />
                  </div>
                  <h3 className="font-ibm font-medium text-sm mb-3 tracking-wide" style={{ color: C.white }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed font-light" style={{ color: C.text }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-28 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-ibm" style={{ color: C.blue }}>Прейскурант</p>
            <h2 className="font-blackops text-3xl md:text-4xl" style={{ color: C.white }}>ЦЕНЫ</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICES.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div className="relative flex flex-col h-full border p-8" style={{ borderColor: plan.popular ? C.blue : C.border, background: plan.popular ? `${C.navy}40` : `${C.card}60` }}>
                {plan.popular && (
                  <div className="absolute -top-[1px] left-6 px-3 py-1 text-xs tracking-widest uppercase font-ibm" style={{ background: C.blue, color: C.white }}>
                    Популярный
                  </div>
                )}
                <div className="mb-8 pt-2">
                  <p className="text-xs tracking-[0.2em] uppercase font-ibm mb-3" style={{ color: C.muted }}>{plan.name}</p>
                  <div className="font-blackops text-3xl" style={{ color: C.white }}>
                    {plan.price} <span className="font-ibm font-light text-sm" style={{ color: C.muted }}>₽ / {plan.per}</span>
                  </div>
                </div>
                <Divider />
                <ul className="space-y-3 flex-1 mt-6 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-xs font-light" style={{ color: C.text }}>
                      <span style={{ color: C.blue, marginTop: 2, flexShrink: 0 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => to("contacts")}
                  className="w-full text-xs tracking-widest uppercase font-ibm py-3 border transition-all hover:opacity-80"
                  style={plan.popular ? { background: C.blue, color: C.white, borderColor: C.blue } : { background: "transparent", color: C.grey, borderColor: C.border }}
                >
                  Выбрать
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 border-y" style={{ background: C.dark, borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-ibm" style={{ color: C.blue }}>Говорят о нас</p>
              <h2 className="font-blackops text-3xl md:text-4xl" style={{ color: C.white }}>ОТЗЫВЫ</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <div className="p-8 border relative" style={{ borderColor: C.border, background: `${C.card}80` }}>
                  <div className="absolute top-6 right-8 font-blackops text-6xl select-none" style={{ color: `${C.blue}12`, lineHeight: 1 }}>"</div>
                  <p className="text-sm font-light leading-relaxed mb-6" style={{ color: C.text }}>"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center text-xs font-ibm font-medium shrink-0 border" style={{ background: `${C.navy}80`, borderColor: C.blue, color: C.blue }}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-medium tracking-wide" style={{ color: C.white }}>{r.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: C.muted }}>{r.role}</div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-xs" style={{ color: C.blue }}>★</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section id="merch" className="py-28 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-ibm" style={{ color: C.blue }}>Фирменная продукция</p>
              <h2 className="font-blackops text-3xl md:text-4xl" style={{ color: C.white }}>МЕРЧ</h2>
            </div>
            <Slogan className="text-xs" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: C.border }}>
          {MERCH_ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={i * 50}>
              <div
                className="p-6 md:p-8 flex flex-col h-full transition-colors duration-200"
                style={{ background: C.black }}
                onMouseEnter={e => (e.currentTarget.style.background = C.card)}
                onMouseLeave={e => (e.currentTarget.style.background = C.black)}
              >
                <div className="aspect-square flex items-center justify-center mb-5 border" style={{ borderColor: C.border, background: C.dark }}>
                  <span className="text-3xl" style={{ opacity: 0.25 }}>{item.emoji}</span>
                </div>
                <div className="flex items-start justify-between gap-2 mt-auto">
                  <div>
                    <h3 className="font-ibm text-xs font-medium mb-2 leading-snug" style={{ color: C.white }}>{item.name}</h3>
                    <p className="font-ibm font-light text-xs" style={{ color: C.steel }}>{item.price}</p>
                  </div>
                  {item.tag && (
                    <span className="text-xs font-ibm font-medium px-2 py-0.5 shrink-0 border" style={{ background: C.navy, color: C.blue, borderColor: `${C.blue}40` }}>
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 border-t" style={{ background: C.dark, borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4 font-ibm" style={{ color: C.blue }}>Бронирование</p>
                <h2 className="font-blackops text-3xl md:text-4xl mb-6 leading-tight" style={{ color: C.white }}>
                  ЗАБРОНИРУЙ<br /><span style={{ color: C.blue }}>СЕССИЮ</span>
                </h2>
                <p className="text-sm leading-relaxed mb-10 font-light" style={{ color: C.text }}>
                  Оставь заявку — ответим в течение часа и подберём удобное время.
                </p>
                <Divider />
                <div className="space-y-5 mt-6">
                  {[
                    { icon: "MapPin", text: "Москва, ул. Звуковая, 12" },
                    { icon: "Phone", text: "+7 (999) 000-00-00" },
                    { icon: "Mail", text: "info@deepsound.ru" },
                    { icon: "Clock", text: "Ежедневно: 10:00 — 04:00" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center border shrink-0" style={{ borderColor: C.border }}>
                        <Icon name={icon as "MapPin"} size={13} style={{ color: C.blue }} />
                      </div>
                      <span className="text-sm font-light" style={{ color: C.text }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  {[["Имя", "text", "Артём"], ["Телефон", "tel", "+7 (999) ..."]].map(([label, type, ph]) => (
                    <div key={label}>
                      <label className="block text-xs tracking-widest uppercase mb-2 font-ibm" style={{ color: C.muted }}>{label}</label>
                      <input
                        type={type}
                        placeholder={ph}
                        className="w-full text-sm px-4 py-3 font-ibm font-light focus:outline-none transition-colors"
                        style={{ background: C.card, border: `1px solid ${C.border}`, color: C.white }}
                        onFocus={e => (e.currentTarget.style.borderColor = C.blue)}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 font-ibm" style={{ color: C.muted }}>Услуга</label>
                  <select className="w-full text-sm px-4 py-3 font-ibm font-light focus:outline-none appearance-none" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                    <option value="">Выбери услугу...</option>
                    {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 font-ibm" style={{ color: C.muted }}>Комментарий</label>
                  <textarea
                    rows={4}
                    placeholder="О проекте, жанре, сроках..."
                    className="w-full text-sm px-4 py-3 font-ibm font-light focus:outline-none resize-none transition-colors"
                    style={{ background: C.card, border: `1px solid ${C.border}`, color: C.white }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.blue)}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-xs tracking-widest uppercase font-ibm py-4 transition-all hover:opacity-85"
                  style={{ background: C.blue, color: C.white }}
                >
                  Отправить заявку
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: C.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <Slogan className="text-xs" />
          <span className="text-xs font-ibm" style={{ color: C.muted }}>© 2024 DEEPSOUND. Все права защищены.</span>
          <div className="flex gap-6">
            {["VK", "TG", "YT"].map(s => (
              <button key={s} className="text-xs tracking-widest font-ibm transition-colors hover:opacity-80" style={{ color: C.muted }}>
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
