import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const links = [
{ label: 'Home', href: '#top' },
{ label: 'DocInfo', href: '#docinfo' },
{ label: 'Ask IndDocs', href: '#help' },
{ label: 'About', href: '#about' }];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      return;
    }
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-lg transition-all duration-300 ${
      scrolled ?
      'border-slate-900/10 bg-paper/85 py-2 dark:border-white/10 dark:bg-ink/85' :
      'border-transparent bg-paper/50 py-4 dark:bg-ink/40'}`
      }>
      
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5">
        
        <a
          href="#top"
          onClick={(event) => handleAnchor(event, '#top')}
          className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold tracking-tight">DocSetu</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) =>
          <li key={link.label}>
              <a
              href={link.href}
              onClick={(event) => handleAnchor(event, link.href)}
              className="group relative text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-full border border-slate-900/10 bg-white/40 p-2 text-slate-600 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white">
            
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
          {/* <a
            href="#docinfo"
            onClick={(event) => handleAnchor(event, '#docinfo')}
            className="rounded-full bg-saffron px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90">
            
            Get Started
          </a> */}
        </div>
      </nav>
    </header>);

}