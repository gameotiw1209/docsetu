import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';

export function App() {
  useEffect(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
}, [])
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen w-full bg-paper text-slate-900 transition-colors duration-300 dark:bg-ink dark:text-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>);

}