import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Newspaper, Calendar } from 'lucide-react';
import { NewsItem } from '../lib/types';

interface InfiniteNewsMarqueeProps {
  items?: NewsItem[];
}

export const InfiniteNewsMarquee: React.FC<InfiniteNewsMarqueeProps> = ({ items }) => {
  // Curated fallback items matching Dr. Musheer Ahmad's verified recent milestones
  const defaultItems: NewsItem[] = [
    {
      id: 1,
      title: "Recognized among World's Top 2% Scientists by Stanford University & Elsevier",
      slug: "stanford-top-2-percent-2024",
      date: "Oct 2024",
      category: "Distinction",
      body: "Ranked in global top 2% across single-year and career-long citation impact in Information Security.",
      link: "/news",
      is_pinned: true,
    },
    {
      id: 2,
      title: "Call for Papers: Springer 'Discover Computing' Special Collection on Chaos Cryptology",
      slug: "springer-discover-computing-cfp",
      date: "Jan 2025",
      category: "Editorial",
      body: "Guest editing special collection on Nonlinear Dynamical Systems and Advanced Cryptographic Primitives.",
      link: "/news",
      is_pinned: true,
    },
    {
      id: 3,
      title: "Special Issue Guest Editor for Nature Scientific Reports (Q1, IF: 4.6)",
      slug: "scientific-reports-special-issue",
      date: "Dec 2024",
      category: "Editorial",
      body: "Invited Call for Papers on Secure Medical Image Processing and Lightweight S-box Cryptosystems.",
      link: "/news",
      is_pinned: false,
    },
    {
      id: 4,
      title: "New Research Paper accepted in IEEE Transactions on Consumer Electronics",
      slug: "ieee-tce-paper-accepted",
      date: "Nov 2024",
      category: "Publication",
      body: "High-throughput chaotic permutation-substitution framework for 4K video surveillance streaming.",
      link: "/publications",
      is_pinned: false,
    },
    {
      id: 5,
      title: "Faculty Excellence Recognition in Research & Mentorship at Jamia Millia Islamia",
      slug: "jmi-faculty-excellence-award",
      date: "Aug 2024",
      category: "Award",
      body: "Honored by the Faculty of Engineering & Technology for sustained high-impact SCI journal research.",
      link: "/news",
      is_pinned: false,
    },
  ];

  const newsList = items && items.length > 0 ? items : defaultItems;
  // Double the list so it loops seamlessly
  const doubledItems = [...newsList, ...newsList];

  return (
    <section className="relative w-full bg-transparent text-slate-900 dark:text-white my-8 py-4 sm:py-10 overflow-hidden border-y border-transparent transition-colors">
      {/* Top Header Row with Minimalist Pill */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse"></span>
            <span>Live Dispatches</span>
          </div> */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white m-0">
            Recent Announcements &amp; Milestones
          </h3>
        </div>

        <Link
          to="/news"
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors no-underline group self-start sm:self-auto"
        >
          <span>View Archive</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#090A0F] dark:via-[#090A0F]/80 z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#090A0F] dark:via-[#090A0F]/80 z-20" />

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] transition-all">
          {doubledItems.map((item, index) => {
            const isExternal = item.link?.startsWith('http');
            const targetUrl = item.link || `/news#${item.slug}`;

            const CardContent = (
              <div className="group/announcement-card w-[360px] sm:w-[420px] bg-slate-50 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm shadow-sm dark:shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400 dark:text-slate-500" />
                      {item.date}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                      {item.category || 'Announcement'}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover/announcement-card:text-emerald-700 dark:group-hover/announcement-card:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>

                  {item.body && (
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 m-0">
                      {item.body}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Dr. Musheer Ahmad Lab</span>
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold group-hover/announcement-card:text-emerald-700 dark:group-hover/announcement-card:text-emerald-300 group-hover/announcement-card:underline">
                    <span>Read details</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            );

            return isExternal ? (
              <a
                key={`${item.id}-${index}`}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-inherit block focus:outline-none"
              >
                {CardContent}
              </a>
            ) : (
              <Link
                key={`${item.id}-${index}`}
                to={targetUrl}
                className="no-underline text-inherit block focus:outline-none"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

