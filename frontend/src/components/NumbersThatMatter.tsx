import React from 'react';
import { Quote, TrendingUp, FileText, Users, Award, Star } from 'lucide-react';
import { SiteSettings } from '../lib/types';

interface NumbersThatMatterProps {
  settings?: SiteSettings;
}

export const NumbersThatMatter: React.FC<NumbersThatMatterProps> = ({ settings }) => {
  return (
    <section className="bg-[#0E0F12] text-white py-24 px-6 sm:px-8 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
            Numbers that matter
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            A quick look at the impact and adoption of our research &amp; publications
          </p>
        </div>

        {/* 5-Card Bento Grid (Matching reference design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Blue - Citations */}
          <div className="bg-[#0D192E] border border-blue-500/20 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#3B82F6] mb-8 group-hover:scale-110 transition-transform">
              <Quote size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                {(settings?.citations_count || 6850).toLocaleString()}+
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed m-0">
                Citations in cryptology, S-box synthesis, and secure multimedia
              </p>
            </div>
          </div>

          {/* Card 2: Green - h-Index */}
          <div className="bg-[#0E2319] border border-emerald-500/20 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981] mb-8 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                {settings?.h_index || 45}
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed m-0">
                h-Index scholarly impact across Google Scholar &amp; Scopus (38)
              </p>
            </div>
          </div>

          {/* Card 5: Tall Featured Card on Right - Stanford Top 2% (Spans 2 rows on desktop) */}
          <div className="lg:row-span-2 bg-[#0F172A] border border-blue-500/20 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden hover:border-blue-500/40 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#3B82F6] mb-8 group-hover:scale-110 transition-transform">
                <Award size={20} strokeWidth={2.4} />
              </div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                Top 2%
              </div>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-6">
                World's Top 2% Scientist — Stanford University &amp; Elsevier global ranking
              </p>
            </div>

            {/* Scientific Excellence / Stargazer Vector Illustration */}
            <div className="relative mt-auto pt-6 flex items-center justify-center">
              <svg className="w-full max-w-[220px] h-auto drop-shadow-2xl" viewBox="0 0 200 180" fill="none">
                {/* Night sky background gradient */}
                <circle cx="100" cy="90" r="75" fill="rgba(244, 63, 94, 0.08)" />
                {/* Radiant Star at top */}
                <g className="animate-pulse">
                  <polygon points="100,20 105,34 120,34 108,43 112,57 100,48 88,57 92,43 80,34 95,34" fill="#3B82F6" />
                  <circle cx="100" cy="38" r="18" fill="#3B82F6" opacity="0.2" filter="blur(6px)" />
                </g>
                {/* Ladder of Academic Achievement */}
                <line x1="85" y1="58" x2="85" y2="170" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
                <line x1="115" y1="58" x2="115" y2="170" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
                <line x1="85" y1="80" x2="115" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                <line x1="85" y1="102" x2="115" y2="102" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                <line x1="85" y1="124" x2="115" y2="124" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                <line x1="85" y1="146" x2="115" y2="146" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                {/* Researcher silhouette climbing */}
                <circle cx="100" cy="88" r="9" fill="#FFFFFF" />
                <path d="M92 108 C92 98, 108 98, 108 108 L108 135 L102 135 L102 116 L98 116 L98 135 L92 135 Z" fill="#3B82F6" />
                <line x1="93" y1="104" x2="85" y2="92" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <line x1="107" y1="104" x2="115" y2="92" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Emerald - Papers */}
          <div className="bg-[#0F172A] border border-emerald-500/20 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#22C55E] mb-8 group-hover:scale-110 transition-transform">
              <FileText size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                {settings?.total_papers || 157}+
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed m-0">
                Peer-reviewed research works (58+ SCI Journals, 57+ IEEE Conferences)
              </p>
            </div>
          </div>

          {/* Card 4: Blue - i10-Index & Supervision */}
          <div className="bg-[#0F172A] border border-blue-500/20 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#3B82F6] mb-8 group-hover:scale-110 transition-transform">
              <Users size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                120+
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed m-0">
                i10-Index papers &bull; 18+ years university pedagogy &amp; doctoral mentorship
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

