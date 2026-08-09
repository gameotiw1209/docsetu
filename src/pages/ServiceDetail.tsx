import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getService } from '../data/services';

export function ServiceDetail() {
  const { slug } = useParams<{slug: string;}>();
  const service = getService(slug);

  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!service) return;
    try {
      const stored = localStorage.getItem(`checklist:${service.slug}`);
      setChecked(stored ? JSON.parse(stored) as Record<string, boolean> : {});
    } catch {
      setChecked({});
    }
  }, [service]);

  if (!service) return <Navigate to="/" replace />;

  const toggleDoc = (name: string) => {
    setChecked((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      localStorage.setItem(`checklist:${service.slug}`, JSON.stringify(next));
      return next;
    });
  };

  const total = service.documents.length;
  const done = service.documents.filter((doc) => checked[doc.name]).length;
  const progress = total === 0 ? 0 : Math.round(done / total * 100);
  const hasApplyLink = service.applyLink && service.applyLink !== 'local';

  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto max-w-2xl px-5 py-20">
          <Link
            to="/#docinfo"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-saffron dark:text-slate-400">
            
            <ArrowLeftIcon size={14} />
            Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            
            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {service.name}
              </h1>
              {hasApplyLink ?
              <a
                href={service.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90">
                
                  Apply Now
                  <ExternalLinkIcon size={14} />
                </a> :
              null}
            </div>

            <p className="mt-3 text-slate-600 dark:text-slate-400">{service.description}</p>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Documents ready</span>
                <span className="tabular-nums">
                  {done} / {total}
                </span>
              </div>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${progress}% of documents collected`}>
                
                <motion.div
                  className="h-full rounded-full bg-saffron"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }} />
                
              </div>
            </div>

            <ul className="mt-8 space-y-2.5">
              {service.documents.map((doc, index) => {
                const isChecked = !!checked[doc.name];
                return (
                  <li key={doc.name}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleDoc(doc.name)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 pl-3 text-left backdrop-blur-lg transition-colors ${
                      isChecked ?
                      'border-indiagreen/50 bg-indiagreen/5 dark:bg-indiagreen/10' :
                      'border-slate-900/10 bg-white/60 hover:border-saffron/50 dark:border-white/10 dark:bg-white/5'}`
                      }>
                      
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-display text-xs tabular-nums transition-colors ${
                        isChecked ?
                        'bg-indiagreen text-white' :
                        'bg-slate-900/5 text-slate-500 group-hover:text-saffron dark:bg-white/10 dark:text-slate-400'}`
                        }>
                        
                        {isChecked ? <CheckIcon size={14} /> : String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-sm font-medium ${
                          isChecked ? 'text-slate-400 line-through dark:text-slate-500' : ''}`
                          }>
                          
                          {doc.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                          {doc.note}
                        </span>
                      </span>

                      <span
                        className={`h-5 w-5 shrink-0 rounded-full border transition-colors ${
                        isChecked ?
                        'border-indiagreen bg-indiagreen' :
                        'border-slate-900/20 dark:border-white/25'}`
                        }
                        aria-hidden="true" />
                      
                    </button>
                  </li>);

              })}
            </ul>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>);

}