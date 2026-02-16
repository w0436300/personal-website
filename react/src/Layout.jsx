import { Outlet, Link, useLocation } from 'react-router-dom';
import { navItems } from './data/nav.js';

const BASE_URL = import.meta.env.BASE_URL || '/';
const baseHref = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL || '';

function scrollToAnchor(hash) {
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function Nav() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.5rem' }}>
      {navItems.map((item) => {
        if (item.type === 'route') {
          return (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          );
        }
        if (isHome) {
          return (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              onClick={(e) => {
                e.preventDefault();
                window.history.replaceState(null, '', `#${item.hash}`);
                scrollToAnchor(item.hash);
              }}
            >
              {item.label}
            </a>
          );
        }
        return (
          <a key={item.hash} href={`${baseHref || '/'}#${item.hash}`}>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ marginTop: '2rem', padding: '1rem', textAlign: 'center' }}>
      <div className="bg-amber-100 text-amber-900 px-2 py-1 rounded text-sm inline-block mb-2">
        Tailwind OK
      </div>
      <small>© Claire</small>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Nav />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
