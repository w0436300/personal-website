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
  const linkDemo = demoHref ? (
    <a className="link-style" href={demoHref} target="_blank" rel="noopener noreferrer">
      Demo
    </a>
  ) : null;
  const linkRepo = project.repoUrl ? (
    <a className="link-style" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
      Source Code
    </a>
  ) : null;
  const linkExternal = project.externalUrl ? (
    <a className="link-style" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
      {project.title.includes('Power BI') ? 'Power BI' : project.title.includes('KOII') ? 'Link' : 'Source Code'}
    </a>
  ) : null;

  const imageEl = coverSrc ? (
    <img
      className="card-img-top"
      src={coverSrc}
      alt=""
      style={{ height: 225, width: '100%', display: 'block', objectFit: 'cover' }}
    />
  ) : null;

  return (
    <div className="col-md-4 project-card">
      <div className="card mb-4 box-shadow project-img">
        {coverSrc && (
          <>
            {showDetails ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onDetailsClick(project)}
                onKeyDown={(e) => e.key === 'Enter' && onDetailsClick(project)}
                style={{ cursor: 'pointer' }}
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
        <div className="card-body">
          <h5 className="project-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          {project.tags?.length > 0 && (
            <p className="custom-primary card-text">{project.tags.join(', ')}</p>
          )}
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            {linkDemo}
            {linkRepo}
            {linkExternal}
            {showDetails && (
              <button
                type="button"
                className="btn btn-link link-style p-0"
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
