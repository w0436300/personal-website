import { useState, useEffect, useRef } from 'react';

const base = import.meta.env.BASE_URL || '/';
const img = (name) => `${base}img/logos/${name}`;

const SKILLS = [
  {
    name: 'Frontend',
    percent: 95,
    barClass: 'bg-cyan-500',
    logos: ['react.png', 'js.png', 'bootstrap.png', 'html.png', 'vue.png'],
  },
  {
    name: 'Backend',
    percent: 90,
    barClass: 'bg-green-500',
    logos: ['nodejs.png', 'express.png', 'mongodb.png', 'mysql.png'],
  },
  {
    name: 'Design',
    percent: 97,
    barClass: 'bg-amber-500',
    logos: ['ps.png', 'ai.png', 'figma.png', 'sketch.png'],
  },
  {
    name: 'Others',
    percent: 90,
    barClass: 'bg-red-500',
    logos: ['jira.png', 'git.png'],
  },
];

const SERVICE_ITEMS = [
  {
    icon: 'fa-magic',
    title: 'Full Stack Development',
    text: 'Experienced in React, Next.js, Node.js, Express.js, and databases (MySQL, MongoDB) to build scalable web applications. Proficient in Git, Docker, and CI/CD pipelines (GitHub Actions, Azure DevOps) for efficient development workflows.',
  },
  {
    icon: 'fa-pen',
    title: 'Data Analytics & Visualization',
    text: 'Skilled in Power BI, Tableau, SQL, Pandas, and NumPy to analyze data and create interactive dashboards. Experienced in text classification, clustering, and geospatial analysis for data-driven decision-making.',
  },
  {
    icon: 'fa-pen',
    title: 'Design',
    text: 'Combining visual design and front-end development, I create intuitive, accessible user interfaces. Proficient in Figma, Adobe Creative Suite, and D3.js for UX research and interactive design.',
  },
];

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { root: null, threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full bg-gray-100 py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div id="skills-title" className="text-center">
            <small className="inline-block font-bold text-gray-900 uppercase tracking-wide mb-3">
              Skills I can provides
            </small>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">My Skills</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-6">
          <div id="skills-left" className="md:col-span-7 min-w-0">
            <div className="flex flex-col gap-6">
              {SERVICE_ITEMS.map((item, i) => (
                <div key={i} className="w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-sm">
                      <i className={`fa ${item.icon} text-gray-700`} />
                    </div>
                    <span className="w-0 flex-1" aria-hidden />
                  </div>
                  <h5 className="text-emerald-600 font-semibold text-lg mb-2">
                    {item.title}
                  </h5>
                  <p className="text-left text-gray-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            id="skills-right"
            className="md:col-span-5 flex items-center min-w-0"
          >
            <div className="w-full">
              {SKILLS.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center gap-2">
                    <p className="flex-1 text-left text-gray-800 font-medium">
                      {skill.name}
                    </p>
                    <div className="flex-1 flex justify-end gap-2 flex-wrap">
                      {skill.logos.map((logo) => (
                        <img
                          key={logo}
                          className="max-w-full h-8 w-auto object-contain"
                          src={img(logo)}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className={
                      index < SKILLS.length - 1
                        ? 'h-2 bg-gray-200 rounded-full overflow-hidden mb-3'
                        : 'h-2 bg-gray-200 rounded-full overflow-hidden'
                    }
                  >
                    <div
                      className={`h-full rounded-full ${skill.barClass}`}
                      role="progressbar"
                      style={{
                        width: visible ? `${skill.percent}%` : '0%',
                        transition: 'width 900ms ease',
                      }}
                      aria-valuenow={visible ? skill.percent : 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
