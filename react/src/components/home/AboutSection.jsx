import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const base = import.meta.env.BASE_URL || '/';
const photoSrc = `${base}img/photo.png`;

const NAME_STRINGS = ['Xinping', 'a Developer', 'a Designer', 'an Archer', 'a photographer'];
const DESC_STRING =
  'Design. Code. Analyze.<br/> I am passionate about transforming complex data into intuitive, engaging interfaces. My work blends creative design, front-end development, and powerful analytics to create impactful digital experiences.';

export default function AboutSection() {
  const typedNameRef = useRef(null);
  const typedDescRef = useRef(null);
  const instancesRef = useRef([]);

  useEffect(() => {
    const nameEl = typedNameRef.current;
    const descEl = typedDescRef.current;
    if (!nameEl || !descEl) return;

    const id = setTimeout(() => {
      const t1 = new Typed(nameEl, {
        strings: NAME_STRINGS,
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
      });
      const t2 = new Typed(descEl, {
        strings: [DESC_STRING],
        startDelay: 1,
        typeSpeed: 15,
        loop: false,
        showCursor: false,
        onComplete() {
          const container = document.querySelector('.about-socials');
          if (container) container.style.display = '';
          const links = container ? container.querySelectorAll('a') : [];
          links.forEach((link, index) => {
            setTimeout(() => {
              link.style.display = 'inline-block';
            }, index * 200);
          });
        },
      });
      instancesRef.current = [t1, t2];
    }, 0);
    return () => {
      clearTimeout(id);
      instancesRef.current.forEach((t) => t?.destroy?.());
      instancesRef.current = [];
    };
  }, []);

  return (
    <section id="about" className="w-full bg-gray-100 min-h-screen py-12 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-8 w-full">
          <div className="w-full md:w-1/2 md:flex-shrink-0">
            <img
              className="w-full h-auto object-contain max-h-[500px]"
              src={photoSrc}
              alt="Photo"
            />
          </div>
          <div className="w-full md:w-1/2 md:flex-shrink-0 flex flex-col justify-center text-left md:text-center min-w-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              I'm <span ref={typedNameRef} className="text-emerald-600" />
            </h1>
            <h4 className="text-base md:text-lg lg:text-xl text-gray-700 min-h-[3.5em]">
              <span ref={typedDescRef} className="typed-text" />
            </h4>
            <div className="about-socials flex gap-2 mt-4 justify-start md:justify-center" style={{ display: 'none' }}>
              <a
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/w0436300"
              >
                <i className="fab fa-github" />
              </a>
              <a
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/xinping-w/"
              >
                <i className="fab fa-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
