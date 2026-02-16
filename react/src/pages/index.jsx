import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import {
  Award,
  Camera,
  Target,
  Palette,
  Code,
  BarChart3,
  ArrowUpRight,
  Download,
  Mail,
  FileText,
  Github,
  Linkedin,
} from 'lucide-react';
import { useScrollToHash } from '../hooks/useScrollToHash.js';
import { projects, CATEGORIES } from '../data/projects.js';

const BASE = import.meta.env.BASE_URL || '/';

const Badge = ({ children, className = '' }) => (
  <span
    className={`px-2.5 py-1 rounded-md bg-white/60 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 shadow-sm ${className}`}
  >
    {children}
  </span>
);

const SectionLabel = ({ number, text, className = '' }) => (
  <div className={`flex items-center gap-4 mb-10 ${className}`}>
    <span className="text-[10px] font-mono text-blue-600 font-bold tracking-tighter">
      [{number}]
    </span>
    <div className="h-[1px] w-6 bg-blue-600/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300">{text}</span>
  </div>
);

const COLORS = ['bg-[#EEF2FF]', 'bg-[#F0FDF4]', 'bg-[#FFF7ED]', 'bg-[#F5F3FF]'];

export function HomePage() {
  useScrollToHash();
  const typedNameRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (!typedNameRef.current) return;
    const t = new Typed(typedNameRef.current, {
      strings: ['UX Designer', 'Frontend Dev', 'Visual Thinker', 'a Developer', 'a Designer'],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      backDelay: 2000,
    });
    return () => t.destroy();
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section
        id="home"
        className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Badge className="bg-blue-50 text-blue-600 border-none">Portfolio</Badge>
            <Badge className="bg-zinc-900 text-white border-none flex items-center gap-2">
              <Award size={12} className="text-yellow-400" /> Google UX Design Certified
            </Badge>
          </div>
          <h1 className="text-[44px] sm:text-[68px] md:text-[88px] font-black leading-[0.9] tracking-tighter mb-8">
            Xinping Wang
            <br />
            <span className="text-gray-200">Creative </span>
            <span
              ref={typedNameRef}
              className="text-black italic underline decoration-blue-500 underline-offset-8"
            />
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl leading-relaxed font-light mb-12">
            Transforming complex data into intuitive visual narratives. I blend industry-standard UX
            methodologies with clean code.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-blue-600/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Archer</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-100" />
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-blue-600/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Photographer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-32 bg-gray-50/50 px-6 md:px-12 lg:px-20 border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="01" text="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/40">
              <Palette size={24} className="mb-8 text-blue-600" />
              <h3 className="text-2xl font-black mb-4 tracking-tight">UX Design</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Applying Google UX methodologies to create human-centric products.
              </p>
            </div>
            <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/40">
              <Code size={24} className="mb-8 text-emerald-600" />
              <h3 className="text-2xl font-black mb-4 tracking-tight">Engineering</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Building robust front-end interfaces with React and modern web tools.
              </p>
            </div>
            <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/40">
              <BarChart3 size={24} className="mb-8 text-amber-600" />
              <h3 className="text-2xl font-black mb-4 tracking-tight">Data</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Visualizing behavior and patterns to drive design improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="project" className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="02" text="Projects" />
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${activeCategory === cat.value ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 9).map((p, i) => (
              <a
                key={p.id}
                href={p.repoUrl || p.externalUrl || p.demoUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-8 rounded-[2rem] border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-xl ${COLORS[i % COLORS.length]}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    {p.category}
                  </span>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-black mb-2 tracking-tight">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/80 text-[10px] font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {p.cover && (
                  <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-white/50">
                    <img
                      src={`${BASE}${p.cover.startsWith('/') ? p.cover.slice(1) : p.cover}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - 新布局，控制高度尽量在视口内 */}
      <section
        id="contact"
        className="py-12 md:py-16 text-white px-6 md:px-12 lg:px-20 rounded-tl-[5rem] md:rounded-tl-[8rem] relative overflow-hidden min-h-0"
        style={{ backgroundColor: '#000' }}
      >
        <div className="absolute -right-20 -bottom-20 text-[25rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
          XP
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionLabel number="03" text="Collaboration" className="text-slate-400" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-[36px] md:text-[64px] font-black tracking-tighter mb-6 leading-[0.95]">
                Let's build <br />
                something <br />
                <span className="text-blue-600 italic">remarkable.</span>
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:xinpingxh@gmail.com"
                  className="group flex items-center gap-6 w-fit"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shrink-0">
                    <Mail size={28} />
                  </div>
                  <div className="border-b border-white/10 pb-2">
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 mb-1">
                      Email Me
                    </p>
                    <p className="text-2xl font-light tracking-tight group-hover:text-blue-500 transition-colors">
                      xinpingxh@gmail.com
                    </p>
                  </div>
                </a>
                <div className="group flex items-center gap-6 w-fit">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shrink-0">
                    <FileText size={28} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 mb-2">
                      Curriculum Vitae
                    </p>
                    <a
                      href={`${BASE.endsWith('/') ? BASE.slice(0, -1) : BASE || ''}/resume/resume-new.pdf`}
                      download="resume-new.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 hover:text-white transition-all shadow-xl w-fit"
                    >
                      <Download size={18} />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-20 border-l border-white/5">
              <p className="text-slate-400 text-base font-light leading-relaxed mb-6">
                Every pixel adjusted and every line of code written is dedicated to creating more
                meaningful human-computer interactions.
              </p>
              <div className="flex gap-6 items-center">
                <a
                  href="https://github.com/w0436300"
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all text-white"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/xinping-w/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all text-white"
                >
                  <Linkedin size={24} />
                </a>
                <div className="h-px flex-1 bg-white/10 ml-4" />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-4 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
            © 2024 Xinping Wang — Based in Canada
          </div>
        </div>
      </section>
    </>
  );
}

export function ResumePage() {
  const baseTrim = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE || '';
  const pdfHref = `${baseTrim}/resume/resume-new.pdf`;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
      <div className="max-w-4xl">
        <h1 className="text-[44px] md:text-[72px] font-black tracking-tighter mb-10 leading-[0.95] text-black">
          Resume<span className="text-blue-600">.</span>
        </h1>
        <p className="text-xl text-gray-500 font-light mb-12 max-w-2xl">
          Download or view my resume below.
        </p>
        <a
          href={pdfHref}
          download="resume-new.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all h-12 px-6"
        >
          <Download size={16} />
          Download PDF
        </a>
      </div>
      <div className="mt-16 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50/50">
        <iframe
          src={pdfHref}
          title="Resume PDF"
          width="100%"
          height={900}
          style={{ border: 0 }}
          className="hidden md:block w-full"
        />
        <iframe
          src={pdfHref}
          title="Resume PDF (mobile)"
          style={{ width: '100%', height: 400, border: 0 }}
          className="block md:hidden w-full"
        />
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-black text-gray-200">404</h1>
      <p className="text-gray-500 mt-4">Page not found.</p>
    </div>
  );
}
