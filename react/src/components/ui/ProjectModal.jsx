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
      className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/50 z-[1050]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="projectModalTitle"
    >
      <div
        className="bg-gray-100 rounded-lg shadow-xl overflow-hidden max-w-[90vw] max-h-[90vh] w-full md:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 px-3 py-2">
          <h5 id="projectModalTitle" className="mb-0 text-lg font-semibold text-gray-900">
            {project?.title}
          </h5>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 before:content-['×'] before:text-2xl before:leading-none"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="overflow-auto max-h-[80vh] p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt=""
                  className="w-full object-contain rounded"
                />
              )}
            </div>
            <div className="md:col-span-4">
              <p className="text-gray-600 text-sm">{project?.description}</p>
              {tech && (
                <div className="mb-3 mt-2">
                  <h6 className="font-semibold text-gray-900">Technologies</h6>
                  <p className="text-sm text-gray-600 mb-0">{tech}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {project?.demoUrl && (
                  <a
                    href={resolveUrl(base, project.demoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Demo
                  </a>
                )}
                {project?.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Source Code
                  </a>
                )}
                {project?.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
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
