import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Zap,
  Briefcase,
  Mail,
  BookOpen,
  FileText,
  Menu,
  X,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', icon: User, href: '#home', type: 'anchor' },
  { name: 'Skills', icon: Zap, href: '#skills', type: 'anchor' },
  { name: 'Project', icon: Briefcase, href: '#project', type: 'anchor' },
  { name: 'Contact', icon: Mail, href: '#contact', type: 'anchor' },
];

const BASE = import.meta.env.BASE_URL || '/';

const SECTION_IDS = ['home', 'skills', 'project', 'contact'];

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    if (!isHome) return;
    const ratios = {};
    SECTION_IDS.forEach((id) => { ratios[id] = 0; });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (SECTION_IDS.includes(id)) ratios[id] = entry.intersectionRatio;
        });
        const maxId = SECTION_IDS.reduce((a, b) => (ratios[a] >= ratios[b] ? a : b));
        if (ratios[maxId] > 0) setActiveSection(maxId);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    const t = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }, 100);
    return () => {
      clearTimeout(t);
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) try { io.unobserve(el); } catch (_) {}
      });
    };
  }, [isHome]);

  const handleNav = (link) => {
    if (link.type === 'anchor') {
      if (!isHome) {
        navigate('/' + link.href);
        setTimeout(() => {
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(link.href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (window.history.replaceState) window.history.replaceState(null, '', link.href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Sidebar - 始终显示，用内联样式避免被全局 .hidden 覆盖 */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'w-24 p-6' : 'w-56 p-8'}`}
        style={{ display: 'flex' }}
      >
        <div className="flex flex-col h-full justify-between overflow-hidden">
          <div>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-10 h-10 mb-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-black"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={goHome}
              className={`cursor-pointer text-2xl font-black tracking-tighter mb-16 block group whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 h-0 pointer-events-none overflow-hidden' : 'opacity-100'}`}
            >
              XP<span className="text-blue-600 group-hover:ml-1 transition-all">.</span>
            </button>

            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const id = link.href.slice(1);
                const isActive = isHome && activeSection === id;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNav(link)}
                    className={`group flex items-center gap-4 transition-all w-full text-left ${isSidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}
                  >
                    <span className={`transition-colors shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-200 group-hover:text-blue-600'}`}>
                      <Icon size={18} />
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                        {link.name}
                      </span>
                    )}
                  </button>
                );
              })}

              {!isSidebarCollapsed && <div className="h-px bg-gray-100 w-full my-2" />}

              <button
                type="button"
                onClick={() => {
                  navigate('/blog');
                  setIsMobileMenuOpen(false);
                }}
                className={`group flex items-center gap-4 transition-all w-full text-left ${isSidebarCollapsed ? 'justify-center' : ''} ${location.pathname === '/blog' ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}
              >
                <span
                  className={`transition-colors shrink-0 ${location.pathname === '/blog' ? 'text-blue-600' : 'text-gray-200 group-hover:text-blue-600'}`}
                >
                  <BookOpen size={18} />
                </span>
                {!isSidebarCollapsed && (
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Blog</span>
                )}
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <button
              type="button"
              onClick={() => navigate('/resume')}
              className={`flex items-center justify-center gap-2 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all h-12 ${isSidebarCollapsed ? 'w-12 p-0 shrink-0' : 'w-full px-4'}`}
            >
              <FileText size={16} />
              {!isSidebarCollapsed && 'Resume'}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile nav - 小屏时通过 CSS 媒体查询显示 */}
      <nav className="sidebar-mobile-nav fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button type="button" onClick={goHome} className="text-xl font-black tracking-tighter">
          XP.
        </button>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black p-1"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 px-6 sidebar-mobile-overlay"
          aria-hidden
        >
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const id = link.href.slice(1);
              const isActive = isHome && activeSection === id;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNav(link)}
                  className={`flex items-center gap-4 text-left ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                navigate('/blog');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-4 text-left text-gray-600 hover:text-blue-600"
            >
              <BookOpen size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Blog</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/resume');
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest"
            >
              <FileText size={16} />
              Resume
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main
        className={`transition-all duration-500 ease-in-out min-h-screen sidebar-main ${isSidebarCollapsed ? 'pl-24' : 'pl-56'} pt-4`}
      >
        <Outlet />
      </main>

      <style>{`
        html { scroll-behavior: smooth; }
        @media (max-width: 767px) {
          .sidebar-mobile-nav { display: flex !important; }
          main { padding-left: 0 !important; }
          aside { display: none !important; }
        }
        @media (min-width: 768px) {
          .sidebar-mobile-nav { display: none !important; }
          .sidebar-mobile-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}
