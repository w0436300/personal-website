import { useEffect } from 'react';

function resolveUrl(base, path) {
  if (!path) return null;
  const baseTrim = base.endsWith('/') ? base.slice(0, -1) : base || '';
  return path.startsWith('/') ? baseTrim + path : base + path;
}

export default function ProjectModal({ open, project, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const base = import.meta.env.BASE_URL || '/';
  const imgSrc = project
    ? resolveUrl(base, project.modalImage || project.cover)
    : null;
  const tech = project?.modalTech || (project?.tags?.length ? project.tags.join(', ') : null);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="projectModalTitle"
    >
      <div
        className="bg-light rounded shadow-lg overflow-hidden"
        style={{ maxWidth: '90vw', maxHeight: '90vh', width: 800 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2">
          <h5 id="projectModalTitle" className="mb-0">
            {project?.title}
          </h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal-body overflow-auto" style={{ maxHeight: '80vh' }}>
          <div className="row g-3">
            <div className="col-md-8">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt=""
                  className="img-fluid rounded"
                  style={{ width: '100%', objectFit: 'contain' }}
                />
              )}
            </div>
            <div className="col-md-4">
              <p className="text-muted">{project?.description}</p>
              {tech && (
                <div className="mb-3">
                  <h6>Technologies</h6>
                  <p className="small mb-0">{tech}</p>
                </div>
              )}
              <div className="d-flex flex-wrap gap-2">
                {project?.demoUrl && (
                  <a
                    href={resolveUrl(base, project.demoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Demo
                  </a>
                )}
                {project?.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Source Code
                  </a>
                )}
                {project?.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
