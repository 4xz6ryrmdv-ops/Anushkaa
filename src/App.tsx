/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Heart, Star, Camera, ChevronDown, Sparkles, Music, Volume2, VolumeX, Flower2, Wind, Lock, Unlock, ShieldCheck, BookOpen, Map, Plane, Zap, Quote, Compass, Eraser, Clock, Home, Utensils, DollarSign, Dog, Cat, Fingerprint, Dumbbell } from 'lucide-react';
import Lenis from 'lenis';

// --- CONFIGURATION (EASY TO EDIT) ---
const TARGET_DATE = new Date('2024-08-11T00:00:00');
const INTRO_BOOK_PHOTO = "./intro.jpg.jpg";
const MIRROR_PHOTO_URL = "./mirror.jpg.jpg";

const BOOKS = [
  { title: "The Gym Encounter", color: "bg-[#1a2a4a]", content: "Where it all began. A simple conversation that changed everything.", photo: "./book1.jpg.JPG" },
  { title: "The Germany Dream", color: "bg-[#4a1a1a]", content: "Chasing freedom and building a future in the land of dreams.", photo: "./book2.jpg.JPG" },
  { title: "Taylor's Version", color: "bg-[#2d1a4a]", content: "Finding strength in lyrics and magic in every melody.", photo: "./book3.jpg.JPG" },
  { title: "Pure Soul", color: "bg-[#1a4a2d]", content: "The essence of who you are. Rare, true, and unforgettable.", photo: "./book4.jpg.JPG" },
];

const VIDEO_URLS = [
  "https://www.youtube.com/embed/XXrkotbC7MY",
  "https://www.youtube.com/embed/0ZjqeAhd6Ms?si=bD6dc_X0-5qut546"
];

const POLAROID_IMAGES = [
  { id: 1, url: "./photo1.jpg.JPG", }, { id: 2, url: "./photo2.jpg.JPG", }, { id: 3, url: "./photo3.jpg.jpg", },
  { id: 4, url: "./photo4.jpg.JPG", }, { id: 5, url: "./photo5.jpg.JPG", }, { id: 6, url: "./photo6.jpg.JPG", },
  { id: 7, url: "./photo7.jpg.JPG", }, { id: 8, url: "./photo8.jpg.JPG", }, { id: 9, url: "./photo9.jpg.JPG", },
  { id: 10, url: "./photo10.jpg.JPG", }, { id: 11, url: "./photo11.jpg.JPG", }, { id: 12, url: "./photo12.jpg.jpg", },
  { id: 13, url: "./photo13.jpg.JPG", }, { id: 14, url: "./photo14.jpg.JPG", }, { id: 15, url: "./photo15.jpg.jpg", },
  { id: 16, url: "./photo16.jpg.jpg", }, { id: 17, url: "./photo17.jpg.JPG", }, { id: 18, url: "./photo18.jpg.JPG", },
  { id: 19, url: "./photo19.jpg.JPG", }, { id: 20, url: "./photo20.jpg.JPG", },
];

const PARAGRAPHS = [
"I still remember the first time I saw you at the gym—there was something about you that instantly stayed with me. You were doing the wrong exercise, but somehow, you still stood out perfectly. I wanted to come talk to you right then, but I waited for the right moment, and when I finally did, I had no idea that one small conversation would turn into something so meaningful. From being strangers to talking, from me trying to be more than a friend to accepting what we are today—it’s been a journey I never expected, but one I truly value.",
"There’s also something I’ve wanted to be honest about—I did lie to you a little in the beginning about my past. At that time, we didn’t really know each other, and I wasn’t comfortable sharing everything directly, so I chose an easier way, which I still regret sometimes. But one thing was always true and will always stay true—you’re the first person I ever had the courage to approach on my own, purely because I chose you. Yes, things didn’t turn out the way I once thought, but you'll always be someone I genuinely chose first.",
"We’ve had our share of arguments, debates, and moments where things didn’t make sense. And I know, sometimes I was wrong but still chose to argue—maybe because I wanted to feel something intense, because experiencing every emotion, even anger, felt real in its own way. But through all of that, you stayed, and that says a lot about what we have. I admire so many things about you—your enthusiasm, your clarity, and how you always seem to know what you’re doing.",
"I know your last birthday wasn’t the best, and maybe I can't fix everything, but I just wanted to make this one a little different, a little better, even if it’s in the smallest way. And as your friend, I’ll always be honest with you—not the one who just agrees with everything, but the one who stands by what’s right for you. Even when I disagree with you, it’s only because I care. You're strong in ways you probably don't even realize.",
"I might not know everything about you, but the bond we share is something I can’t explain in simple words. You understand me in a way no one ever has, and that’s rare. Truly rare. And no matter how things change, that’s something I’ll always be grateful for."
];

const Lily = ({ delay = 0, scale = 1 }) => (
  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 1, 0], scale: [0, scale, scale, 0], y: [0, -200], x: [0, Math.random() * 100 - 50] }} transition={{ duration: 8, delay, repeat: Infinity }} className="absolute pointer-events-none z-10">
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="drop-shadow-2xl">
      <path d="M50 10C50 10 30 40 10 50C30 60 50 90 50 90C50 90 70 60 90 50C70 40 50 10 50 10Z" fill="white" fillOpacity="0.8" />
    </svg>
  </motion.div>
);

const Orchid = ({ delay = 0, scale = 1 }) => (
  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 1, 0], scale: [0, scale, scale, 0], y: [0, -300], x: [0, Math.random() * 200 - 100] }} transition={{ duration: 12, delay, repeat: Infinity }} className="absolute pointer-events-none z-10">
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none"><path d="M50 50C50 50 20 20 10 50C20 80 50 50 50 50Z" fill="#E5D5B5" fillOpacity="0.6" /></svg>
  </motion.div>
);

const DreamIntro = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }} className="fixed inset-0 z-[200] bg-cream flex flex-col items-center justify-center overflow-hidden cursor-pointer" onClick={() => isOpened ? onNext() : setIsOpened(true)}>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100 + 50}%` }}>
            {i % 2 === 0 ? <Lily delay={i * 0.8} scale={0.5 + Math.random()} /> : <Orchid delay={i * 1.2} scale={0.4 + Math.random()} />}
          </div>
        ))}
      </div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} whileHover={{ opacity: 1 }} onClick={(e) => { e.stopPropagation(); onSkip(); }} className="absolute top-8 right-8 z-[220] text-[10px] uppercase tracking-[0.5em] text-luxury-black font-medium border-b border-luxury-black/20 pb-2">Skip Journey</motion.button>
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6">
        <div className="relative w-64 h-80 sm:w-80 sm:h-[450px] perspective-2000 preserve-3d">
          <div className="absolute inset-0 bg-white rounded-r-lg shadow-inner flex flex-col items-center justify-center p-8 z-0">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: isOpened ? 1 : 0, scale: isOpened ? 1 : 0.8 }} transition={{ delay: 1 }} className="text-center">
              <img src={INTRO_BOOK_PHOTO} className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mx-auto mb-6 shadow-xl border-4 border-cream" />
              <h2 className="font-serif italic text-2xl text-luxury-black mb-2">Enthusiastic Baddie</h2>
              <div className="px-6 py-2 border border-luxury-black text-[10px] uppercase tracking-[0.3em] font-bold">Enter Her World</div>
            </motion.div>
          </div>
          <motion.div className="absolute inset-0 preserve-3d z-10" style={{ transformOrigin: "left" }} animate={{ rotateY: isOpened ? -180 : 0 }} transition={{ duration: 2, ease: [0.645, 0.045, 0.355, 1] }}>
            <div className="absolute inset-0 bg-luxury-black rounded-r-lg shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden z-20">
              <motion.h1 className="text-gold font-serif text-3xl sm:text-4xl text-center leading-tight mb-4">The Book of <br/> <span className="text-white italic font-script text-5xl sm:text-6xl block mt-2">Anushka</span></motion.h1>
            </div>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 0 : 0.5 }} className="mt-12 text-[10px] uppercase tracking-[0.5em] text-luxury-black font-medium animate-pulse">Tap to Open Her Story</motion.p>
      </div>
    </motion.div>
  );
};

const CursorGlow = () => {
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove); return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return <motion.div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden" style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(197, 160, 89, 0.05), transparent 80%)`) }} />;
};

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div key={i} initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: Math.random() * 0.5 }} animate={{ y: ["-10%", "110%"] }} transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }} className="absolute w-1 h-1 bg-gold/20 rounded-full blur-[1px]" />
    ))}
  </div>
);

const Butterfly = ({ delay = 0 }) => (
  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x: [0, Math.random() * 100 - 50], y: [0, -200], rotate: [0, 45, -45, 0] }} transition={{ duration: 5, repeat: Infinity, delay }} className="absolute pointer-events-none z-20">
    <Wind size={16} className="text-gold/40" />
  </motion.div>
);

const Countdown = ({ onComplete }: { onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(); const diff = TARGET_DATE.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); onComplete(); }
      else { setTimeLeft({ days: Math.floor(diff / (1000 * 60 * 60 * 24)), hours: Math.floor((diff / (1000 * 60 * 60)) % 24), minutes: Math.floor((diff / 1000 / 60) % 60), seconds: Math.floor((diff / 1000) % 60) }); }
    }, 1000); return () => clearInterval(timer);
  }, [onComplete]);
  return (
    <div className="flex gap-4 md:gap-8 font-display">
      {[{ label: 'Days', v: timeLeft.days }, { label: 'Hours', v: timeLeft.hours }, { label: 'Mins', v: timeLeft.minutes }, { label: 'Secs', v: timeLeft.seconds }].map(i => (
        <div key={i.label} className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-extralight tracking-tighter text-gold">{i.v.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2 text-luxury-black">{i.label}</span>
        </div>
      ))}
    </div>
  );
};
const PolaroidRoller = () => {
  const carousel = useRef<HTMLDivElement>(null); const [width, setWidth] = useState(0);
  useEffect(() => { if (carousel.current) setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth); }, []);
  return (
    <section className="py-60 bg-white/5 overflow-hidden relative">
      <div className="px-12 md:px-24 mb-24 relative z-20">
        <h2 className="font-serif text-7xl md:text-[12rem] font-light italic text-luxury-black tracking-tighter leading-none">The Gallery <br /> <span className="text-gold ml-[15vw]">of Us.</span></h2>
      </div>
      <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing px-[10vw]">
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-20 items-center">
          {POLAROID_IMAGES.map((img, i) => (
            <motion.div key={img.id} whileHover={{ scale: 1.02 }} className="flex-shrink-0 w-[280px] sm:w-[400px] bg-white p-6 shadow-2xl border border-gray-100 rounded-sm">
              <div className="w-full aspect-square overflow-hidden mb-6"><img src={img.url} className="w-full h-full object-cover" /></div>
              <div className="text-center"><p className="font-serif italic text-gray-600 text-xl mb-2">{img.caption}</p></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const FrostedSoulMirror = () => {
    const [isCleared, setIsCleared] = useState(false); const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const can = canvasRef.current; if (!can) return; const ctx = can.getContext('2d'); if (!ctx) return;
        can.width = can.offsetWidth; can.height = can.offsetHeight;
        ctx.fillStyle = '#f3f4f6'; ctx.fillRect(0, 0, can.width, can.height);
    }, []);
    return (
        <section className="py-24 px-6 flex flex-col items-center">
            <h2 className="font-serif italic text-4xl text-luxury-black mb-12">The Pure Soul Mirror</h2>
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl bg-cream">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <motion.div animate={isCleared ? { opacity: 1, scale: 1 } : { opacity: 0.1 }}>
                        <img src={MIRROR_PHOTO_URL} className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-gold/30 object-cover" />
                        <h3 className="font-serif italic text-4xl text-luxury-black">Pure. Mature. Unstoppable.</h3>
                    </motion.div>
                </div>
                <canvas ref={canvasRef} onMouseMove={() => setIsCleared(true)} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isCleared ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ filter: 'blur(4px)' }} />
            </div>
        </section>
    );
};

const SignatureA = () => {
    const path = "M20 70 C 25 30, 45 15, 55 20 C 65 25, 75 50, 70 80 M45 45 C 55 42, 65 42, 75 48";
    return (
        <div className="relative group/sig h-32 w-32 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 100 100" className="text-gold fill-none overflow-visible">
                <defs><linearGradient id="gold-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C5A059" /><stop offset="100%" stopColor="#FDFCF8" /></linearGradient></defs>
                <motion.path d={path} stroke="url(#gold-g)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3 }} />
                {[...Array(5)].map((_, i) => (
                    <motion.circle key={i} r="1" className="fill-white" initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                        <animateMotion dur="3s" path={path} rotate="auto" repeatCount="1" />
                    </motion.circle>
                ))}
            </svg>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 border border-gold/10 rounded-full blur-xl" />
        </div>
    );
};

const SignatureH = () => {
    const path = "M25 25 C 28 40, 28 60, 25 85 M75 25 C 72 40, 72 60, 75 85 M25 55 C 40 50, 60 50, 75 55";
    return (
        <div className="relative h-32 w-32 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 100 100" className="text-gold fill-none">
                <motion.path d={path} stroke="gold" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5 }} />
            </svg>
        </div>
    );
};

const TheFutureDeal = () => {
    const p = [{ t: "The Sacred Pact", d: "If the world hasn't found us by thirty, we find each other.", i: <Clock /> }, { t: "Our Sanctuary", d: "A home with a garden, one dog, and one cat.", i: <Home /> }, { t: "The Saturday Vow", d: "Every Saturday, flowers and a date.", i: <Flower2 /> }, { t: "The Sunday Rhythm", d: "Slow mornings and cooking together.", i: <Utensils /> }];
    return (
        <section className="py-40 bg-luxury-black text-cream text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">{[...Array(10)].map((_, i) => <Butterfly key={i} delay={i} />)}</div>
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="font-display italic text-6xl md:text-9xl mb-24 text-gold">The Eternal Pact</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {p.map(item => (
                        <div key={item.t} className="p-12 border border-white/5 bg-white/5 rounded-[60px] text-center">
                            <h3 className="text-3xl text-gold italic mb-6 font-display">{item.t}</h3>
                            <p className="opacity-60 text-lg font-serif italic">{item.d}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-32 p-16 border border-gold/20 rounded-[80px] bg-white/5">
                    <p className="font-display text-3xl md:text-5xl italic text-cream mb-12">"You were the first soul I ever chose... it was always you."</p>
                    <div className="flex items-center justify-center gap-20">
                        <SignatureA /> <span className="text-gold/20 text-4xl">&</span> <SignatureH />
                    </div>
                </div>
            </div>
        </section>
    );
};

const GermanyDream = () => (
    <section className="min-h-screen flex flex-col items-center justify-center bg-luxury-black text-white text-center p-6">
        <h2 className="font-display text-5xl md:text-8xl mb-12 uppercase tracking-tight">A Journey to <br/> <span className="text-gold italic normal-case">Freedom</span></h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5"><h3 className="text-gold italic text-2xl mb-4">Berlin Dreams</h3><p className="opacity-60">Chasing freedom across continents. Germany is her true calling.</p></div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5"><h3 className="text-gold italic text-2xl mb-4">Pure Soul</h3><p className="opacity-60">Understanding, mature, and endlessly poetic.</p></div>
        </div>
    </section>
);

const ParagraphCard = ({ text, index }: { text: string, index: number }) => {
    const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return (
        <section ref={ref} className="min-h-[80vh] flex items-center justify-center p-6 perspective-2000">
            <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]) }} className="glass-liquid w-full max-w-[500px] p-12 rounded-[40px] shadow-2xl relative">
                <span className="text-gold font-bold block mb-8 uppercase tracking-[0.5em]">Chapter 0{index + 1}</span>
                <p className="font-serif text-2xl italic leading-relaxed text-luxury-black/90">{text}</p>
            </motion.div>
        </section>
    );
};

export default function App() {
  const [show, setShow] = useState(true); const { scrollYProgress } = useScroll();
  useEffect(() => {
    const l = new Lenis({ duration: 1.5 });
    function r(t: number) { l.raf(t); requestAnimationFrame(r); } requestAnimationFrame(r);
  }, []);
  return (
    <div className="bg-cream min-h-screen">
      <CursorGlow />
      <AnimatePresence mode="wait">
        {show ? <DreamIntro key="i" onNext={() => setShow(false)} onSkip={() => setShow(false)} /> : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section className="h-screen flex flex-col items-center justify-center"><h1 className="text-8xl md:text-9xl font-serif italic text-luxury-black">Anushka<span className="text-gold">.</span></h1></section>
            <BaddieBlueprint />
            <div className="py-20">{PARAGRAPHS.map((t, i) => <ParagraphCard key={i} text={t} index={i} />)}</div>
            <GermanyDream />
            <PolaroidRoller />
            <TheFutureDeal />
            <footer className="py-20 text-center opacity-40 font-serif italic">Created with love for a soul of pure gold. © 2026</footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const BaddieBlueprint = () => (
    <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="font-serif italic text-4xl mb-12">The Baddie Blueprint</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {[{t: "Resilience", v: "100%"}, {t: "Vibe", v: "Taylor's Version"}, {t: "Goal", v: "Germany"}].map(x => (
                <div key={x.t} className="p-8 border border-gold/10 rounded-2xl bg-white/40 backdrop-blur-sm">
                    <span className="text-gold text-4xl italic font-serif">{x.v}</span>
                    <p className="mt-2 uppercase tracking-widest text-[10px]">{x.t}</p>
                </div>
            ))}
        </div>
    </section>
);