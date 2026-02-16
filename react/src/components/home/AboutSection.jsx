import { useEffect, useRef } from 'react';

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
    if (typeof window.Typed === 'undefined') return;
    const nameEl = typedNameRef.current;
    const descEl = typedDescRef.current;
    if (!nameEl || !descEl) return;

    const t1 = new window.Typed(nameEl, {
      strings: NAME_STRINGS,
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
    });
    const t2 = new window.Typed(descEl, {
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
    return () => {
      instancesRef.current.forEach((t) => t?.destroy?.());
      instancesRef.current = [];
    };
  }, []);

  return (
    <section id="about" className="container-fluid bg-light py-6 my-6 mt-0 vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto position-relative">
            <div className="text-on-image">
              <img
                className="img-fluid personal-photo"
                style={{ width: 'auto', height: '500px' }}
                src={photoSrc}
                alt="Photo"
              />
              <div className="overlay-content text-start">
                <h1 className="display-1 mb-4">
                  I'm <span ref={typedNameRef} className="text-primary custom-primary" />
                </h1>
                <h4>
                  <span ref={typedDescRef} className="typed-text" />
                </h4>
                <div className="about-socials social-links-container icon" style={{ display: 'none' }}>
                  <a
                    className="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/w0436300"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a
                    className="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn"
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
        </div>
      </div>
    </section>
  );
}
