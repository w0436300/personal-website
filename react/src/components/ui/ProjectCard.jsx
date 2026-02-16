function resolveUrl(base, path) {
  if (!path) return null;
  const baseTrim = base.endsWith('/') ? base.slice(0, -1) : base || '';
  return path.startsWith('/') ? baseTrim + path : base + path;
}

export default function ProjectCard({ project, base, onDetailsClick }) {
  const coverSrc = resolveUrl(base, project.cover);
  const hasModal = !!(project.modalImage || (project.modalTech && project.cover));
  const showDetails = hasModal && onDetailsClick;

  const demoHref = project.demoUrl ? resolveUrl(base, project.demoUrl) : null;
  const imageLinkHref = demoHref || project.externalUrl || project.repoUrl || null;
  const linkClass = 'text-blue-600 hover:underline';
  const linkDemo = demoHref ? (
    <a className={linkClass} href={demoHref} target="_blank" rel="noopener noreferrer">
      Demo
    </a>
  ) : null;
  const linkRepo = project.repoUrl ? (
    <a className={linkClass} href={project.repoUrl} target="_blank" rel="noopener noreferrer">
      Source Code
    </a>
  ) : null;
  const linkExternal = project.externalUrl ? (
    <a className={linkClass} href={project.externalUrl} target="_blank" rel="noopener noreferrer">
      {project.title.includes('Power BI') ? 'Power BI' : project.title.includes('KOII') ? 'Link' : 'Source Code'}
    </a>
  ) : null;

  const imageEl = coverSrc ? (
    <img
      className="w-full h-[225px] object-cover block"
      src={coverSrc}
      alt=""
    />
  ) : null;

  return (
    <div className="w-full">
      <div className="mb-6 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
        {coverSrc && (
          <>
            {showDetails ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onDetailsClick(project)}
                onKeyDown={(e) => e.key === 'Enter' && onDetailsClick(project)}
                className="cursor-pointer"
              >
                {imageEl}
              </div>
            ) : imageLinkHref ? (
              <a href={imageLinkHref} target="_blank" rel="noopener noreferrer">
                {imageEl}
              </a>
            ) : (
              imageEl
            )}
          </>
        )}
        <div className="p-4">
          <h5 className="text-emerald-600 font-semibold text-lg mb-2">{project.title}</h5>
          <p className="text-gray-700 text-sm mb-2">{project.description}</p>
          {project.tags?.length > 0 && (
            <p className="text-emerald-600 text-sm">{project.tags.join(', ')}</p>
          )}
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-2">
            {linkDemo}
            {linkRepo}
            {linkExternal}
            {showDetails && (
              <button
                type="button"
                className="text-blue-600 hover:underline p-0 bg-transparent border-0 cursor-pointer"
                onClick={() => onDetailsClick(project)}
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
