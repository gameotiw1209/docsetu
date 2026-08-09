import React, { useEffect, useState } from 'react';

const formatIST = (date: Date): string =>
new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
}).format(date);

export function Footer() {
  const [time, setTime] = useState<string>(() => formatIST(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatIST(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="w-full border-t border-slate-900/10 px-5 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-slate-600 dark:text-slate-400 sm:flex-row">
        <p>
          <span className="tabular-nums text-slate-900 dark:text-slate-200">{time}</span> IST
        </p>

       <p className="flex items-center gap-2">
  <svg viewBox="0 0 24 16" className="h-3 w-4.5 rounded-[1px]" aria-hidden="true">
    <rect width="24" height="5.33" y="0" fill="#FF9933" />
    <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
    <rect width="24" height="5.33" y="10.67" fill="#138808" />
    <circle cx="12" cy="8" r="1.6" fill="none" stroke="#0b1a4a" strokeWidth="0.4" />
  </svg>
  Made in India
</p>

        <nav aria-label="Footer" className="flex items-center gap-6">
          <a href="https://indiancitizenshiponline.nic.in/" className="transition-colors hover:text-saffron">
            About
          </a>
          <a href="https://www.india.gov.in/contact-us" className="transition-colors hover:text-saffron">
            Contact
          </a>
        </nav>

        <p>© 2026 DocSetu</p>
      </div>
    </footer>);

}