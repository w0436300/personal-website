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
    <nav className="flex gap-4 flex-wrap p-2">
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
    <footer className="mt-8 p-4 text-center">
      <small className="text-gray-600">© Claire</small>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Nav />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
