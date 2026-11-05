import React from 'react';
import { Honor, EditorialRole } from '../lib/types';
import { Award, BookOpen, Check, ExternalLink, Sparkles } from 'lucide-react';

interface HonorsTimelineAndMarqueeProps {
  honors?: Honor[];
  editorial_roles?: EditorialRole[];
}

export const HonorsTimelineAndMarquee: React.FC<HonorsTimelineAndMarqueeProps> = ({
  honors = [],
  editorial_roles = [],
}) => {
  // Verified fallback honors matching Django DB
  const defaultHonors = [
    {
      id: 1,
      title: 'Editorial Contribution Award 2025',
      year: '2025',
      date_details: '2025',
      awarding_body: 'Springer Nature (Scientific Reports)',
      description: 'Conferred for effectively handling manuscripts as Editorial Board member of Scientific Reports journal from Springer Nature.',
      order: 1,
    },
    {
      id: 2,
      title: 'FET Research Publication Award 2024',
      year: '2024',
      date_details: '5th November, 2024',
      awarding_body: 'Faculty of Engineering & Technology, Jamia Millia Islamia',
      description: 'Received from Honorable Vice Chancellor Prof. Mazhar Asif, Registrar, and Dean of FET.',
      order: 2,
    },
    {
      id: 3,
      title: "World's Top 2% Researchers (Career-Long Category)",
      year: '2024',
      date_details: 'October 2024',
      awarding_body: 'Stanford University, USA and Elsevier B.V.',
      description: 'Ranked among the top 2% of scientists globally in career-long citation database curated by Stanford and Elsevier.',
      order: 3,
    },
    {
      id: 4,
      title: "World's Top 2% Researchers (Single-Year Category: 2024, 2023, 2022)",
      year: '2024',
      date_details: '2022, 2023, 2024',
      awarding_body: 'Stanford University, USA and Elsevier B.V.',
      description: 'Consecutively recognized three times among the World’s Top 2% Researchers in annual citation impact lists.',
      order: 4,
    },
    {
      id: 5,
      title: 'Jamia Achievers Award',
      year: '2023',
      date_details: '29th October, 2023',
      awarding_body: 'Jamia Millia Islamia (Central University)',
      description: 'Received from Honorable Vice Chancellor of JMI Prof. Najma Akhtar, Ms. Sharmila Tagore, and Dr. Shiv Kumar Sarin.',
      order: 5,
    },
    {
      id: 6,
      title: 'Dean FET Appreciation for Global Stanford Ranking',
      year: '2022',
      date_details: '2022',
      awarding_body: 'Dean, Faculty of Engineering & Technology, JMI',
      description: 'Received official commendation from Dean Prof. Mini Shaji Thomas for global ranking in Stanford / Elsevier dataset.',
      order: 6,
    },
  ];

  // Verified fallback editorial roles matching Django DB
  const defaultEditorialRoles: EditorialRole[] = [
    {
      id: 1,
      journal_name: 'Scientific Reports',
      publisher: 'Nature / Springer Nature',
      role_type_display: 'Editorial Board Member',
      indexing: 'SCIE-indexed',
      years_active: 'Active Appointment',
      order: 1,
    },
    {
      id: 2,
      journal_name: 'Discover Computing',
      publisher: 'Springer',
      role_type_display: 'Editorial Board Member',
      indexing: 'SCIE-indexed',
      years_active: 'Active Appointment',
      order: 2,
    },
    {
      id: 3,
      journal_name: 'International Journal of Information Security and Privacy (IJISP)',
      publisher: 'IGI Global',
      role_type_display: 'Associate Editor',
      indexing: 'ESCI-SCOPUS indexed',
      years_active: 'Active Appointment',
      order: 3,
    },
    {
      id: 4,
      journal_name: 'International Journal of Artificial Intelligence in Scientific Disciplines (IJAISD)',
      publisher: 'IGI Global',
      role_type_display: 'Associate Editor',
      indexing: 'IGI Global Publication',
      years_active: 'Active Appointment',
      order: 4,
    },
    {
      id: 5,
      journal_name: 'Scientific Reports',
      publisher: 'Springer Nature',
      role_type_display: 'Guest Editor / Special Issue',
      indexing: 'SCIE-indexed',
      special_issue_title: 'Post-quantum cybersecurity and cryptography',
      submission_deadline: 'Submissions open till 28th February, 2026',
      years_active: 'Active Appointment',
      order: 5,
    },
    {
      id: 6,
      journal_name: 'Discover Computing',
      publisher: 'Springer',
      role_type_display: 'Guest Editor / Special Issue',
      indexing: 'SCIE-indexed',
      special_issue_title: 'Securing Critical Infrastructure in Next-Generation Networks',
      submission_deadline: 'Submissions open till 30th September, 2025',
      years_active: 'Active Appointment',
      order: 6,
    },
  ];

  const rawHonors = (honors && honors.length > 0) ? honors : defaultHonors;
  const displayRoles = (editorial_roles && editorial_roles.length > 0) ? editorial_roles : defaultEditorialRoles;
  // Duplicate 3x for seamless vertical loop
  const marqueeRoles = [...displayRoles, ...displayRoles, ...displayRoles];

  return (
    <div className="w-full font-sans max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* ───────────────────────────────────────────────────────────────────
          2-COLUMN SIDE-BY-SIDE GRID (Height-Constrained for 1 Viewport)
          ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch w-full">
        
        {/* ═══════════════════════════════════════════════════════════════════
            LEFT COLUMN: TIMELINE COMPONENT (Matching Reference Design)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="md:col-span-6 min-h-0 flex flex-col bg-white/95 dark:bg-[#11131A] backdrop-blur-md border border-slate-200/90 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-lg hover:border-emerald-500/40 transition-all h-full justify-between">
          
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-white/10 mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Award size={16} strokeWidth={2.4} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
                  Honors &amp; Scientific Distinctions
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Stanford Top 2% &bull; Institutional Citations
                </span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
              {rawHonors.length} Distinctions
            </span>
          </div>

          {/* Timeline Scrollable Container */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-0 relative scrollbar-thin my-1">
            {rawHonors.map((honor: any, idx) => {
              const dateStr = honor.date_details || honor.year || '2024';
              const org = honor.awarding_body || honor.issuing_organization || 'Academic Recognition';
              const detail = honor.description || honor.citation || '';

              return (
                <div key={honor.id || idx} className="relative pl-9 pb-6 last:pb-2 group">
                  {/* Continuous Vertical Connecting Spine Line — Achieved */}
                  {idx < rawHonors.length - 1 && (
                    <div
                      className="absolute left-[13px] top-4 bottom-0 w-[2px] bg-emerald-400/50 dark:bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors"
                      aria-hidden="true"
                    />
                  )}

                  {/* Node Badge — All Achieved */}
                  <div className="absolute left-0 top-0.5 z-10">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 dark:bg-emerald-500 text-white flex items-center justify-center shadow-md ring-4 ring-emerald-100 dark:ring-emerald-500/20 transition-transform group-hover:scale-110">
                      <Check size={13} strokeWidth={3} className="text-white" />
                    </div>
                  </div>

                  {/* Content Stack */}
                  <div className="pt-0.5">
                    {/* Timestamp / Date */}
                    <div className="text-[10px] sm:text-[11px] font-mono font-medium text-blue-600 dark:text-emerald-400 mb-1">
                      {dateStr}
                    </div>

                    {/* Bold Title */}
                    <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white leading-snug font-sans group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {honor.title}
                    </h4>

                    {/* Subtitle: Organization + Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-sans mt-1.5 leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {org}
                      </span>
                      {detail && (
                        <span className="text-slate-500 dark:text-slate-400">
                          {' '}&bull; {detail}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Bottom Summary Strip */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            <span>Career Span &bull; 2022&ndash;2025</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified Records</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            RIGHT COLUMN: TOP-BOTTOM MARQUEE WITH EDITORIAL BANNERS
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="md:col-span-6 min-h-0 flex flex-col bg-white/95 dark:bg-[#11131A] backdrop-blur-md border border-slate-200/90 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-lg hover:border-emerald-500/40 transition-all h-full justify-between">
          
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-white/10 mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <BookOpen size={16} strokeWidth={2.4} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
                  Editorial Board Appointments
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  SCI/SCIE Journals &bull; Top-Bottom Stream
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Hover to Pause
              </span>
            </div>
          </div>

          {/* Marquee Track Container with Gradient Fade Masks */}
          <div className="relative flex-1 overflow-hidden rounded-2xl my-1">
            {/* Top Fade Gradient Mask */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white dark:from-[#11131A] to-transparent z-20"
              aria-hidden="true"
            />
            {/* Bottom Fade Gradient Mask */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-[#11131A] to-transparent z-20"
              aria-hidden="true"
            />

            {/* Continuous Vertical Downward Scrolling Marquee Track */}
            <div className="flex flex-col space-y-2.5 animate-marquee-vertical-down hover:[animation-play-state:paused] py-1">
              {marqueeRoles.map((role, rIdx) => {
                const isNature = role.publisher?.toLowerCase().includes('nature') || role.journal_name.toLowerCase().includes('nature') || role.journal_name.toLowerCase().includes('scientific reports');
                const isSpringer = !isNature && (role.publisher?.toLowerCase().includes('springer') || role.journal_name.toLowerCase().includes('discover'));

                return (
                  <div
                    key={`${role.id}-${rIdx}`}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/[0.03] transition-all hover:scale-[1.01] hover:shadow-sm cursor-pointer group/editorial-card shrink-0"
                  >
                    {/* Banner Top Strip: Publisher & Role Pill */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[9px] sm:text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                        isNature
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
                          : isSpringer
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                          : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                      }`}>
                        {role.publisher || 'SCI Peer-Reviewed'}
                      </span>

                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {role.role_type_display || role.role_title || 'Editorial Board Member'}
                      </span>
                    </div>

                    {/* Banner Journal Title */}
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white font-sans group-hover/editorial-card:text-emerald-600 dark:group-hover/editorial-card:text-emerald-400 transition-colors leading-snug">
                        {role.journal_name}
                      </h4>
                      <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover/editorial-card:opacity-100 transition-opacity shrink-0 mt-0.5" />
                    </div>

                    {/* Indexing Badges & Active Span */}
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {role.indexing && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-medium">
                          {role.indexing}
                        </span>
                      )}
                      <span className="text-slate-400">
                        &bull; {role.years_active || 'Active Appointment'}
                      </span>
                    </div>

                    {/* Special Collection Highlight (if present) */}
                    {role.special_issue_title && (
                      <div className="mt-2 p-1.5 rounded-lg bg-white dark:bg-black/30 border border-slate-200/60 dark:border-white/5 text-[10.5px] font-sans text-slate-600 dark:text-slate-300 leading-snug">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Special Issue: </span>
                        &ldquo;{role.special_issue_title}&rdquo;
                        {role.submission_deadline && (
                          <span className="text-slate-400 block font-mono text-[9.5px] mt-0.5">
                            (Deadline: {role.submission_deadline})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marquee Bottom Status Strip */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            <span>Nature &bull; Springer &bull; IGI Global</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active Peer Leadership</span>
          </div>
        </div>

      </div>
    </div>
  );
};
