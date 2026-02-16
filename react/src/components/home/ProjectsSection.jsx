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
    <section id="project" className="container-fluid mt-4">
      <div id="projects-title" className="container">
        <div className="text-center">
          <small className="d-inline-block fw-bold text-dark text-uppercase mb-3">
            My Jobs
          </small>
          <h1 className="mb-5">My Projects</h1>
        </div>
      </div>
      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="category-buttons mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`btn category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="row">
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
