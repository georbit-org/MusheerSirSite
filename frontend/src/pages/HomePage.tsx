import React, { lazy, Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HomePagePayload } from '../lib/types';
import { getCvUrl, getMediaUrl, submitProspectiveApplication } from '../lib/api';
import { InfiniteNewsMarquee } from '../components/InfiniteNewsMarquee';
import { ScientificPillarsHorizontal } from '../components/ScientificPillarsHorizontal';
import { HonorsTimelineAndMarquee } from '../components/HonorsTimelineAndMarquee';
import { AnimatedCount } from '../components/AnimatedCount';
import {
  GoogleScholarLogo,
  ScopusLogo,
  ResearchGateLogo,
  DblpLogo,
  WebOfScienceLogo,
  UniversityLogo,
  OrcidLogo,
} from '../components/ScholarlyLogos';
import {
  FileText,
  Award,
  GraduationCap,
  BookOpen,
  Users,
  Activity,
  ShieldCheck,
  Lock,
  Binary,
  Terminal,
  ArrowRight,
  MapPin,
  Mail,
  Building2,
  Sparkles,
  FileDown,
  Phone,
  Send,
  CheckCircle2,
  TrendingUp,
  Quote,
  Star,
  ExternalLink,
} from 'lucide-react';

const Attractor3D = lazy(() =>
  import('../components/Attractor3D').then(({ Attractor3D: Component }) => ({ default: Component })),
);

interface HomePageProps {
  data: HomePagePayload;
}

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const {
    settings,
    home,
    research_themes,
    honors,
    editorial_roles,
    latest_news,
  } = data;

  const portraitSrc = settings.portrait
    ? `${getMediaUrl(settings.portrait)}?v=2`
    : '/portraits/dr_musheer_ahmad.png?v=2';

  const cvHref = getCvUrl(settings.cv_file, settings.cv_url);

  return (
    <>
      <Helmet>
        <title>{home.seo_title || `${settings.professor_name} — Associate Professor | JMI`}</title>
        <meta
          name="description"
          content={home.seo_description || 'Academic research portfolio of Dr. Musheer Ahmad, Jamia Millia Islamia — World\'s Top 2% Scientist by Stanford / Elsevier.'}
        />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      {/* ═════════════════════════════════════════════════════════════════════════
          HERO SECTION: 1-VIEWPORT ASYMMETRIC MODERN BENTO GRID
          - Cell 1 (Row 1, Cols 1-5): Increased height & full content after "and..."
          - Cell 2 (Row 1, Cols 6-8): Scholarly Impact (Swapped into Row 1)
          - Cell 3 (Rows 1-2, Cols 9-12): Faculty Portrait (Original 537:547 ratio, NO CROPPING)
          - Cell 4 (Row 2, Cols 1-3): Core Primitives (Swapped into Row 2)
          - Cell 5 (Row 2, Cols 4-5): Verified Profiles
          - Cell 6 (Row 2, Cols 6-8): Pedigree & Mentorship
          ═════════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="home-viewport home-viewport--hero w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
        <div className="w-full max-w-[1540px] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[1.25fr_0.75fr] gap-4 xl:gap-5">
          
          {/* ───────────────────────────────────────────────────────────────────
              CELL 1: TOP-LEFT WIDE INTRO CARD (Cols 1-5, Row 1)
              ─────────────────────────────────────────────────────────────────── */}
<div className="hero-intro-cell lg:col-span-5 lg:row-span-1 min-h-0 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all group">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {/* <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-emerald-500 transition-colors animate-pulse"></span> */}
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Associate Professor, 18+ Years Pedagogy
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Dept. of Computer Engineering, JMI
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center py-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[27px] xl:text-[31px] font-sans font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
                Investigating Nonlinear Chaos, S-Box Optimization &amp; Secure Multimedia
              </h1>
              <p className="hero-intro-copy text-xs sm:text-[13.5px] xl:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {home.intro_body || "With over 18 years of academic teaching and research experience at Jamia Millia Islamia and Aligarh Muslim University, my work investigates the mathematical design of non-linear Substitution Boxes (S-boxes), multi-dimensional continuous and discrete hyperchaotic attractors, lightweight cryptographic frameworks for Internet of Things and smart grids, and secure biomedical multimedia transmission. Our laboratory focuses on developing provably resilient cryptosystems, algebraic metaheuristic optimizations, and chaotic phase space defenses for next-generation computing infrastructures."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/60 dark:border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all cursor-default">
                  Senior Member, IEEE
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all cursor-default">
                  M.Tech Coordinator
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all cursor-default">
                  CBCS Advisor
                </span>
              </div>
              <a
                href="#research"
                className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <span>Explore Pillars</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
{/* ───────────────────────────────────────────────────────────────────
              CELL 2: TOP-MIDDLE SCHOLARLY IMPACT CARD (Cols 6-8, Row 1)
              ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 lg:row-span-1 min-h-0 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
                  <Award size={17} strokeWidth={2.4} />
                </div>
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Scholarly Impact
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                Top 2%
              </span>
            </div>

            {/* Three sourced metrics, updated from the CMS when available. */}
            <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[auto_minmax(0,1fr)] gap-2.5">
              <div className="col-span-2 flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-100/90 p-3 transition-all hover:border-emerald-500/30 hover:bg-emerald-50/50 group/tile dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-emerald-500/5 sm:p-4">
                <div className="whitespace-nowrap text-3xl font-sans font-bold leading-none tabular-nums text-slate-900 transition-colors group-hover/tile:text-emerald-600 dark:text-white dark:group-hover/tile:text-emerald-400 sm:text-4xl">
                  <AnimatedCount value={settings.citations_count || 5296} suffix="+" />
                </div>
                <div className="text-right text-xs font-mono font-medium text-slate-500 dark:text-slate-400">Google Scholar citations</div>
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/90 p-3 transition-all hover:border-emerald-500/30 hover:bg-emerald-50/50 group/tile dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-emerald-500/5 sm:p-4">
                <div className="whitespace-nowrap text-3xl font-sans font-bold leading-none tabular-nums text-slate-900 transition-colors group-hover/tile:text-emerald-600 dark:text-white dark:group-hover/tile:text-emerald-400 sm:text-4xl">
                  <AnimatedCount value={settings.h_index || 42} suffix="+" />
                </div>
                <div className="mt-1.5 text-center text-xs font-mono font-medium text-slate-500 dark:text-slate-400">h-index</div>
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/90 p-3 transition-all hover:border-emerald-500/30 hover:bg-emerald-50/50 group/tile dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-emerald-500/5 sm:p-4">
                <div className="whitespace-nowrap text-3xl font-sans font-bold leading-none tabular-nums text-slate-900 transition-colors group-hover/tile:text-emerald-600 dark:text-white dark:group-hover/tile:text-emerald-400 sm:text-4xl">
                  <AnimatedCount value={settings.total_papers || 157} suffix="+" />
                </div>
                <div className="mt-1.5 text-center text-xs font-mono font-medium text-slate-500 dark:text-slate-400">Papers</div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Google Scholar, Scopus</span>
              <span className="font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default">Stanford Ranking</span>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────────
              CELL 3: RIGHTMOST TALL FACULTY PORTRAIT CARD (Cols 9-12, Rows 1 & 2 — 4/12 width)
              User Request: "the photo is getting cut so make it's height as original photo"
              Original photo aspect ratio is 537:547 (~1:1 square)
              Preserves 100% of cap and beard with zero cropping
              ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 lg:row-span-2 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all group">
            
            {/* Top Part: Uncut Portrait Frame Matching Original Photo Dimensions (537:547) */}
            <div>
              <div className="w-full flex items-center justify-center">
                <div 
                  className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-900/60 shadow-inner group-hover:border-emerald-500/40 transition-all"
                  style={{
                    maxHeight: '375px',
                    aspectRatio: '537 / 547',
                    width: 'auto',
                    maxWidth: '100%',
                  }}
                >
                  <img
                    src={portraitSrc}
                    alt={settings.portrait_alt || settings.professor_name}
                    className="w-full h-full object-contain block group-hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Stanford Badge on Photo */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[11px] font-mono font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Stanford Top 2%
                    </span>
                  </div>

                  {/* Floating Location Badge on Photo */}
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="text-[11px] font-mono text-white/90 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/15">
                      {settings.office_room || 'Room 104, JMI'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Faculty Identity Details (Below Photo) */}
              <div className="mt-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    Associate Professor , JMI
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Central University
                  </span>
                </div>

                <h2 className="text-2xl sm:text-[25px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {settings.professor_name}
                </h2>

                <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                  <Sparkles size={13} className="text-emerald-500 shrink-0" />
                  <span>World's Top 2% Scientist , Stanford / Elsevier</span>
                </div>

                {/* Research Motto Quote */}
                <blockquote className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 italic border-l-2 border-slate-300 dark:border-slate-600 pl-3 my-2 font-sans leading-relaxed">
                  &ldquo;Building mathematically provable, chaos-resilient security architectures.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Bottom Part: Action CTAs */}
            <div className="pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex flex-col gap-2 mt-1">
              <a
                href={cvHref}
                download="Dr-Musheer-Ahmad-CV.pdf"
                className="w-full bg-slate-900 dark:bg-white hover:brightness-105 active:scale-[0.98] text-white dark:text-slate-900 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/15 transition-all no-underline cursor-pointer"
              >
                <FileDown size={15} />
                <span>Download Curriculum Vitae (PDF)</span>
              </a>
              
              <a
                href="#contact"
                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all no-underline text-center cursor-pointer border border-slate-200/80 dark:border-white/10"
              >
                <Mail size={14} />
                <span>Inquire , Campus Office</span>
              </a>
            </div>
          </div>

          
            {/* ───────────────────────────────────────────────────────────────────
              CELL 4: BOTTOM-LEFT CORE PRIMITIVES (Cols 1-3, Row 2 — 3/12 width)
              User Request: "swap content of scholarly impact with core primitives"
              ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 lg:row-span-1 min-h-0 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all">
            <div className="flex flex-1 flex-col justify-evenly gap-3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Binary size={18} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Core Primitives
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">Foundations</span>
              </div>

              <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Nonlinear dynamical mappings, Galois field algebra &amp; cyber defenses.
              </p>

              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 flex-1 content-center">
                <span className="min-h-10 text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  <Lock size={12} className="text-slate-500 dark:text-slate-400" />
                  Bijective S-Boxes
                </span>
                <span className="min-h-10 text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  <Activity size={12} className="text-slate-500 dark:text-slate-400" />
                  2D/3D/4D Chaos
                </span>
                <span className="min-h-10 text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  <ShieldCheck size={12} className="text-slate-500 dark:text-slate-400" />
                  DICOM Encryption
                </span>
                <span className="min-h-10 text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  <Terminal size={12} className="text-slate-500 dark:text-slate-400" />
                  PRNG Keystreams
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">3D Phase Space</span>
              <a href="#attractor" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold hover:underline flex items-center gap-1 transition-colors">
                <span>Lab Deck</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────────
              CELL 5: BOTTOM-MIDDLE SLIM SCHOLARLY PROFILES (Cols 4-5, Row 2 — 2/12 width)
              ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 lg:row-span-1 min-h-0 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Profiles
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                Verified
              </span>
            </div>

            {/* Profiles 2-Column Compact Grid */}
            <div className="grid grid-cols-2 gap-2 flex-1 content-center py-3">
              {settings.google_scholar_url && (
                <a
                  href={settings.google_scholar_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="Google Scholar"
                >
                  <GoogleScholarLogo size={15} color="currentColor" />
                  <span className="truncate">Scholar</span>
                </a>
              )}
              {settings.scopus_url && (
                <a
                  href={settings.scopus_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="Scopus Profile"
                >
                  <ScopusLogo size={15} color="currentColor" />
                  <span className="truncate">Scopus</span>
                </a>
              )}
              {settings.researchgate_url && (
                <a
                  href={settings.researchgate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="ResearchGate"
                >
                  <ResearchGateLogo size={15} color="currentColor" />
                  <span className="truncate">RG</span>
                </a>
              )}
              {settings.dblp_url && (
                <a
                  href={settings.dblp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="DBLP"
                >
                  <DblpLogo size={15} color="currentColor" />
                  <span className="truncate">DBLP</span>
                </a>
              )}
              {settings.orcid_url && (
                <a
                  href={settings.orcid_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="ORCID"
                >
                  <OrcidLogo size={15} />
                  <span className="truncate">ORCID</span>
                </a>
              )}
              {settings.jmi_profile_url && (
                <a
                  href={settings.jmi_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-10 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-800 dark:text-slate-200 transition-all text-xs font-medium no-underline"
                  title="JMI Faculty"
                >
                  <UniversityLogo size={15} color="currentColor" />
                  <span className="truncate">JMI</span>
                </a>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span className="truncate">Room 104</span>
                  <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0">Office &rarr;</a>
            </div>
          
          </div>

                    

          
          {/* ───────────────────────────────────────────────────────────────────
              CELL 6: BOTTOM-MIDDLE-RIGHT PEDIGREE & SUPERVISION (Cols 6-8, Row 2 — 3/12 width)
              ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 lg:row-span-1 min-h-0 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-none hover:border-emerald-500/40 transition-all">
            <div className="flex flex-1 flex-col justify-evenly gap-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <GraduationCap size={18} />
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Pedigree &amp; Mentorship
                  </span>
                </div>
              </div>

              {/* Degrees */}
                <div className="space-y-2.5 mb-3 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 font-sans">
                <div className="flex items-baseline gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"></span>
                  <span className="font-semibold text-slate-900 dark:text-white">Ph.D. Computer Engg.</span>
                  <span className="text-slate-400 text-xs">, JMI</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"></span>
                  <span className="font-semibold text-slate-900 dark:text-white">M.Tech. (2008)</span>
                  <span className="text-slate-400 text-xs">, AMU</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"></span>
                  <span className="font-semibold text-slate-900 dark:text-white">B.Tech. (2004)</span>
                  <span className="text-slate-400 text-xs">, AMU</span>
                </div>
              </div>

              {/* Supervisory Counts */}
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-200/60 dark:border-white/5">
                <div className="min-h-[68px] p-2.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white">6</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Ph.D.</div>
                </div>
                <div className="min-h-[68px] p-2.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white">30</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">M.Tech</div>
                </div>
                <div className="min-h-[68px] p-2.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white">40+</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">B.Tech</div>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Admissions</span>
              <a href="#join" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold hover:underline transition-colors">
                Join Lab &rarr;
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Infinite Horizontal Live Announcements Marquee */}
      <InfiniteNewsMarquee items={latest_news} />

      {/* Core Scientific Pillars — Text on Left, 2x2 Grid with In-Place Overlay on Right */}
      {research_themes && research_themes.length > 0 && (
        <section id="research" className="home-viewport home-viewport--research editorial-section relative">
          <div className="home-viewport__inner container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScientificPillarsHorizontal themes={research_themes} />
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────────────
          INTERACTIVE 3D CHAOTIC ATTRACTOR STUDIO (1 VIEWPORT: FIG ON LEFT, TEXT ON RIGHT)
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="attractor"
        className="home-viewport home-viewport--attractor relative w-full flex items-center justify-center overflow-hidden font-sans"
      >
        <div className="home-viewport__inner container max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-center w-full">
            
            {/* Left: 3D Attractor Figure Canvas Wrap (Cols 1-7) */}
            <div className="md:col-span-7 w-full flex items-center justify-center">
              <Suspense fallback={<div className="attractor-loading" aria-label="Loading research figure" />}>
                <Attractor3D />
              </Suspense>
            </div>

            {/* Right: Text, Headings & Dynamical Focus (Cols 8-12) */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-4">
              <div>
                {/* <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-2">
                  Dynamical Systems Foundation
                </span> */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-tight">
                  Nonlinear Chaos in Cryptographic Engineering
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 font-sans mt-2 leading-relaxed">
                  Continuous and discrete chaotic flows generate deterministic yet non-periodic phase trajectories with acute sensitivity to initial conditions (&lambda; &gt; 0), providing provable high entropy for cipher keystreams, medical image encryption, and substitution boxes.
                </p>
              </div>

              {/* 3 Compact Dynamics Feature Badges */}
              <div className="space-y-2">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity size={14} />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-slate-900 dark:text-white font-sans">
                      Positive Lyapunov Exponent (&lambda; &gt; 0)
                    </strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Exponential trajectory divergence guarantees algorithmic avalanche effect and resistance against linear cryptanalysis.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock size={14} />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-slate-900 dark:text-white font-sans">
                      Cryptographic Keystreams &amp; S-Boxes
                    </strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      High topological entropy feeds bijective S-box synthesis and pseudo-random bit generation passing NIST SP 800-22 suites.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Binary size={14} />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-slate-900 dark:text-white font-sans">
                      Phase Space Ergodicity &amp; Hidden Attractors
                    </strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Non-equilibrium coexisting attractors provide extensive key spaces (&gt; 2<sup>256</sup>) nullifying phase-space reconstruction attacks.
                    </span>
                  </div>
                </div>
              </div>  
            </div>

          </div>
              </div>
</section>

      {/* ───────────────────────────────────────────────────────────────────
          RECOGNITION & SERVICE (1 VIEWPORT: TIMELINE ON LEFT, MARQUEE BANNERS ON RIGHT)
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="honors"
        className="home-viewport home-viewport--honors relative w-full flex items-center justify-center overflow-hidden font-sans"
      >
        <HonorsTimelineAndMarquee
          honors={honors}
          editorial_roles={editorial_roles}
        />
      </section>

      {/* Prospective Students Recruitment — Mentorship Gateway */}
      {settings.is_accepting_students && (
        <section className="w-full mt-8 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 font-sans" id="join">
          <div className="max-w-[1540px] mx-auto">

            {/* Section Header Row */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                {/* <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1.5">
                  Academic Mentorship , PhD Admissions
                </span> */}
                <h2 className="text-2xl sm:text-3xl xl:text-4xl font-sans font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  {settings.student_callout_heading || 'Prospective Researchers & Students'}
                </h2>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5">

              {/* LEFT: Callout intro card — Cols 1-5 */}
              <div className="lg:col-span-5 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col gap-5 shadow-sm hover:border-emerald-500/40 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <GraduationCap size={18} strokeWidth={2.2} />
                    </div>
                    <span className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Open Positions
                    </span>
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {settings.student_callout_text || "Dr. Ahmad welcomes inquiries from highly motivated prospective Ph.D. scholars, Master's thesis researchers, and student interns with rigorous foundations in discrete mathematics, nonlinear dynamical systems, and algorithm analysis."}
                  </p>

                  {/* Quick stat pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      Ph.D. Scholars
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      M.Tech Thesis
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      Research Interns
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200/60 dark:border-white/5 mt-5">
                  <a
                    href="#contact"
                    className="w-full bg-[#00D5A5] hover:brightness-105 active:scale-[0.98] text-black text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#00D5A5]/20 transition-all no-underline cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Inquire for Doctoral Openings</span>
                  </a>
                </div>
              </div>

              {/* RIGHT: Prerequisites 2×2 Bento — Cols 6-12 */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Prereq Card 1: Mathematical Foundations */}
                <div className="bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <Binary size={17} strokeWidth={2.3} />
                    </div>
                    <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Mathematical Foundations
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                    Rigorous understanding of discrete mathematics, linear algebra, modular arithmetic, and continuous/discrete dynamical systems.
                  </p>
                </div>

                {/* Prereq Card 2: Implementation Rigor */}
                <div className="bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <Terminal size={17} strokeWidth={2.3} />
                    </div>
                    <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Implementation Rigor
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                    Strong computational proficiency in Python, C/C++, or MATLAB with demonstrated experience implementing algorithms from scratch.
                  </p>
                </div>

                {/* Prereq Card 3: Scholarly Motivation */}
                <div className="bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <Award size={17} strokeWidth={2.3} />
                    </div>
                    <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Scholarly Motivation
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                    Genuine dedication to publishing high-quality, reproducible papers in top-tier SCI/SCIE-indexed journals.
                  </p>
                </div>

                {/* Prereq Card 4: Application Package */}
                <div className="bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <FileText size={17} strokeWidth={2.3} />
                    </div>
                    <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Application Package
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                    Send an email with your updated CV, academic transcripts, and a concise research note on which of Dr. Ahmad's papers you propose to extend.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact & Campus Coordinates Monopage Section */}
      <section className="home-viewport home-viewport--contact editorial-section" id="contact">
        <div className="home-viewport__inner container">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 w-full items-stretch">
            <div className="min-w-0 h-full bg-white/85 dark:bg-[#0E1015]/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Academic Contact</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Connect with the Department of Computer Engineering at Jamia Millia Islamia.</p>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-medium mb-0.5">
                        Academic Department
                      </strong>
                      <p className="m-0 leading-relaxed text-slate-500 dark:text-slate-400">
                        {settings.department || 'Department of Computer Engineering'},<br />
                        Faculty of Engineering &amp; Technology,<br />
                        {settings.university || 'Jamia Millia Islamia'} (Central University),<br />
                        Jamia Nagar, New Delhi 110025, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-medium mb-0.5">
                        Office Location
                      </strong>
                      <p className="m-0 text-slate-500 dark:text-slate-400">
                        {settings.office_room || 'Room 104, Second Floor, Dept. of Computer Engineering'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-medium mb-0.5">
                        Official Correspondence
                      </strong>
                      <a
                        href={`mailto:${settings.email_primary || 'mahmad9@jmi.ac.in'}`}
                        className="text-emerald-600 dark:text-emerald-400 font-mono hover:underline block"
                      >
                        {settings.email_primary || 'mahmad9@jmi.ac.in'}
                      </a>
                      {settings.email_secondary && (
                        <a
                          href={`mailto:${settings.email_secondary}`}
                          className="text-slate-500 dark:text-slate-400 font-mono text-xs hover:underline block mt-0.5"
                        >
                          {settings.email_secondary}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={16} />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-medium mb-0.5">
                        Office Telephone
                      </strong>
                      <p className="m-0 font-mono text-slate-500 dark:text-slate-400">
                        {settings.office_phone || '+91 11 2698 0281 / Ext. 2350'}
                      </p>
                    </div>
                  </div>
                </div>
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-3">
                <span className="text-xs text-slate-400">Consultation Hours:</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Mon – Fri (10:00 AM – 5:00 PM IST)
                </span>
              </div>
            </div>

            {/* Right Card: Direct Inquiry Form */}
            <div className="min-w-0 h-full bg-white/85 dark:bg-[#0E1015]/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm contact-form-box">
              <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Inquiries are delivered directly to Dr. Ahmad's university mailbox.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitProspectiveApplication({
        full_name: formData.name,
        email: formData.email,
        current_institution: formData.affiliation || 'Direct Correspondence',
        degree_and_gpa: 'Academic Contact Message',
        position_applied_for: `Contact: ${formData.subject || 'Direct Inquiry'}`,
        research_statement: formData.message,
        paper_reference: `Subject: ${formData.subject || 'Direct Message'}`,
        cv_url_or_link: 'https://direct-contact.inquiry',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
        <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
        <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">
          Message Transmitted
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-0">
          Your inquiry has been delivered directly to Dr. Ahmad's office mailbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label text-xs font-sans uppercase text-slate-500 dark:text-slate-400 block mb-1">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Dr. Jane Smith"
          className="w-full font-sans text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-white/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="form-label text-xs font-sans uppercase text-slate-500 dark:text-slate-400 block mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@university.edu"
            className="w-full font-sans text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="form-label text-xs font-sans uppercase text-slate-500 dark:text-slate-400 block mb-1">
            Affiliation
          </label>
          <input
            type="text"
            value={formData.affiliation}
            onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            placeholder="Institution / Lab"
            className="w-full font-sans text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="form-label text-xs font-sans uppercase text-slate-500 dark:text-slate-400 block mb-1">
          Message
        </label>
        <textarea
          required
          rows={10}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Brief summary of your research inquiry or proposal..."
          className="w-full font-sans text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-white/40 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="contact-submit-button w-full btn-primary text-xs font-sans font-semibold py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
      >
        <span>{status === 'submitting' ? 'Transmitting...' : 'Send Correspondence'}</span>
        <Send size={13} />
      </button>

      {status === 'error' && (
        <p className="text-xs text-emerald-500 text-center m-0">
          Failed to transmit. Please email directly to mahmad9@jmi.ac.in
        </p>
      )}
    </form>
  );
};
