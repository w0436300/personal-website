import { useScrollToHash } from '../hooks/useScrollToHash.js';
import AboutSection from '../components/home/AboutSection.jsx';
import SkillsSection from '../components/home/SkillsSection.jsx';
import ProjectsSection from '../components/home/ProjectsSection.jsx';
import ContactSection from '../components/home/ContactSection.jsx';

export function HomePage() {
  useScrollToHash();

  return (
    <div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export function ResumePage() {
  const base = import.meta.env.BASE_URL || '/';
  const baseTrim = base.endsWith('/') ? base.slice(0, -1) : base;
  const pdfHref = `${baseTrim || ''}/resume/resume-new.pdf`;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-center mt-4 text-2xl font-bold text-gray-900">Resume</h1>
      <div className="text-center mt-6">
        <a
          href={pdfHref}
          download="resume-new.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
        >
          Download Resume
        </a>
      </div>
      <iframe
        src={pdfHref}
        title="Resume PDF"
        width="100%"
        height={900}
        style={{ border: 0 }}
        className="hidden md:block mt-4"
      />
      <iframe
        src={pdfHref}
        title="Resume PDF (mobile)"
        style={{ width: '100%', height: 300, border: 0 }}
        className="block md:hidden mt-4"
      />
    </div>
  );
}

export function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}
