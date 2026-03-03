import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Target,
  Users,
  ArrowRight,
  Image as ImageIcon,
  GraduationCap,
  Microscope,
  ShieldCheck,
  ArrowDown,
  Code,
  Terminal,
  Layers,
} from 'lucide-react';

const PortfolioImage = ({ src, alt, className, description }) => {
  const [error, setError] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 ${className}`}
    >
      {error ? (
        <div className="flex flex-col items-center text-slate-400 p-8 text-center">
          <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-sm font-semibold">{alt}</p>
          <p className="text-[10px] uppercase tracking-wider mt-2 opacity-60">
            {description || 'System Screenshot'}
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default function AiTutorPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(0);
  const latestYRef = useRef(0);

  const sections = useMemo(
    () => [
      { id: 'Overview', label: 'Overview' },
      { id: 'Research', label: 'Research' },
      { id: 'Strategy', label: 'UX Strategy' },
      { id: 'Engineering', label: 'Engineering' },
      { id: 'Solutions', label: 'Solutions' },
      { id: 'Impact', label: 'Impact' },
    ],
    []
  );

  const accent = useMemo(() => {
    const map = {
      Overview: { primary: '#4F46E5', secondary: '#7C3AED' }, // indigo → violet
      Research: { primary: '#2563EB', secondary: '#06B6D4' }, // blue → cyan
      Strategy: { primary: '#7C3AED', secondary: '#EC4899' }, // violet → pink
      Engineering: { primary: '#22C55E', secondary: '#10B981' }, // green → emerald
      Solutions: { primary: '#F97316', secondary: '#EAB308' }, // orange → yellow
      Impact: { primary: '#0EA5E9', secondary: '#4F46E5' }, // sky → indigo
    };
    return map[activeSection] || map.Overview;
  }, [activeSection]);

  useEffect(() => {
    const computeAndSet = () => {
      rafRef.current = 0;
      const y = latestYRef.current;
      setScrolled(y > 50);

      // Global scroll progress (0–100) used for the header bar.
      const doc = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(doc?.scrollHeight || 0, body?.scrollHeight || 0);
      const max = Math.max(1, scrollHeight - window.innerHeight);
      setScrollProgress(Math.max(0, Math.min(100, (y / max) * 100)));

      // Active section: last section whose top has crossed a threshold.
      const ids = sections.map((s) => s.id);
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
      if (!els.length) return;

      const threshold = 120; // px from top (accounts for fixed nav)
      let active = ids[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= threshold) active = el.id;
      }
      setActiveSection(active);
    };

    const onScrollOrResize = () => {
      latestYRef.current = window.scrollY || 0;
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(computeAndSet);
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Track which section is most visible to drive the nav underline
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const ratios = {};
    ids.forEach((id) => {
      ratios[id] = 0;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        const maxId = ids.reduce((a, b) => (ratios[a] >= ratios[b] ? a : b), ids[0]);
        if (ratios[maxId] > 0) setActiveSection(maxId);
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-indigo-100 scroll-smooth pb-20">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
        style={{ '--accent': accent.primary }}
      >
        <div className="relative">
          {/* 全局滚动进度条（整体下划线） */}
          <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-slate-200/60 overflow-hidden">
            <div
              className="h-full will-change-[width]"
              style={{
                width: `${Math.max(2, scrollProgress)}%`,
                backgroundImage: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
                <span className="text-white font-bold text-xl italic">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Ami System</span>
              <a
                href="https://w0436300.github.io/Ami-React/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm transition-colors"
                style={{ backgroundColor: '#166534' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#166534';
                }}
              >
                View Demo
              </a>
            </div>
            <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`transition-colors hover:text-[var(--accent)] ${
                    activeSection === s.id
                      ? 'text-[var(--accent)]'
                      : scrolled
                        ? 'text-slate-500'
                        : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:xinpingxh@gmail.com"
              className="bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all active:scale-95 shadow-lg shadow-black/5"
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      <section id="Overview" className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black tracking-[0.2em] uppercase">
                AI-Powered Education • UX Case Study
              </span>
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-extrabold leading-[0.9] mb-8 tracking-tighter">
              Ami: Human-AI <br />
              <span className="text-[#5FA9B8]">
                Cognitive <br />
                Co-Learning.
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
              Eliminating &quot;one-size-fits-all&quot; learning through multi-agent AI framework and
              pedagogically-driven interface adaptation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-slate-100">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
                  My Roles
                </span>
                <div className="flex flex-wrap gap-2">
                  {['User Research', 'UX/UI Design', 'Frontend Dev'].map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2 block">
                  Nature
                </span>
                <span className="font-bold text-slate-800 text-sm">Team Collaboration Project</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">
                  Client
                </span>
                <p className="text-sm text-slate-700 font-semibold">
                  Dr. Ali Abbas — CEO of Smart Digital Medicine, Adjunct Professor at uOttawa
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">
                  Technical Advisor
                </span>
                <p className="text-sm text-slate-700 font-semibold">
                  Prof. Ismaeel Al-Ridhawi — Associate Professor, School of Electrical Engineering and
                  Computer Science, uOttawa
                </p>
              </div>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
            <PortfolioImage
              src="image_b8fffc.jpg"
              alt="Ami Hero Preview"
              className="relative rounded-[3rem] shadow-2xl border-[12px] border-white aspect-[4/3]"
              description="Adaptive Learning Dashboard"
            />
          </div>
        </div>
        <div className="flex justify-center mt-12 animate-bounce opacity-20">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      <section id="Research" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
              Discovery Phase
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight">Decoding the Learning Friction</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" /> User Research
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  I conducted qualitative interviews with 15+ lifelong learners. The primary finding
                  was a &quot;Motivation Gap&quot; caused by irrelevant content delivery and a lack of
                  clear skill-to-goal mapping.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-500" /> Defining &quot;The Why&quot;
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed text-balance">
                  Users expressed anxiety when faced with &quot;one-size-fits-all&quot; paths. They
                  needed a system that &quot;knows them&quot; and adjusts content to their specific
                  cognitive style.
                </p>
              </div>
            </div>
            <div className="relative p-1 rounded-[3rem] bg-white shadow-xl overflow-hidden">
              <PortfolioImage
                src="image_b8e8e1.jpg"
                alt="Future Journey Map"
                className="w-full aspect-[4/3] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                description="Journey Mapping: From Confusion to Empowerment"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="Strategy" className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
              UX Strategy
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight">
              Turning Pedagogy into Interaction
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-12 bg-white rounded-[4rem] shadow-sm border border-slate-100">
              <Microscope className="w-12 h-12 text-indigo-600 mb-8" />
              <h4 className="text-2xl font-bold mb-4">Cognitive Style Adaptation</h4>
              <p className="text-slate-500 leading-relaxed mb-10 text-sm">
                I utilized the <strong>Felder-Silverman (FSLSM)</strong> model as a framework for{' '}
                <strong>Adaptive UI</strong>. Instead of static layouts, the interface reconfigures
                itself to match user cognitive profiles.
              </p>
              <div className="space-y-3">
                <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                    Visual Persona
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold italic">
                    Hierarchical &amp; Graphic Content
                  </span>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Verbal Persona
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold italic">
                    Narrative-Driven Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="p-12 bg-white rounded-[4rem] shadow-sm border border-slate-100">
              <GraduationCap className="w-12 h-12 text-violet-600 mb-8" />
              <h4 className="text-2xl font-bold mb-4">SOLO-based Feedback Loops</h4>
              <p className="text-slate-500 leading-relaxed mb-10 text-sm">
                To provide meaningful feedback, I integrated the <strong>SOLO Taxonomy</strong>. This
                allowed us to design a rubric-based assessment UI that grades cognitive depth beyond
                simple keyword matching.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['Uni-structural', 'Relational', 'Abstract'].map((item) => (
                  <div
                    key={item}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center"
                  >
                    <span className="text-[10px] font-bold text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest italic">
                Measuring Mastery, Not just Memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="Engineering" className="py-32 px-6 text-slate-900 relative" style={{ backgroundColor: '#C8E6ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-[0.3em] mb-4">
              UX Engineering
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight">Architecting the Frontend</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-8">Building the Bridge</h4>
              <p className="text-slate-700 mb-10 leading-relaxed">
                As the <strong>Lead Frontend Engineer</strong>, I didn&apos;t just design the
                components; I built the React architecture that powers the real-time AI content
                delivery and multi-agent interaction.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white/50 rounded-3xl border border-white/60 group hover:border-indigo-500/40 transition-colors">
                  <Terminal className="w-6 h-6 text-slate-800 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">React Component Architecture</span>
                     <p className="text-xs text-slate-700/80 mt-1">
                      Modular components that sync seamlessly with LLM streaming APIs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/50 rounded-3xl border border-white/60 group hover:border-indigo-500/40 transition-colors">
                  <Layers className="w-6 h-6 text-slate-800 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">Passive Data Ingestion</span>
                     <p className="text-xs text-slate-700/80 mt-1">
                      Implemented behavioral hooks to gather cognitive signals without user friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="p-10 bg-white/55 rounded-[4rem] border border-white/60 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                  <Code className="w-8 h-8 text-slate-800" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                    Development Stack
                  </span>
                </div>
                <div className="space-y-4 font-mono text-[10px]">
                    <div className="p-3 bg-white/60 rounded-xl border border-white/70">
                    UI Library: React 18 + Tailwind CSS
                  </div>
                    <div className="p-3 bg-white/60 rounded-xl border border-white/70">
                    State: Custom Context Hooks
                  </div>
                    <div className="p-3 bg-white/60 rounded-xl border border-white/70">
                    AI Logic: LangChain Agent Integration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Solutions" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
              Design Execution
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight">The Resulting Interface</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center mb-48">
            <div className="order-2 lg:order-1">
              <PortfolioImage
                src="image_b8ffc4.jpg"
                alt="Resume-Aware Skill Gap"
                className="rounded-[4rem] shadow-2xl aspect-[4/3] border border-slate-100"
                description="Resume-Driven Skill Personalization"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h4 className="text-3xl font-extrabold mb-6 tracking-tight">
                Resume-Aware Personalization
              </h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                I designed the onboarding flow to ingest resumes or LinkedIn profiles. This allows
                the system to calibrate the <strong>Skill Gap Identifier</strong> instantly, avoiding
                redundant content for experienced professionals.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 p-5 rounded-3xl border border-indigo-100 shadow-sm shadow-indigo-100/50">
                <ShieldCheck className="w-5 h-5" />
                Bias-Auditor Auditor Integrated
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <h4 className="text-3xl font-extrabold mb-6 tracking-tight">
                Context-Aware Learning Canvas
              </h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                The learning canvas features a persistent <strong>Mentor AI</strong>. My design
                ensures that the agent&apos;s feedback is grounded in verified sources, creating a
                seamless and trustable dialog for the learner.
              </p>
              <div className="flex gap-4">
                <span className="px-5 py-3 bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-white italic">
                  Interactive AI Sidebar
                </span>
                <span className="px-5 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                  RAG Grounded Content
                </span>
              </div>
            </div>
            <div className="relative">
              <PortfolioImage
                src="image_b8ff29.jpg"
                alt="Content Delivery"
                className="rounded-[4rem] shadow-2xl aspect-[4/3] border border-slate-100"
                description="Final Delivery: Adaptive Content Modules"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="Impact" className="py-32 px-6" style={{ backgroundColor: '#C8E6ED' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
              Analytics &amp; Outcomes
            </h2>
            <h3 className="text-4xl font-extrabold mb-6 tracking-tight">Data-Driven Achievement</h3>
            <p className="text-slate-500 leading-relaxed">
              I implemented a <strong>Bento Grid</strong> dashboard to modularize complex learning
              analytics. This structure makes progress tangible, resulting in higher user retention
              and clearer growth awareness.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white text-left">
                <span className="text-4xl font-black block mb-2 tracking-tighter">2.4x</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Learning Velocity Boost
                </p>
              </div>
              <div className="p-10 bg-indigo-600 rounded-[3.5rem] text-white text-left shadow-2xl shadow-indigo-100">
                <span className="text-4xl font-black block mb-2 tracking-tighter">90%</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
                  Retention Improvement
                </p>
              </div>
            </div>
            <div className="relative">
              <PortfolioImage
                src="image_b8ff24.jpg"
                alt="Analytics Dashboard"
                className="rounded-[4rem] shadow-2xl aspect-[4/3] border border-white"
                description="Responsive Analytics Overview"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 text-center relative overflow-hidden" style={{ backgroundColor: '#0B3B4A' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C8E6ED]/15 blur-[120px] rounded-full" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl font-extrabold mb-10 text-white tracking-tighter leading-tight">
            Bridging Pedagogy <br /> &amp; Engineering.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:xinpingxh@gmail.com"
              className="bg-white text-slate-900 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-white/5"
            >
              Let&apos;s Chat{' '}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a
              href="/resume"
              className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Download Resume
            </a>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                <span className="text-white text-[10px] italic">A</span>
              </div>
              <span>Ami Case Study • Team Collaboration Project</span>
            </div>
            <p>© 2025 · Designed &amp; Engineered with Care</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

