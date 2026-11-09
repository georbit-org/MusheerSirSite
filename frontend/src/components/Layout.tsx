import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiteSettings } from '../lib/types';
import { useTheme } from '../lib/theme';
import KineticGrid from './ui/kinetic-grid';
import {
  GoogleScholarLogo,
  ScopusLogo,
  ResearchGateLogo,
} from './ScholarlyLogos';
import {
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { SmoothScroll } from './SmoothScroll';
import { getCvUrl } from '../lib/api';

interface LayoutProps {
  children: React.ReactNode;
  settings?: SiteSettings | null;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const monopageSections = [
    { id: 'hero', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'attractor', label: 'Lab Deck' },
    { id: 'honors', label: 'Honors' },
    { id: 'join', label: 'Admissions' },
    { id: 'contact', label: 'Contact' },
  ];

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = monopageSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(monopageSections[i].id);
        if (el) {
          if (el.offsetTop <= scrollPos) {
            setActiveSection(monopageSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    let observer: MutationObserver | undefined;
    let timeoutId: number | undefined;
    const scrollToHash = () => {
      const section = document.getElementById(sectionId);
      if (!section) return false;

      window.dispatchEvent(new CustomEvent('portfolio:scroll-to-section', { detail: sectionId }));
      setActiveSection(sectionId);
      observer?.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      return true;
    };

    const frame = window.requestAnimationFrame(() => {
      if (!scrollToHash()) {
        observer = new MutationObserver(scrollToHash);
        observer.observe(document.getElementById('main-content') ?? document.body, {
          childList: true,
          subtree: true,
        });
        timeoutId = window.setTimeout(() => observer?.disconnect(), 5000);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.hash]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.dispatchEvent(new CustomEvent('portfolio:scroll-to-section', { detail: id }));
      setActiveSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  const cvHref = getCvUrl(settings?.cv_file, settings?.cv_url);

  return (
    <KineticGrid>
      <div className="min-h-screen flex flex-col transition-colors duration-300 selection:bg-[#00D5A5]/30 selection:text-white">
        <SmoothScroll />

        {/* Floating Capsule Header — Enlarged & Premium Design */}
        <header className="fixed top-0 left-0 right-0 z-50 py-3.5 px-5 sm:px-10 pointer-events-none bg-white/70 dark:bg-[#090A0F]/75 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
            
            {/* Left: Brand Monogram Mark & Title */}
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="navbar-control flex items-center gap-3.5 bg-transparent border-0 p-0 text-left cursor-pointer focus:outline-none"
              title="Dr. Musheer Ahmad"
            >
              <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-base tracking-tight shadow-xl">
                MA
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base sm:text-lg leading-tight text-slate-900 dark:text-white transition-colors">
                  Dr. Musheer Ahmad
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono leading-none mt-1">
                  Associate Professor &bull; JMI
                </span>
              </div>
            </button>

            {/* Center: Enlarged Sleek Navigation Capsule */}
            <nav className="hidden lg:flex items-center rounded-full p-2 shadow-lg dark:shadow-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090A0F] backdrop-blur-xl transition-colors">
              {monopageSections.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={
                      isActive
                        ? "navbar-control bg-slate-900 text-white dark:bg-white dark:text-black font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer"
                        : "navbar-control text-slate-600 dark:text-white/75 px-4 py-2 text-xs sm:text-sm font-medium cursor-pointer"
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Enlarged Theme Toggle & Vibrant Turquoise CTA Button */}
            <div className="flex items-center gap-3">
              
              {/* Light / Dark Mode Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="navbar-control w-11 h-11 rounded-full bg-white dark:bg-[#090A0F] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white flex items-center justify-center shadow-lg focus:outline-none cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle light or dark theme"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-emerald-400" />
                ) : (
                  <Moon size={18} className="text-sky-300" />
                )}
              </button>

              {/* Turquoise Pill CTA Button */}
              <a
                href={cvHref}
                download="Dr-Musheer-Ahmad-CV.pdf"
                className="navbar-control bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-slate-900/15 no-underline cursor-pointer"
              >
                <span>Download CV</span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="navbar-control lg:hidden w-11 h-11 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden pointer-events-auto mt-4 mx-auto max-w-sm bg-white dark:bg-[#090A0F] text-slate-900 dark:text-white rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-white/15 backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex flex-col gap-1.5">
                {monopageSections.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={
                        isActive
                        ? "navbar-control bg-slate-900 text-white dark:bg-white dark:text-black font-bold px-4 py-2.5 rounded-2xl text-sm text-left"
                          : "navbar-control text-slate-700 dark:text-white/80 px-4 py-2.5 rounded-2xl text-sm text-left"
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area with Generous Clearance for Floating Header */}
        <main id="main-content" className="flex-1 pt-20 sm:pt-24">
          {children}
        </main>

        {/* Minimalist Multi-Column Academic Footer (Matching Reference Design 2) */}
        <footer className="bg-white/90 dark:bg-[#090A0F]/90 border-t border-slate-200/80 dark:border-white/10 pt-16 pb-12 text-slate-600 dark:text-slate-400 font-sans backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12">
              
              {/* Col 1 & 2: Brand & Socials */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                      MA
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                      Dr. Musheer Ahmad
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
                    Associate Professor in Computer Engineering, Jamia Millia Islamia. World's Top 2% Scientist specializing in chaos cryptology, S-box synthesis, and secure multimedia intelligence.
                  </p>
                </div>

                {/* Social / Scholarly Links Strip */}
                <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                  {settings?.google_scholar_url && (
                    <a
                      href={settings.google_scholar_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white transition-colors"
                      title="Google Scholar"
                    >
                      <GoogleScholarLogo size={18} color="currentColor" />
                    </a>
                  )}
                  {settings?.scopus_url && (
                    <a
                      href={settings.scopus_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white transition-colors"
                      title="Scopus"
                    >
                      <ScopusLogo size={18} color="currentColor" />
                    </a>
                  )}
                  {settings?.researchgate_url && (
                    <a
                      href={settings.researchgate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white transition-colors"
                      title="ResearchGate"
                    >
                      <ResearchGateLogo size={18} color="currentColor" />
                    </a>
                  )}
                  {settings?.linkedin_url && (
                    <a
                      href={settings.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white transition-colors"
                      title="LinkedIn"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>

              {/* Col 3: Sitemap Monopage Links */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 tracking-tight">
                  Sitemap
                </h4>
                <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('hero')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      About &bull; Overview
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('research')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Research Pillars
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('attractor')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Chaotic Attractor Lab
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: Other Sections */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 tracking-tight">
                  Directory
                </h4>
                <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                  <li>
                    <a
                      href={cvHref}
                      download="Dr-Musheer-Ahmad-CV.pdf"
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors no-underline"
                    >
                      Curriculum Vitae (PDF)
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('honors')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Honors &amp; Editorial Roles
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('join')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      PhD Admissions &amp; Openings
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="footer-link text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Contact Coordinates
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 5: Contact Coordinates */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 tracking-tight">
                  Contact Details
                </h4>
                <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <p className="leading-relaxed m-0">
                    Dept. of Computer Engineering, Faculty of Engineering &amp; Technology, Jamia Millia Islamia, New Delhi 110025, India
                  </p>
                  <p className="m-0">
                    <a
                      href="mailto:mahmad9@jmi.ac.in"
                      className="footer-link text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white font-medium transition-colors no-underline"
                    >
                      mahmad9@jmi.ac.in
                    </a>
                  </p>
                  <p className="m-0 font-mono text-xs text-slate-600 dark:text-slate-400">
                    +91 11 2698 0281
                  </p>
                </div>
              </div>
            </div>

            {/* Hairline Divider & Centered Copyright */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-white/10 text-center">
              <p className="text-xs text-slate-400 font-mono m-0">
                &copy; {new Date().getFullYear()} Dr. Musheer Ahmad &bull; Jamia Millia Islamia. All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </KineticGrid>
  );
};
