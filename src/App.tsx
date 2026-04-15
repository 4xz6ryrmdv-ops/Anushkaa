/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Heart, Star, Camera, ChevronDown, Sparkles, Music, Volume2, VolumeX, Flower2, Wind, Lock, Unlock, ShieldCheck, BookOpen, Map, Plane, Zap, Quote, Compass, Eraser } from 'lucide-react';
import Lenis from 'lenis';

// --- CONFIGURATION (EASY TO EDIT) ---
// Just replace these links with your own photos and videos!

// 1. The Target Date (Her Birthday)
const TARGET_DATE = new Date('2026-08-11T00:00:00');

// 2. The Photo inside the Intro Book
const INTRO_BOOK_PHOTO = "./intro.jpg.jpg";

// 3. The Photo behind the "Frosted Soul Mirror"
const MIRROR_PHOTO_URL = "./mirror.jpg.jpg";

// 3. The Library Books (Titles, Colors, Content, and Photos)
const BOOKS = [
  { 
    title: "The Gym Encounter", 
    color: "bg-[#1a2a4a]", 
    content: "Where it all began. A simple conversation that changed everything.",
    photo: "https://picsum.photos/seed/gym/400/600" 
  },
  { 
    title: "The Germany Dream", 
    color: "bg-[#4a1a1a]", 
    content: "Chasing freedom and building a future in the land of dreams.",
    photo: "https://picsum.photos/seed/germany/400/600" 
  },
  { 
    title: "Taylor's Version", 
    color: "bg-[#2d1a4a]", 
    content: "Finding strength in lyrics and magic in every melody.",
    photo: "https://picsum.photos/seed/taylor/400/600" 
  },
  { 
    title: "Pure Soul", 
    color: "bg-[#1a4a2d]", 
    content: "The essence of who you are. Rare, true, and unforgettable.",
    photo: "https://picsum.photos/seed/soul/400/600" 
  },
];

// 4. The Video URLs (YouTube or MP4)
// 4. The Video URLs (YouTube or MP4)
const VIDEO_URLS = [
  "https://www.youtube.com/embed/XXrkotbC7MY",
  "https://www.youtube.com/embed/0ZjqeAhd6Ms?si=bD6dc_X0-5qut546"
];

// 5. The Gallery Photos (20 Polaroids)
const POLAROID_IMAGES = [
  { id: 1, url: "./photo1.jpg.JPG", },
  { id: 2, url: "./photo2.jpg.JPG", },
  { id: 3, url: "./photo3.jpg.jpg", },
  { id: 4, url: "./photo4.jpg.JPG", },
  { id: 5, url: "./photo5.jpg.JPG", },
  { id: 6, url: "./photo6.jpg.JPG", },
  { id: 7, url: "./photo7.jpg.JPG", },
  { id: 8, url: "./photo8.jpg.JPG", },
  { id: 9, url: "./photo9.jpg.JPG", },
  { id: 10, url: "./photo10.jpg.JPG", },
  { id: 11, url: "./photo11.jpg.JPG", },
  { id: 12, url: "./photo12.jpg.jpg", },
  { id: 13, url: "./photo13.jpg.JPG", },
  { id: 14, url: "./photo14.jpg.JPG", },
  { id: 15, url: "./photo15.jpg.jpg", },
  { id: 16, url: "./photo16.jpg.jpg", },
  { id: 17, url: "./photo17.jpg.JPG", },
  { id: 18, url: "./photo18.jpg.JPG", },
  { id: 19, url: "./photo19.jpg.JPG", },
  { id: 20, url: "./photo20.jpg.JPG", },
];

// 6. The Long Paragraphs (Chapters)
const PARAGRAPHS = [
  "I still remember the first time I saw you at the gym—there was something about you that instantly stayed with me. You were doing the wrong exercise, but somehow, you still stood out perfectly. I wanted to come talk to you right then, but I waited for the right moment, and when I finally did, I had no idea that one small conversation would turn into something so meaningful. From being strangers to talking, from me trying to be more than a friend to accepting what we are today—it’s been a journey I never expected, but one I truly value. Somewhere along the way, you became someone I could open up to without thinking twice, something I’ve never really done before, not even with people I once called my best friends.",
  "There’s also something I’ve wanted to be honest about—I did lie to you a little in the beginning about my past. At that time, we didn’t really know each other, and I wasn’t comfortable sharing everything directly, so I chose an easier way, which I still regret sometimes. But one thing was always true and will always stay true—you’re the first person I ever had the courage to approach on my own, not because someone told me to, not because of anything else, but purely because I chose you. Yes, things didn’t turn out the way I once thought, and you chose to keep it as friendship—but I remember telling you one thing back then, that I’ll always put in effort no matter what, and in my heart, you’ll always be someone I genuinely chose first, in my own way.",
  "We’ve had our share of arguments, debates, and moments where things didn’t make sense. And I know, sometimes I was wrong but still chose to argue—maybe because I wanted to feel something intense, because experiencing every emotion, even anger, felt real in its own way. But through all of that, you stayed, and that says a lot about what we have. I admire so many things about you—your enthusiasm, your clarity, the way you focus on your goals, and how you always seem to know what you’re doing. You’re strong in ways you probably don’t even realize.",
  "I know your last birthday wasn’t the best, and maybe I can't fix everything, but I just wanted to make this one a little different, a little better, even if it’s in the smallest way. And as your friend, I’ll always be honest with you—not the one who just agrees with everything, but the one who stands by what’s right for you. Even when I disagree with you, even when it leads to arguments, it’s only because I care. You may not always agree with me, like on things such as casual dating, and that’s okay—but my intentions have never been to control you, only to protect you in the way I know how.",
  "I might not know everything about you, but the bond we share is something I can’t explain in simple words. You understand me in a way no one ever has, and that’s rare. Truly rare. And no matter how things change, that’s something I’ll always be grateful for."
];

// --- END OF CONFIGURATION ---

// --- Components ---

const Lily = ({ delay = 0, scale = 1, rotate = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotateY: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0], 
      scale: [0, scale, scale, 0],
      rotateY: [0, 360],
      y: [0, -200],
      x: [0, Math.random() * 100 - 50]
    }}
    transition={{ 
      duration: 8, 
      delay, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-10"
  >
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
      <path d="M50 10C50 10 30 40 10 50C30 60 50 90 50 90C50 90 70 60 90 50C70 40 50 10 50 10Z" fill="white" fillOpacity="0.8" />
      <path d="M50 20C50 20 40 45 25 50C40 55 50 80 50 80C50 80 60 55 75 50C60 45 50 20 50 20Z" fill="#FDFCF8" />
      <circle cx="50" cy="50" r="5" fill="#C5A059" fillOpacity="0.5" />
    </svg>
  </motion.div>
);

const Orchid = ({ delay = 0, scale = 1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotateZ: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0], 
      scale: [0, scale, scale, 0],
      rotateZ: [0, 180],
      y: [0, -300],
      x: [0, Math.random() * 200 - 100]
    }}
    transition={{ 
      duration: 12, 
      delay, 
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute pointer-events-none z-10"
  >
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 50C50 50 20 20 10 50C20 80 50 50 50 50Z" fill="#E5D5B5" fillOpacity="0.6" />
      <path d="M50 50C50 50 80 20 90 50C80 80 50 50 50 50Z" fill="#E5D5B5" fillOpacity="0.6" />
      <path d="M50 50C50 50 20 80 50 90C80 80 50 50 50 50Z" fill="#C5A059" fillOpacity="0.4" />
      <circle cx="50" cy="50" r="3" fill="#FDFCF8" />
    </svg>
  </motion.div>
);

const DreamIntro = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <motion.div 
      key="dream-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)", transition: { duration: 1.5 } }}
      className="fixed inset-0 z-[200] bg-cream flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      onClick={() => isOpened ? onNext() : setIsOpened(true)}
    >
      {/* Floating 3D Flowers */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100 + 50}%` }}>
            {i % 2 === 0 ? <Lily delay={i * 0.8} scale={0.5 + Math.random()} /> : <Orchid delay={i * 1.2} scale={0.4 + Math.random()} />}
          </div>
        ))}
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        onClick={(e) => { e.stopPropagation(); onSkip(); }}
        className="absolute top-8 right-8 z-[220] text-[10px] uppercase tracking-[0.5em] font-medium text-luxury-black border-b border-luxury-black/20 pb-2"
      >
        Skip Journey
      </motion.button>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6">
        {/* 3D Book Container */}
        <div className="relative w-64 h-80 sm:w-80 sm:h-[450px] perspective-2000 preserve-3d">
          {/* Inside Page (The Reveal - Static) */}
          <div className="absolute inset-0 bg-white rounded-r-lg shadow-inner flex flex-col items-center justify-center p-8 z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isOpened ? 1 : 0, scale: isOpened ? 1 : 0.8 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center"
            >
              <img 
                src={INTRO_BOOK_PHOTO} 
                alt="Anushka"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mx-auto mb-6 shadow-xl border-4 border-cream"
              />
              <h2 className="font-serif italic text-2xl text-luxury-black mb-2">Enthusiastic Baddie</h2>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-6">Dreaming of Germany & Beyond</p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 border border-luxury-black text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                Enter Her World
              </motion.div>
            </motion.div>
          </div>

          {/* Book Cover (Rotating) */}
          <motion.div 
            className="absolute inset-0 preserve-3d z-10"
            style={{ transformOrigin: "left" }}
            animate={{ rotateY: isOpened ? -180 : 0 }}
            transition={{ duration: 2, ease: [0.645, 0.045, 0.355, 1] }}
          >
            {/* Front Cover */}
            <div className="absolute inset-0 bg-luxury-black rounded-r-lg shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden z-20">
              <div className="absolute inset-2 border border-gold/30 rounded-r-md pointer-events-none" />
              <motion.h1 
                className="text-gold font-serif text-3xl sm:text-4xl text-center leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                The Book of <br/> <span className="text-white italic font-script text-5xl sm:text-6xl block mt-2">Anushka</span>
              </motion.h1>
              <motion.p 
                className="text-gold/60 font-sans text-[10px] uppercase tracking-[0.4em] mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                A Soul of Pure Gold
              </motion.p>
            </div>

            {/* Back of Cover (Inside Left) */}
            <div 
              className="absolute inset-0 bg-cream rounded-l-lg shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden z-10"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="text-luxury-black/10 font-serif italic text-4xl">A.</div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpened ? 0 : 0.5 }}
          className="mt-12 text-[10px] uppercase tracking-[0.5em] text-luxury-black font-medium animate-pulse"
        >
          Tap to Open Her Story
        </motion.p>
      </div>

      {/* Taylor Swift Quote (Subtle) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-center px-4"
      >
        <p className="font-serif italic text-[12px] text-luxury-black">"To me, fearless is not the absence of fear. It's the strength to keep going."</p>
      </motion.div>
    </motion.div>
  );
};

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[999] overflow-hidden"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(197, 160, 89, 0.05), transparent 80%)`
        ),
      }}
    />
  );
};

const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: ["-10%", "110%"],
            x: [null, (Math.random() * 10 - 5) + "%"]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: -Math.random() * 20
          }}
          className="absolute w-1 h-1 bg-gold/20 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const Butterfly = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0.5],
      x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
      y: [0, -Math.random() * 200, -Math.random() * 400],
      rotate: [0, 45, -45, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-20"
  >
    <Wind size={16} className="text-gold/40" />
  </motion.div>
);

const Countdown = ({ onComplete }: { onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        onComplete();
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-4 md:gap-8 font-display">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-extralight tracking-tighter text-gold">{format(item.value)}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2 text-luxury-black">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const PolaroidRoller = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-60 bg-white/5 overflow-hidden relative">
      {/* Background Decorative Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none whitespace-nowrap">
        <span className="text-[20vw] font-serif italic leading-none">Memories Memories Memories Memories</span>
      </div>

      <div className="px-12 md:px-24 mb-24 relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="font-serif text-7xl md:text-[12rem] font-light italic text-luxury-black tracking-tighter leading-none">
            The Gallery <br />
            <span className="text-gold ml-[15vw]">of Us.</span>
          </h2>
          <div className="flex items-center gap-8 mt-12">
            <div className="h-[1px] w-32 bg-gold/40" />
            <p className="text-[12px] uppercase tracking-[1em] opacity-40">Swipe through our timeless moments</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        ref={carousel} 
        className="cursor-grab active:cursor-grabbing px-[10vw]"
      >
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.2}
          className="flex gap-20 items-center"
        >
          {POLAROID_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? 5 : -5 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                rotate: i % 2 === 0 ? 2 : -2,
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02, 
                rotate: 0,
                zIndex: 50,
                transition: { duration: 0.3 }
              }}
              className="flex-shrink-0 w-[280px] sm:w-[400px] bg-white p-4 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 rounded-sm group relative"
            >
              <div className="w-full aspect-square bg-gray-50 overflow-hidden mb-6 relative">
                <motion.img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center">
                <p className="font-serif italic text-gray-600 text-lg sm:text-xl mb-2">{img.caption}</p>
                <p className="text-[8px] uppercase tracking-[0.3em] opacity-30">Forever & Always</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Butterflies in the gallery */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
            <Butterfly delay={i * 0.6} />
          </div>
        ))}
      </div>
    </section>
  );
};

const FrostedSoulMirror = () => {
  const [isCleared, setIsCleared] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [wipeCount, setWipeCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Create a more "frosted" look with a gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#d1d5db');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add more visible texture to the frost
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = () => {
    if (isCleared) return;
    setIsDrawing(true);
    setWipeCount(prev => prev + 1);
  };

  const draw = (e: any) => {
    if (!isDrawing || isCleared) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 60, 0, Math.PI * 2); // Larger brush size
    ctx.fill();

    // Check if mostly cleared OR if wiped enough times
    if (wipeCount > 8) {
      setIsCleared(true);
      return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] === 0) transparentPixels++;
    }
    if (transparentPixels / (canvas.width * canvas.height) > 0.25) { // Lower threshold for easier reveal
      setIsCleared(true);
    }
  };

  return (
    <section className="py-24 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif italic text-4xl text-luxury-black mb-4">The Pure Soul Mirror</h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">Wipe away the frost to see the truth</p>
      </motion.div>

      <div className="relative w-full max-w-md aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border border-gold/20 group bg-cream">
        {/* The Reveal Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isCleared ? { scale: 1, opacity: 1 } : { opacity: 0.15 }} // Subtle peek before clearing
            transition={{ duration: 1 }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-8 border-4 border-gold/30 mx-auto shadow-inner">
              <img 
                src={MIRROR_PHOTO_URL} 
                alt="Pure Soul" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-serif italic text-4xl text-luxury-black mb-4 drop-shadow-sm">Pure. Mature. Unstoppable.</h3>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <p className="font-sans text-sm text-luxury-black font-medium leading-relaxed uppercase tracking-[0.2em]">
              A soul that shines brighter than any gold.
            </p>
          </motion.div>
        </div>

        {/* The Frost Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseUp={() => setIsDrawing(false)}
          onMouseMove={draw}
          onTouchStart={handleStart}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={draw}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${isCleared ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ filter: 'blur(4px)' }}
        />

        {!isCleared && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-luxury-black/60 pointer-events-none">
            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eraser size={20} className="text-gold" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Wipe to reveal her soul</span>
          </div>
        )}
      </div>
    </section>
  );
};

const AnushkaLibrary = () => {
  const [activeBook, setActiveBook] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h2 className="font-serif italic text-4xl text-luxury-black mb-4">The Library of Anushka</h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">Chapters of a beautiful story</p>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto pb-12 px-4 no-scrollbar snap-x">
        {BOOKS.map((book, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveBook(activeBook === i ? null : i)}
            className={`flex-shrink-0 snap-center cursor-pointer transition-all duration-500 ${activeBook === i ? 'w-80' : 'w-16'} h-96 rounded-xl overflow-hidden relative shadow-xl`}
          >
            <div className={`absolute inset-0 ${book.color} border-l-4 border-gold/30`} />
            
            {/* Spine */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${activeBook === i ? 'opacity-0' : 'opacity-100'}`}>
              <p className="font-serif italic text-gold text-lg whitespace-nowrap rotate-90 tracking-widest uppercase">
                {book.title}
              </p>
            </div>

            {/* Content */}
            <AnimatePresence>
              {activeBook === i && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute inset-0 p-8 flex flex-col justify-center text-cream"
                >
                  <div className="w-full h-32 mb-6 rounded-lg overflow-hidden border border-gold/20">
                    <img src={book.photo} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <BookOpen className="text-gold mb-4" size={24} />
                  <h3 className="font-serif italic text-xl mb-2">{book.title}</h3>
                  <p className="font-sans text-xs leading-relaxed opacity-80">{book.content}</p>
                  <div className="mt-6 w-12 h-[1px] bg-gold" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <p className="text-center font-sans text-[8px] uppercase tracking-[0.3em] text-gold/60 mt-4">Tap a book to read its chapter</p>
    </section>
  );
};

const FreedomCompass = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-[100] cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-16 h-16 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-gold/20 flex items-center justify-center group">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-gold"
        >
          <Compass size={32} strokeWidth={1.5} />
        </motion.div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-luxury-black text-cream text-[8px] uppercase tracking-[0.2em] px-3 py-1 rounded-full whitespace-nowrap border border-gold/20">
            Always pointing to Germany
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const BaddieBlueprint = () => {
  const traits = [
    { title: "Resilience", value: "100%", icon: <Zap className="text-gold" size={20} />, desc: "Never demotivated, always rising." },
    { title: "Soul Purity", value: "Infinite", icon: <Sparkles className="text-gold" size={20} />, desc: "A heart of gold, rare and true." },
    { title: "Current Mission", value: "Germany", icon: <Plane className="text-gold" size={20} />, desc: "Chasing freedom in the land of dreams." },
    { title: "Favorite Escape", value: "Books", icon: <BookOpen className="text-gold" size={20} />, desc: "Finding worlds within pages." },
    { title: "Vibe", value: "Taylor's Version", icon: <Music className="text-gold" size={20} />, desc: "Enthusiastic, bold, and poetic." },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h2 className="font-serif italic text-4xl text-luxury-black mb-4">The Baddie Blueprint</h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">Decoding a Masterpiece</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            style={{ willChange: "transform, opacity" }}
            className={`p-8 rounded-2xl border border-gold/10 bg-white/40 backdrop-blur-sm shadow-sm flex flex-col justify-between h-64 ${i === 0 || i === 4 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                {trait.icon}
              </div>
              <span className="font-serif italic text-3xl text-luxury-black/20">{trait.value}</span>
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-luxury-black mb-2">{trait.title}</h3>
              <p className="font-serif italic text-luxury-black/60 text-lg leading-relaxed">{trait.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LyricScroller = () => {
  const lyrics = [
    "Long live all the magic we made",
    "I had the time of my life fighting dragons with you",
    "Step into the daylight and let it go",
    "Everything you lose is a step you take",
    "Hold on to the memories, they will hold on to you"
  ];

  return (
    <section className="py-32 bg-luxury-black overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Quote className="text-gold/20 mx-auto mb-12" size={40} />
        <div className="space-y-24">
          {lyrics.map((lyric, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="font-serif italic text-3xl md:text-5xl text-cream/90 leading-tight"
            >
              "{lyric}"
            </motion.p>
          ))}
        </div>
        <p className="mt-24 font-sans text-[10px] uppercase tracking-[0.5em] text-gold/60">Taylor's Version</p>
      </div>
    </section>
  );
};

const GermanyPassport = () => {
  const [isStamped, setIsStamped] = useState(false);

  return (
    <div className="mt-24 flex flex-col items-center">
      <motion.div 
        className="relative w-72 h-96 bg-[#1a2a4a] rounded-xl shadow-2xl p-8 border-2 border-gold/20 overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        onClick={() => setIsStamped(true)}
      >
        {/* Passport Cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 text-gold">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2">European Union</p>
            <p className="text-sm uppercase tracking-[0.2em]">Federal Republic of Germany</p>
          </div>
          <div className="w-24 h-24 border-2 border-gold/40 rounded-full flex items-center justify-center">
            <Map size={48} strokeWidth={1} />
          </div>
          <div className="text-center">
            <p className="text-xl font-serif italic tracking-widest">PASSPORT</p>
          </div>
        </div>

        {/* Stamp Overlay */}
        <AnimatePresence>
          {isStamped && (
            <motion.div 
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -15 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="border-4 border-red-500/60 text-red-500/60 font-bold px-6 py-2 rounded-lg text-2xl uppercase tracking-tighter rotate-[-15deg] backdrop-blur-[1px]">
                APPROVED 2026
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inner Message (Revealed on Stamp) */}
        <motion.div 
          className="absolute inset-0 bg-cream p-8 flex flex-col items-center justify-center text-center z-10"
          initial={{ y: "100%" }}
          animate={{ y: isStamped ? 0 : "100%" }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
            <Heart className="text-gold" fill="currentColor" size={24} />
          </div>
          <h4 className="font-serif italic text-xl text-luxury-black mb-4">Your Freedom Awaits</h4>
          <p className="font-sans text-xs text-luxury-black/60 leading-relaxed">
            "The land of castles, dreams, and endless possibilities. Your journey to Germany is not just a dream, it's your destiny."
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsStamped(false); }}
            className="mt-8 text-[8px] uppercase tracking-[0.3em] text-gold hover:text-luxury-black transition-colors"
          >
            Close Passport
          </button>
        </motion.div>
      </motion.div>
      {!isStamped && (
        <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.3em] text-gold animate-pulse">Tap to stamp your future</p>
      )}
    </div>
  );
};

interface ParagraphCardProps {
  text: string;
  index: number;
  key?: number;
}

const ParagraphCard = ({ text, index }: ParagraphCardProps) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -50 : 50, 0, index % 2 === 0 ? 50 : -50]);
  
  // Liquid Glass Shimmer Effect
  const shimmerX = useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]);
  const textSkew = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <section ref={cardRef} className="min-h-[80vh] flex items-center justify-center p-6 perspective-2000 overflow-hidden">
      <motion.div
        style={{ rotateX, rotateZ, opacity, scale, x, willChange: "transform, opacity" }}
        className="glass-liquid w-full max-w-[450px] min-h-[400px] p-10 sm:p-12 rounded-[40px] flex flex-col justify-center relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-white/30"
      >
        {/* Shimmer Overlay */}
        <motion.div 
          style={{ x: shimmerX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-20"
        />

        {/* Animated Border Beam */}
        <motion.div 
          animate={{ 
            x: ["-100%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        
        <div className="flex items-center gap-6 mb-10">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            className="h-[1px] bg-gold"
          />
          <span className="text-[12px] font-bold uppercase tracking-[0.8em] text-gold">Chapter 0{index + 1}</span>
        </div>
        
        <motion.p 
          style={{ 
            skewX: textSkew, 
            y: textY, 
            scale: textScale,
            textShadow: useTransform(scrollYProgress, [0, 0.5, 1], [
              "0 0 0px rgba(197,160,89,0)",
              "0 0 20px rgba(197,160,89,0.3)",
              "0 0 0px rgba(197,160,89,0)"
            ])
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.7] font-light text-luxury-black/90 text-center italic relative z-10"
        >
          {text}
          {/* Liquid Reflection Layer */}
          <motion.span 
            className="absolute inset-0 text-gold/10 blur-[3px] pointer-events-none"
            style={{ 
              x: useTransform(scrollYProgress, [0, 1], [-10, 10]),
              y: useTransform(scrollYProgress, [0, 1], [5, -5])
            }}
          >
            {text}
          </motion.span>
        </motion.p>

        {/* Floating Luxury Orbs */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-gold/10 blur-[80px] rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose/5 blur-[100px] rounded-full"
        />
      </motion.div>
    </section>
  );
};

const BloomingBouquet = () => {
  // Use stable random values to prevent re-renders causing crashes
  const petals = useRef([...Array(25)].map(() => ({
    x: Math.random() * 1000 - 500,
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 5
  })));

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[700px] sm:h-[900px] flex items-center justify-center perspective-2000">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 text-center"
      >
        <motion.h2 
          className="font-serif text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-light tracking-tighter text-gradient-gold mb-8 leading-none px-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Happy Birthday <br />
          <span className="italic">Anushka</span>
        </motion.h2>
        <div className="w-40 sm:w-60 h-[1px] bg-gold/30 mx-auto mb-8" />
        <p className="font-display text-[10px] sm:text-sm uppercase tracking-[1em] sm:tracking-[1.5em] text-gold font-bold opacity-60">The One I Chose First.</p>
      </motion.div>

      {/* Unfurling Flowers - Interactive with Sound */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            initial={{ scale: 0, opacity: 0, rotate: i * 30 }}
            whileInView={{ 
              scale: [0, 1.5, 1.2], 
              opacity: [0, 0.8, 0.5],
              y: -250,
              rotate: i * 30 + 45
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.8, 
              rotate: i * 30 + 90,
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.8 }}
            transition={{ 
              duration: 4, 
              delay: i * 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom pointer-events-auto cursor-pointer"
          >
            <div className="relative">
              {i % 3 === 0 ? (
                <Flower2 size={80} className="text-gold/20" />
              ) : i % 3 === 1 ? (
                <Sparkles size={60} className="text-gold-light/30" />
              ) : (
                <Heart size={50} className="text-rose/10" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Petal Rain - Optimized for stability */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {petals.current.map((petal, i) => (
          <motion.div
            key={`petal-${i}`}
            initial={{ 
              x: petal.x, 
              y: -100, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: 1000, 
              rotate: 360,
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: petal.duration, 
              repeat: Infinity, 
              delay: petal.delay,
              ease: "linear"
            }}
            className="absolute w-2 h-4 bg-rose/20 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
};

const CountdownSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-white/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <span className="text-[10px] uppercase tracking-[1.2em] text-gold mb-12 block">The Grand Reveal In</span>
        <div className="scale-110 md:scale-150 mb-16">
          <Countdown onComplete={() => {}} />
        </div>
        
        <div className="flex flex-col items-center gap-4 group">
          <div className="flex items-center gap-4 px-8 py-3 rounded-full border border-gold/20 bg-gold/5 text-gold">
            <Lock size={16} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
              Locked Until 11.08.2026
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {VIDEO_URLS.map((url, index) => (
          <div 
            key={index} 
            className={`rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/20 mx-auto ${
              index === 1 ? 'aspect-[9/16] max-w-[350px]' : 'aspect-video w-full'
            }`}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src={url} 
              title={`A Moment for You - ${index + 1}`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

const FinalWish = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative bg-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10"
      >
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-luxury-black mb-8 leading-none">
          Happy Birthday, <br/> <span className="text-gold italic">Anushka.</span>
        </h2>
        <p className="font-serif italic text-xl md:text-3xl text-gold/60 max-w-2xl mx-auto leading-relaxed">
          "May your year be as bright as your smile and as beautiful as your soul."
        </p>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          className="h-[1px] bg-gold/40 mx-auto mt-12"
        />
      </motion.div>
    </section>
  );
};

const GermanyDream = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-luxury-black text-white">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ 
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-gold/20 rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 100, 0],
            rotate: [360, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full"
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gold font-sans text-[10px] uppercase tracking-[0.8em] mb-8 block"
        >
          The Future Awaits
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="font-serif italic text-5xl sm:text-7xl md:text-8xl mb-12 leading-tight"
        >
          A Journey to <br/> <span className="text-gold">Freedom</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
          >
            <h3 className="font-serif text-2xl mb-4 text-gold italic">The Germany Dream</h3>
            <p className="text-white/70 font-light leading-relaxed">
              Her heart beats for the streets of Berlin and the freedom of a new life. A simple girl with a dream so big, it spans continents. Germany isn't just a destination; it's the beginning of her true story.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
          >
            <h3 className="font-serif text-2xl mb-4 text-gold italic">The Library of Soul</h3>
            <p className="text-white/70 font-light leading-relaxed">
              Between the pages of her favorite books, she finds worlds as vast as her own ambition. Mature, understanding, and endlessly enthusiastic—she is a story still being written, and every chapter is pure gold.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent" />
          <p className="mt-6 font-script text-3xl text-gold">"Long live all the magic we made"</p>
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { scrollYProgress } = useScroll();

  const isLocked = new Date() < TARGET_DATE;

  // --- Effects ---
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.start();
    document.body.style.overflow = 'auto';

    return () => {
      lenis.destroy();
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-cream min-h-screen overflow-x-hidden selection:bg-gold/30 selection:text-luxury-black luxury-grain">
      <CursorGlow />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <DreamIntro onNext={() => setShowIntro(false)} onSkip={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <Lily delay={0} scale={0.8} />
                <Orchid delay={5} scale={1.2} />
                <Lily delay={10} scale={0.6} />
              </div>

              <div className="relative z-10 text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="text-[10px] uppercase tracking-[1em] text-gold font-bold mb-6 block">Est. 2026</span>
                  <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif italic text-luxury-black tracking-tighter leading-none mb-4">
                    Anushka<span className="text-gold">.</span>
                  </h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.2 }}
                    className="font-script text-3xl sm:text-4xl text-luxury-black mt-4"
                  >
                    The Enthusiastic Baddie
                  </motion.p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
              >
                <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-gold">Scroll to Explore</span>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4 text-gold" />
                </motion.div>
              </motion.div>
            </section>

            <CountdownSection />
            
            {new Date() >= TARGET_DATE && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <BaddieBlueprint />
                <FrostedSoulMirror />

                <div className="py-20">
                  {PARAGRAPHS.map((text, i) => (
                    <ParagraphCard key={i} text={text} index={i} />
                  ))}
                </div>

                <LyricScroller />
                <AnushkaLibrary />

                <GermanyDream />
                <GermanyPassport />
                <FreedomCompass />

                <PolaroidRoller />
                <BloomingBouquet />
                <VideoSection />
                <FinalWish />
              </motion.div>
            )}
            
            <footer className="py-24 text-center border-t border-gold/10 bg-white/50">
              <p className="font-serif italic text-luxury-black/40 text-sm">Created with love for a soul of pure gold.</p>
              
              <div className="mt-8 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.5em] text-luxury-black/60 font-light">
                  Designed & Crafted by <span className="text-gold font-medium">Harsh Pandya</span>
                </p>
                <p className="text-[8px] uppercase tracking-[0.4em] text-gold/40">© 2026 Forever Anushka</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-gold origin-left z-[160]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
