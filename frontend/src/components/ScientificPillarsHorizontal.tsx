import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ResearchTheme } from '../lib/types';
import {
  Lock,
  Binary,
  ShieldCheck,
  Activity,
  ArrowRight,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScientificPillarsProps {
  themes: ResearchTheme[];
}

const themeMetadata = [
  {
    domain: 'Foundational Cryptology',
    code: '01 / CRYPTOLOGY',
    icon: Lock,
    accentColor: 'emerald',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/30',
    activeGlow: 'border-emerald-500/70 shadow-emerald-500/10',
    tags: [
      '2D/3D/4D Hyperchaotic Maps',
      'Positive Lyapunov Exponents (λ > 0)',
      'Memristive Attractors',
      'Pseudo-Random Keystreams',
      'Fractional-Order Chaos',
    ],
  },
  {
    domain: 'Algebraic Optimization',
    code: '02 / OPTIMIZATION',
    icon: Binary,
    accentColor: 'blue',
    textAccent: 'text-blue-600 dark:text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/30',
    activeGlow: 'border-blue-500/70 shadow-blue-500/10',
    tags: [
      'Bijective 8×8 S-Boxes',
      'Galois Fields GF(2⁸)',
      'Strict Avalanche Criterion (SAC)',
      'Differential Uniformity',
      'Metaheuristic Swarm Optimization',
    ],
  },
  {
    domain: 'Applied Cyber Security',
    code: '03 / MEDICAL SECURITY',
    icon: ShieldCheck,
    accentColor: 'emerald',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/30',
    activeGlow: 'border-emerald-500/70 shadow-emerald-500/10',
    tags: [
      'DICOM Clinical Imagery',
      'Compressive Sensing & Telehealth',
      'Dynamic DNA Sequence Computing',
      'Stereo Color Image Ciphers',
      'Structural Cryptanalysis & Differential Attacks',
    ],
  },
  {
    domain: 'Multimedia & IoT Intelligence',
    code: '04 / IOT & DEEP LEARNING',
    icon: Activity,
    accentColor: 'blue',
    textAccent: 'text-blue-600 dark:text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/30',
    activeGlow: 'border-blue-500/70 shadow-blue-500/10',
    tags: [
      'Lightweight PUF & ECC Protocols',
      'Internet of Drones (IoD)',
      'Industrial IoT (IIoT) Security',
      'CNN Deep Learning Biometrics',
      'Real-time Driver Fatigue Detection',
    ],
  },
];

export const ScientificPillarsHorizontal: React.FC<ScientificPillarsProps> = ({ themes }) => {
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedThemeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!themes || themes.length === 0) return null;

  const activeTheme = themes.find(t => t.id === selectedThemeId);
  const activeMeta = activeTheme
    ? themeMetadata[themes.findIndex(t => t.id === activeTheme.id) % themeMetadata.length]
    : null;

  return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
      
      {/* ───────────────────────────────────────────────────────────────────────
          LEFT COLUMN: Text Heading, Laboratory Mission & Context
          ─────────────────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 flex flex-col justify-between bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-7 sm:p-9 shadow-sm">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
            Research Program
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
            Core Scientific Pillars
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
            Theoretical foundations, algebraic methodologies, and applied frameworks developed in the Cryptography &amp; Nonlinear Systems Laboratory at Jamia Millia Islamia.
          </p>

          {/* Quick Context Highlights */}
          <div className="space-y-3 pt-5 border-t border-slate-200/80 dark:border-white/10 text-sm sm:text-[15px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Dynamical Systems &bull; Phase Space Cryptography</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span>Optimal Bijective S-Boxes &bull; Galois Field GF(2⁸)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Healthcare DICOM &bull; Compressive Telemedicine</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span>Edge IoT Protocols &bull; Applied Biometrics AI</span>
            </div>
          </div>
        </div>

        {/* Action Link to Publications */}
        <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
          <Link
            to="/publications"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline"
          >
            <span>Explore All 157+ Peer-Reviewed Works</span>
            <ArrowRight size={14} />
          </Link>
          <span className="text-xs font-mono text-slate-400">
            Click cards for deep-dive
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          RIGHT COLUMN: 2x2 Grid with In-Place Overlaid Details Panel
          ─────────────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 relative min-h-[420px] flex flex-col justify-center">
        
        {/* 2x2 Grid of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          {themes.map((theme, index) => {
            const meta = themeMetadata[index % themeMetadata.length];
            const Icon = meta.icon;

            return (
              <div
                key={theme.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedThemeId(theme.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedThemeId(theme.id);
                  }
                }}
                className="scientific-pillar-card group relative text-left rounded-3xl p-5 sm:p-6 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between"
              >
                {/* Card Top: Code & Themed Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${meta.textAccent}`}>
                      {meta.code}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${meta.bgAccent} ${meta.borderAccent} border flex items-center justify-center ${meta.textAccent} group-hover:scale-110 transition-transform`}>
                      <Icon size={17} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Domain & Title */}
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 line-clamp-1">
                    {meta.domain}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug">
                    {theme.title}
                  </h3>
                </div>

                {/* Card Bottom: Idle / Hover State (when hovered it will say tap to know more) */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="font-semibold transition-colors">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40"></span>
                      <span>Tap to explore</span>
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400">
                    <ArrowRight size={13} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            OVERLAY: In-Place Revealed Info Panel OVER the 2x2 Cards Grid
            with Cross Button (X) to go back
            ───────────────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {activeTheme && activeMeta && (
            <motion.div
              key={activeTheme.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-0 z-30 bg-white dark:bg-[rgb(15_23_42_/_var(--tw-bg-opacity,_1))] backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Header with Close Cross Button */}
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200/70 dark:border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${activeMeta.bgAccent} ${activeMeta.borderAccent} border flex items-center justify-center ${activeMeta.textAccent} shrink-0`}>
                      <activeMeta.icon size={22} strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeMeta.textAccent}`}>
                          {activeMeta.code}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">&bull;</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {activeMeta.domain}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-0.5">
                        {activeTheme.title}
                      </h3>
                    </div>
                  </div>

                  {/* Cross Button (X) to return back to 2x2 grid */}
                  <button
                    type="button"
                    onClick={() => setSelectedThemeId(null)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-md group shrink-0 focus:outline-none"
                    title="Go back to all cards (Esc)"
                    aria-label="Go back to all cards"
                  >
                    <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>

                {/* Summary & Scope */}
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                      Theoretical Framework &amp; Focus
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                      {activeTheme.summary}
                    </p>
                  </div>

                  {activeTheme.body && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                      <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        Experimental Methodology
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {activeTheme.body}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Primitives Tags */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 font-semibold">
                    Mathematical &amp; Applied Primitives
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMeta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 mt-4 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {activeTheme.paper_count ? `${activeTheme.paper_count} Published Works` : 'Peer-reviewed research in IEEE/Elsevier'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedThemeId(null)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 transition-colors"
                  >
                    &larr; Back to Cards
                  </button>
                  <Link
                    to="/publications"
                    className="btn-primary text-xs font-semibold py-1.5 px-3.5 rounded-full flex items-center gap-1.5 no-underline shadow-sm"
                  >
                    <span>View Publications</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
