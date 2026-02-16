import { useEffect } from 'react';
import { ANCHOR_IDS } from '../data/nav.js';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function handleHash() {
  const hash = window.location.hash.slice(1);
  if (ANCHOR_IDS.includes(hash)) scrollToSection(hash);
}

export function useScrollToHash() {
  useEffect(() => {
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
}
