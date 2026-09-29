import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';

const navItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/projects', label: 'Projects', icon: 'lucide:briefcase' },
  { path: '/services', label: 'Services', icon: 'lucide:layers-3' },
  { path: '/blog', label: 'Journal', icon: 'lucide:book-open' },
  { path: '/pentesting-lab', label: 'Security lab', icon: 'lucide:shield-check' },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 16);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 px-3 sm:px-6 ${isScrolled ? 'pt-3' : 'pt-4'}`}>
        <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-surface)]/95 px-2.5 py-2 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-[var(--app-surface-muted)]" aria-label="Go to homepage">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--app-accent)] text-[var(--app-bg)] shadow-sm"><Icon icon="lucide:code-2" /></span>
            <span className="hidden min-w-0 sm:block"><span className="block truncate text-sm font-bold tracking-tight text-[var(--app-text)]">Yeasine Dewan</span><span className="block truncate text-[11px] text-[var(--app-text-muted)]">Product &amp; security engineer</span></span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return <Link key={item.path} to={item.path} className={`rounded-xl px-3 py-2 text-[13px] font-semibold ${active ? 'bg-[var(--app-accent-soft)] text-[var(--app-accent-strong)]' : 'text-[var(--app-text-muted)] hover:bg-[var(--app-surface-muted)] hover:text-[var(--app-text)]'}`} aria-current={active ? 'page' : undefined}>{item.label}</Link>;
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button type="button" onClick={toggleTheme} className="grid size-10 place-items-center rounded-xl text-[var(--app-text-muted)] hover:bg-[var(--app-surface-muted)] hover:text-[var(--app-text)]" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'} /></button>
            <Link to="/contact" className="hidden rounded-xl bg-[var(--app-text)] px-4 py-2.5 text-[13px] font-bold text-[var(--app-bg)] shadow-sm hover:-translate-y-0.5 hover:shadow-md md:inline-flex">Start a conversation</Link>
            <button type="button" onClick={() => setIsMobileMenuOpen(true)} className="grid size-10 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] text-[var(--app-text)] hover:border-[var(--app-accent)] md:hidden" aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen}><Icon icon="lucide:menu" /></button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && <motion.div className="fixed inset-0 z-[60] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0 bg-black/45 backdrop-blur-sm" aria-label="Close navigation menu" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.aside role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col border-l border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold uppercase tracking-[.18em] text-[var(--app-text-muted)]">Menu</span><button type="button" onClick={() => setIsMobileMenuOpen(false)} className="grid size-10 place-items-center rounded-xl hover:bg-[var(--app-surface-muted)]" aria-label="Close navigation menu"><Icon icon="lucide:x" /></button></div>
            <div className="mt-10 flex flex-col gap-2">{navItems.map((item) => <Link key={item.path} to={item.path} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-medium ${isActive(item.path) ? 'bg-[var(--app-accent-soft)] text-[var(--app-accent-strong)]' : 'text-[var(--app-text-muted)] hover:bg-[var(--app-surface-muted)] hover:text-[var(--app-text)]'}`}><Icon icon={item.icon} />{item.label}</Link>)}</div>
            <Link to="/contact" className="mt-auto inline-flex justify-center rounded-2xl bg-[var(--app-text)] px-4 py-3.5 font-semibold text-[var(--app-bg)]">Start a conversation</Link>
          </motion.aside>
        </motion.div>}
      </AnimatePresence>
    </>
  );
};

export default Header;
