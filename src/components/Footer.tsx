import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const groups = [
  { title: 'Explore', links: [['/projects', 'Selected work'], ['/services', 'Services'], ['/blog', 'Journal']] },
  { title: 'Connect', links: [['/contact', 'Start a conversation'], ['/pentesting-lab', 'Security lab'], ['/login', 'Client login']] },
  { title: 'Legal', links: [['/privacy', 'Privacy policy'], ['/terms', 'Terms of use']] },
];

const Footer: React.FC = () => (
  <footer className="relative border-t border-[var(--app-border)] bg-[var(--app-surface)]">
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-3 rounded-xl" aria-label="Yeasine Dewan home">
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--app-accent)] text-[var(--app-bg)]"><Icon icon="lucide:code-2" /></span>
            <span><span className="block text-sm font-semibold">Yeasine Dewan</span><span className="block text-xs text-[var(--app-text-muted)]">Product & security engineer</span></span>
          </Link>
          <p className="mt-6 text-sm leading-7 text-[var(--app-text-muted)]">I design dependable digital products and security-minded systems for teams building what comes next.</p>
          <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-text)] hover:text-[var(--app-accent-strong)]" href="mailto:hello@yeasinedewan.dev">hello@yeasinedewan.dev <Icon icon="lucide:arrow-up-right" /></a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => <div key={group.title}><h2 className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--app-text-muted)]">{group.title}</h2><ul className="mt-5 flex flex-col gap-3">{group.links.map(([path, label]) => <li key={path}><Link to={path} className="text-sm text-[var(--app-text)]/80 transition-colors hover:text-[var(--app-accent-strong)]">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t border-[var(--app-border)] pt-6 text-xs text-[var(--app-text-muted)] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Yeasine Dewan. All rights reserved.</span><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-[var(--app-accent)]" aria-hidden="true" /> Available for selected projects</span></div>
    </div>
  </footer>
);

export default Footer;
