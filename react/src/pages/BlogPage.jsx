import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const BASE = import.meta.env.BASE_URL || '/';
const PERSONAL_PHOTO = `${BASE}img/photo.png`;
const CERTIFICATE_IMAGES = [
  `${BASE}img/certificate.png`,
  `${BASE}img/certificate2.jpg`,
  `${BASE}img/certificate3.jpg`,
];

const GALLERY_IMGS = ['img/gallery/photo1.jpg', 'img/gallery/photo2.jpg', 'img/gallery/photo3.jpg', 'img/gallery/photo4.jpg'];

function pickRandomGalleryThree() {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, 3).map((i) => `${BASE}${GALLERY_IMGS[i]}`);
}

const Badge = ({ children, className = '' }) => (
  <span
    className={`px-2.5 py-1 rounded-md bg-white/60 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 shadow-sm ${className}`}
  >
    {children}
  </span>
);

const SectionLabel = ({ number, text }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="text-[10px] font-mono text-blue-600 font-bold tracking-tighter">
      [{number}]
    </span>
    <div className="h-[1px] w-6 bg-blue-600/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300">{text}</span>
  </div>
);

export default function BlogPage() {
  const [galleryThree, setGalleryThree] = useState(() => pickRandomGalleryThree());
  const [certIndex, setCertIndex] = useState(0);
  const certImages = CERTIFICATE_IMAGES;
  const hasMultipleCerts = certImages.length > 1;

  useEffect(() => {
    const id = setInterval(() => setGalleryThree(pickRandomGalleryThree()), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 md:px-20 py-32 border-b border-gray-50">
        <Link
          to="/"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-blue-600 transition-colors mb-16 w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 items-start lg:items-end">
          <div className="relative group shrink-0">
            <div className="w-40 h-56 md:w-56 md:h-72 bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src={PERSONAL_PHOTO}
                alt="Xinping Wang Profile"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Camera size={20} />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.8] mb-8">
              Journal<span className="text-blue-600">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
              A space for professional reflections, creative captures, and my continuous journey in
              UX and beyond.
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-24">
          <section>
            <SectionLabel number="01" text="Learning Reflections" />
            <div className="space-y-16">
              <article className="group">
                <div className="flex gap-4 mb-6 items-center">
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest">
                    January 2026
                  </span>
                  <div className="h-px w-8 bg-gray-100" />
                  <Badge className="bg-blue-50 text-blue-600 border-none">UX Certificate</Badge>
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-blue-600 transition-colors tracking-tight">
                  Empathy at Scale: What Google UX Taught Me.
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg font-light mb-8 italic">
                  "Empathy is not just feeling what others feel—it's turning complex human needs into
                  actionable design criteria."
                </p>
                <p className="text-gray-500 leading-relaxed text-lg font-light mb-8">
                  In pursuing the Google UX certificate, what struck me most was its rigorous
                  approach to User Research. Starting from Empathize, every step is backed by clear
                  logic. It made me see that design is never a flash of inspiration—it's the result
                  of careful thought.
                </p>
              </article>

              <div className="p-12 bg-gray-50 rounded-[3rem] border border-gray-100">
                <Quote className="text-blue-600/20 mb-6" size={48} />
                <p className="text-2xl font-medium tracking-tight text-gray-800 leading-snug">
                  "The goal of a designer is to listen, observe, understand, sympathize, empathize,
                  synthesize, and glean insights that enable him or her to make the invisible
                  visible."
                </p>
                <p className="mt-8 text-xs font-black uppercase tracking-widest text-gray-400">
                  — Hillman Curtis
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-20">
          <section>
            <SectionLabel number="02" text="Gallery" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-video bg-gray-100 rounded-3xl overflow-hidden group">
                <img
                  key={galleryThree[0]}
                  src={galleryThree[0]}
                  className="w-full h-full object-cover transition-all duration-700"
                  alt="Gallery"
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                <img
                  key={galleryThree[1]}
                  src={galleryThree[1]}
                  className="w-full h-full object-cover transition-all"
                  alt="Gallery"
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                <img
                  key={galleryThree[2]}
                  src={galleryThree[2]}
                  className="w-full h-full object-cover transition-all"
                  alt="Gallery"
                />
              </div>
            </div>
            <p className="mt-4 text-[10px] text-gray-300 font-medium uppercase tracking-[0.2em] text-center">
              Moments captured during design pauses
            </p>
          </section>

          <section>
            <SectionLabel number="03" text="Recognition" />
            <div className="space-y-6">
              <div className="group relative">
                <div className="aspect-[4/3] bg-zinc-900 rounded-3xl overflow-hidden mb-4 relative">
                  <img
                    key={certIndex}
                    src={certImages[certIndex]}
                    alt="Certificate"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Award
                      className="text-yellow-400 opacity-20 group-hover:opacity-100 transition-opacity"
                      size={60}
                    />
                  </div>
                  {hasMultipleCerts && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCertIndex((i) => (i - 1 + certImages.length) % certImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Previous certificate"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCertIndex((i) => (i + 1) % certImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-lg transition-colors"
                        aria-label="Next certificate"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                <h4 className="font-black text-sm uppercase tracking-wider mb-1">
                  Google UX Professional
                </h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  In progress • Coursera
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="px-6 md:px-20 py-20 text-center border-t border-gray-50">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
          Designed by Xinping Wang — 2024
        </p>
      </footer>
    </div>
  );
}
