import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const groups = [
  { title: 'Resources', links: [['/projects', 'Project showcase', 'lucide:diamond'], ['/services', 'Service overview', 'lucide:circle-arrow-right'], ['/blog', 'Blog & articles', 'lucide:book-open'], ['/contact', 'Newsletter', 'lucide:mail']] },
  { title: 'Services', links: [['/services', 'Pricing', 'lucide:dollar-sign'], ['/pentesting-lab', 'Pentesting lab', 'lucide:link-2'], ['/services', 'Web development', 'lucide:circle'], ['/contact', 'Client consultation', 'lucide:users-round']] },
  { title: 'Company', links: [['https://linkedin.com', 'LinkedIn', 'lucide:linkedin'], ['/contact', 'Contact us', 'lucide:message-circle'], ['/privacy', 'Privacy policy', 'lucide:lock-keyhole'], ['/terms', 'Terms', 'lucide:circle-check']] },
];

const Footer: React.FC = () => (
  <footer className="footer-shell relative overflow-hidden border-t border-[var(--app-border)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[var(--app-accent)] opacity-[.06] blur-2xl" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_2fr] lg:gap-20">
        <div className="max-w-md">
          <Link to="/" className="group inline-flex items-start gap-3 rounded-2xl" aria-label="Yeasine Dewan home">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--app-accent)] text-[var(--app-bg)] shadow-lg shadow-[var(--app-accent)]/20 transition-transform group-hover:-translate-y-0.5"><Icon icon="lucide:code-2" width="22" /></span>
            <span><span className="block max-w-[220px] text-xl font-bold leading-tight tracking-tight text-[var(--app-text)]">MD. Yeasine Dewan Shawon</span></span>
          </Link>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[var(--app-text-muted)]">Full Stack Developer | Cybersecurity Specialist | Data Entry Expert</p>
          <Link to="/contact" className="footer-cta mt-7 inline-flex w-full max-w-[360px] items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold"><Icon icon="lucide:arrow-right" width="22" /> Hire Me</Link>
          <div className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--app-text-muted)]"><Icon icon="lucide:award" className="text-[var(--app-accent-strong)]" width="19" /> Portfolio of the day <span className="ml-1 flex gap-1 text-[var(--app-accent-strong)]" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <Icon key={star} icon="lucide:star" width="17" />)}</span></div>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {groups.map((group) => <div key={group.title}><h2 className="text-lg font-bold tracking-tight text-[var(--app-text)]">{group.title}</h2><ul className="mt-7 flex flex-col gap-6">{group.links.map(([path, label, icon]) => <li key={`${path}-${label}`}>{path.startsWith('http') ? <a href={path} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-base text-[var(--app-text-muted)] transition-colors hover:text-[var(--app-text)]"><Icon icon={icon} className="shrink-0 text-[var(--app-accent-strong)] transition-transform group-hover:scale-110" width="19" /> <span>{label}</span></a> : <Link to={path} className="group inline-flex items-center gap-3 text-base text-[var(--app-text-muted)] transition-colors hover:text-[var(--app-text)]"><Icon icon={icon} className="shrink-0 text-[var(--app-accent-strong)] transition-transform group-hover:scale-110" width="19" /> <span>{label}</span></Link>}</li>)}</ul></div>)}
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t border-[var(--app-border)] pt-6 text-sm text-[var(--app-text-muted)] sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-2"><Icon icon="lucide:map-pin" className="text-[var(--app-accent-strong)]" width="18" /> 146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</span><span>© {new Date().getFullYear()} MD. Yeasine Dewan Shawon. All rights reserved.</span></div>
    </div>
  </footer>
);

export default Footer;
