import { useState } from 'react';
import { projects, CATEGORIES } from '../../data/projects.js';
import ProjectCard from '../ui/ProjectCard.jsx';
import ProjectModal from '../ui/ProjectModal.jsx';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const base = import.meta.env.BASE_URL || '/';

  return (
    <section id="project" className="w-full mt-6">
      <div id="projects-title" className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <small className="inline-block font-bold text-gray-900 uppercase tracking-wide mb-3">
            My Jobs
          </small>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
        </div>
      </div>
      <div>
        <div className="py-8 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  base={base}
                  onDetailsClick={(p) => setModalProject(p)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={!!modalProject}
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
