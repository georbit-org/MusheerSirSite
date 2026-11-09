import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPublications } from '../lib/api';
import { Publication, SiteSettings } from '../lib/types';
import { PublicationRow } from '../components/PublicationRow';
import {
  Search,
  FileText,
  BookOpen,
  Award,
  TrendingUp,
  Quote,
  Download,
  Layers,
} from 'lucide-react';

interface PublicationsPageProps {
  settings?: SiteSettings;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ settings }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const typeFilter = (searchParams.get('type') as 'ALL' | 'JOURNAL' | 'CONFERENCE' | 'SELECTED') || 'ALL';
  const sortOrder = (searchParams.get('sort') as 'YEAR_DESC' | 'YEAR_ASC' | 'IF_DESC') || 'YEAR_DESC';

  const updateFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === 'ALL' || (key === 'sort' && value === 'YEAR_DESC')) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const { data: publications, isLoading, isError, error } = useQuery({
    queryKey: ['publicationsList'],
    queryFn: fetchPublications,
  });

  const filteredPublications = useMemo(() => {
    if (!publications) return [];

    const list = publications.filter((pub) => {
      // Type filter
      if (typeFilter === 'JOURNAL' && pub.publication_type !== 'JOURNAL') return false;
      if (typeFilter === 'CONFERENCE' && pub.publication_type !== 'CONFERENCE') return false;
      if (typeFilter === 'SELECTED' && !pub.is_selected) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = pub.title.toLowerCase().includes(q);
        const inAuthors = pub.authors.toLowerCase().includes(q);
        const inVenue = pub.venue.toLowerCase().includes(q);
        const inYear = pub.year.toString().includes(q);
        const inTags = pub.index_tags ? pub.index_tags.toLowerCase().includes(q) : false;
        return inTitle || inAuthors || inVenue || inYear || inTags;
      }

      return true;
    });

    // Sort
    list.sort((a, b) => {
      if (sortOrder === 'YEAR_ASC') return a.year - b.year;
      if (sortOrder === 'IF_DESC') {
        const ifA = parseFloat(a.impact_factor_as_listed?.replace(/[^0-9.]/g, '') || '0');
        const ifB = parseFloat(b.impact_factor_as_listed?.replace(/[^0-9.]/g, '') || '0');
        return ifB - ifA || b.year - a.year;
      }
      return b.year - a.year;
    });

    return list;
  }, [publications, searchQuery, typeFilter, sortOrder]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups: Record<number, Publication[]> = {};
    for (const pub of filteredPublications) {
      if (!groups[pub.year]) {
        groups[pub.year] = [];
      }
      groups[pub.year].push(pub);
    }
    const years = Object.keys(groups).map(Number);
    years.sort((a, b) => (sortOrder === 'YEAR_ASC' ? a - b : b - a));
    return years.map((year) => ({
      year,
      pubs: groups[year],
    }));
  }, [filteredPublications, sortOrder]);

  const totalCount = publications ? publications.length : 0;
  const journalCount = publications ? publications.filter((p) => p.publication_type === 'JOURNAL').length : 0;
  const confCount = publications ? publications.filter((p) => p.publication_type === 'CONFERENCE').length : 0;
  const selectedCount = publications ? publications.filter((p) => p.is_selected).length : 0;

  // Export filtered items as .bib file
  const handleExportBibtex = () => {
    if (!filteredPublications || filteredPublications.length === 0) return;
    const bibContent = filteredPublications
      .map((p) => p.bibtex || `@article{ahmad${p.year}_${p.id},\n  title={${p.title}},\n  author={${p.authors}},\n  journal={${p.venue}},\n  year={${p.year}}\n}`)
      .join('\n\n');

    const blob = new Blob([bibContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dr_musheer_ahmad_bibliography_${filteredPublications.length}_papers.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Publications & Scholarly Works — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content={`Complete peer-reviewed publications of Dr. Musheer Ahmad (${totalCount} indexed entries, 58 journals, 57 conferences). Research in chaos cryptology, image encryption, and cybersecurity.`}
        />
        {/* Scholarly JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            'mainEntity': {
              '@type': 'Person',
              'name': 'Dr. Musheer Ahmad',
              'jobTitle': 'Associate Professor',
              'worksFor': {
                '@type': 'CollegeOrUniversity',
                'name': 'Jamia Millia Islamia',
              },
            },
          })}
        </script>
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Scholarly Bibliography</span>
            <h1 className="section-header__title">Publications & Peer-Reviewed Works</h1>
            <p className="section-header__desc">
              Comprehensive chronological index of {settings?.total_papers || 157} peer-reviewed research papers (58 journal articles, 57 conference proceedings)
              authored by Dr. Musheer Ahmad and research collaborators across premier IEEE, Springer, and Elsevier venues.
            </p>
          </header>

          {/* Quick Metrics Bar (Unboxed with Lucide Icons) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              marginBottom: '2rem',
              borderBottom: '1px solid var(--border-hairline)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={13} color="var(--accent-sage-dark)" />
              <span>Total Papers: <strong style={{ color: 'var(--text-primary)' }}>{settings?.total_papers || 157}</strong></span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={13} color="var(--accent-sage-dark)" />
              <span>Journal Articles: <strong style={{ color: 'var(--text-primary)' }}>58</strong> (SCI/SCIE/Scopus)</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={13} color="var(--accent-sage-dark)" />
              <span>Conferences: <strong style={{ color: 'var(--text-primary)' }}>57</strong> (IEEE/Springer)</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Quote size={13} color="var(--accent-sage-dark)" />
              <span>Citations: <strong style={{ color: 'var(--text-primary)' }}>{(settings?.citations_count || 5296).toLocaleString()}</strong></span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={13} color="var(--accent-sage-dark)" />
              <span>h-index: <strong style={{ color: 'var(--text-primary)' }}>{settings?.h_index || 42}</strong></span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={13} color="var(--accent-sage-dark)" />
              <span>Top IF: <strong style={{ color: 'var(--text-primary)' }}>8.2</strong> (IEEE IoT)</span>
            </div>
          </div>

          {/* Search & Filter Controls — Unboxed Clean Editorial */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            {/* Search Input — Curved Pill Input with Icon */}
            <div
              style={{
                flex: '1 1 320px',
                minWidth: '240px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: '#FFFFFF',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.5rem 1.15rem',
                boxShadow: '0 2px 8px rgba(31, 31, 31, 0.03)',
              }}
            >
              <Search size={15} color="var(--accent-sage-dark)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by title, author, journal, or topic..."
                value={searchQuery}
                onChange={(e) => updateFilter('q', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.2rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Filter Tabs (Curved Pill Buttons) */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => updateFilter('type', 'ALL')}
                className={`attractor-tab-btn ${typeFilter === 'ALL' ? 'active' : ''}`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => updateFilter('type', 'JOURNAL')}
                className={`attractor-tab-btn ${typeFilter === 'JOURNAL' ? 'active' : ''}`}
              >
                Journals ({journalCount})
              </button>
              <button
                type="button"
                onClick={() => updateFilter('type', 'CONFERENCE')}
                className={`attractor-tab-btn ${typeFilter === 'CONFERENCE' ? 'active' : ''}`}
              >
                Conferences ({confCount})
              </button>
              <button
                type="button"
                onClick={() => updateFilter('type', 'SELECTED')}
                className={`attractor-tab-btn ${typeFilter === 'SELECTED' ? 'active' : ''}`}
              >
                Selected ({selectedCount})
              </button>
            </div>

            {/* Sort & Export Actions */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <label htmlFor="pub-sort">Sort: </label>
                <select
                  id="pub-sort"
                  value={sortOrder}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-hairline)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-pill)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="YEAR_DESC">Newest First</option>
                  <option value="YEAR_ASC">Oldest First</option>
                  <option value="IF_DESC">Highest Impact Factor</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleExportBibtex}
                className="btn-secondary"
                title="Download BibTeX file of currently filtered publications"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={13} />
                <span>Export .bib ({filteredPublications.length})</span>
              </button>
            </div>
          </div>

          {/* Showing Count Status */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Showing {filteredPublications.length} of {totalCount} indexed publications
            {searchQuery && ` matching "${searchQuery}"`}
            {typeFilter !== 'ALL' && ` in ${typeFilter.toLowerCase()}s`}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div style={{ padding: '3rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Loading indexed publication bibliography...
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div style={{ padding: '2rem', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }}>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {error instanceof Error ? error.message : 'Failed to retrieve publications from database.'}
              </p>
            </div>
          )}

          {/* Publications List Grouped by Year (Unboxed) */}
          {!isLoading && !isError && (
            <div>
              {groupedByYear.length === 0 ? (
                <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No publications matched your search query &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                groupedByYear.map(({ year, pubs }) => (
                  <div key={year} style={{ marginBottom: '3.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1rem',
                        marginBottom: '1rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid var(--text-primary)',
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.75rem',
                          color: 'var(--text-primary)',
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {year}
                      </h2>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ({pubs.length} {pubs.length === 1 ? 'publication' : 'publications'})
                      </span>
                    </div>

                    <div className="pub-list">
                      {pubs.map((pub) => (
                        <PublicationRow key={pub.id} publication={pub} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
