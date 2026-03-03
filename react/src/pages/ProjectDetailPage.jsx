import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';

function resolveUrl(base, path) {
  if (!path) return null;
  const baseTrim = base.endsWith('/') ? base.slice(0, -1) : base || '';
  return path.startsWith('/') ? baseTrim + path : base + path;
}

function getPrimaryImage(project) {
  return project?.modalImage || project?.cover || null;
}

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const base = import.meta.env.BASE_URL || '/';

  const project = useMemo(
    () => projects.find((p) => String(p.id) === String(projectId)),
    [projectId]
  );

  if (!project) {
    return (
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="mt-8 text-3xl md:text-4xl font-black tracking-tight">Project not found</h1>
          <p className="mt-3 text-gray-500">This project id doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const imgSrc = resolveUrl(base, getPrimaryImage(project));
  const demoHref = project.demoUrl ? resolveUrl(base, project.demoUrl) : null;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          {project.placeholderLabel ? (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              {project.placeholderLabel}
            </span>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  {Array.isArray(project.categories)
                    ? project.categories.join(' & ')
                    : project.category}
                </p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-2">
                  {project.title}
                </h1>
              </div>
            </div>

            {imgSrc ? (
              <div className="mt-8 rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50">
                <img src={imgSrc} alt="" className="w-full h-auto object-contain" />
              </div>
            ) : (
              <div className="mt-8 rounded-[2rem] border border-gray-200 border-dashed bg-gray-50 p-10 text-center">
                <p className="text-sm font-bold text-gray-600">No preview image</p>
                <p className="text-xs text-gray-500 mt-2">
                  Add a <code className="font-mono">cover</code> or{' '}
                  <code className="font-mono">modalImage</code> to show visuals here.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">About</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{project.description}</p>

              {project.tags?.length ? (
                <>
                  <h3 className="mt-8 text-sm font-black uppercase tracking-widest text-gray-400">
                    Tags
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}

              {project.modalTech ? (
                <>
                  <h3 className="mt-8 text-sm font-black uppercase tracking-widest text-gray-400">
                    Technologies
                  </h3>
                  <p className="mt-3 text-gray-600">{project.modalTech}</p>
                </>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-3">
                {demoHref && (
                  <a
                    href={demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-colors"
                  >
                    Demo <ArrowUpRight size={16} />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-black uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Repo <ArrowUpRight size={16} />
                  </a>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-black uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Link <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

