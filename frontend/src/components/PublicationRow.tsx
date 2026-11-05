import React, { useState } from 'react';
import { ExternalLink, FileDown, Code, ChevronDown, ChevronUp, Quote, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Publication } from '../lib/types';

interface PublicationRowProps {
  publication: Publication;
}

export const PublicationRow: React.FC<PublicationRowProps> = ({ publication }) => {
  const [showCite, setShowCite] = useState(false);
  const [citeFormat, setCiteFormat] = useState<'BIBTEX' | 'APA' | 'IEEE'>('BIBTEX');
  const [copied, setCopied] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  // Sanitize Impact Factor string
  const cleanIF = publication.impact_factor_as_listed
    ? publication.impact_factor_as_listed.replace(/^(?:IF\s*:\s*)+/gi, '').trim()
    : '';

  // Distinguish SCI Q1 or premier journals
  const isQ1 = publication.index_tags && /Q1|SCI-E|SCIE|IEEE Trans/i.test(publication.index_tags);

  // Bold "Musheer Ahmad" in authors list
  const renderAuthors = (authorsStr: string) => {
    const parts = authorsStr.split(/(Musheer Ahmad)/gi);
    return parts.map((part, i) => {
      if (part.toLowerCase() === 'musheer ahmad') {
        return (
          <strong key={i} className="author-highlight">
            Musheer Ahmad
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Standard BibTeX
  const bibtexText = publication.bibtex || `@article{ahmad${publication.year}_${publication.id},
  title={${publication.title}},
  author={${publication.authors}},
  journal={${publication.venue}},
  year={${publication.year}}${publication.volume_issue_pages ? `,\n  pages={${publication.volume_issue_pages}}` : ''}${publication.doi ? `,\n  doi={${publication.doi}}` : ''}
}`;

  // APA citation
  const apaText = `${publication.authors} (${publication.year}). ${publication.title}. ${publication.venue}${publication.volume_issue_pages ? `, ${publication.volume_issue_pages}` : ''}.${publication.doi ? ` https://doi.org/${publication.doi}` : ''}`;

  // IEEE citation
  const ieeeText = `${publication.authors}, "${publication.title}," ${publication.venue}${publication.volume_issue_pages ? `, ${publication.volume_issue_pages}` : ''}, ${publication.year}.${publication.doi ? ` doi: ${publication.doi}.` : ''}`;

  const currentCitation = citeFormat === 'BIBTEX' ? bibtexText : citeFormat === 'APA' ? apaText : ieeeText;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(currentCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([bibtexText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ahmad${publication.year}_${publication.id}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <article className="pub-card">
      <div className="pub-card__year-badge">
        <span>{publication.year}</span>
      </div>

      <div className="pub-card__content">
        {/* Title */}
        <h3 className="pub-card__title">
          {publication.doi ? (
            <a
              href={publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-title-link"
            >
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h3>

        {/* Authors */}
        <div className="pub-card__authors">
          {renderAuthors(publication.authors)}
        </div>

        {/* Venue & Metadata Badges */}
        <div className="pub-card__venue-row">
          <span className="pub-venue-name">{publication.venue}</span>
          {publication.volume_issue_pages && (
            <span className="pub-venue-pages">, {publication.volume_issue_pages}</span>
          )}

          <div className="pub-card__badges">
            {isQ1 && (
              <span className="badge-q1" title="Top-Quartile Impact Journal">
                <Sparkles size={11} />
                <span>SCI Q1</span>
              </span>
            )}
            {cleanIF && (
              <span className="badge-if" title="Journal Impact Factor">
                IF: {cleanIF}
              </span>
            )}
            {!isQ1 && publication.index_tags && (
              <span className="badge-scopus" title="Indexing Verification">
                {publication.index_tags}
              </span>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pub-card__actions">
          {publication.doi && (
            <a
              href={publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-pill-btn"
              title="Open Official DOI"
            >
              <ExternalLink size={12} />
              <span>DOI</span>
            </a>
          )}

          {publication.pdf_url && (
            <a
              href={publication.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-pill-btn"
              title="Download PDF"
            >
              <FileDown size={12} />
              <span>PDF</span>
            </a>
          )}

          {publication.code_url && (
            <a
              href={publication.code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-pill-btn"
              title="Source Code Repository"
            >
              <Code size={12} />
              <span>Code</span>
            </a>
          )}

          {publication.abstract && (
            <button
              type="button"
              onClick={() => setShowAbstract(!showAbstract)}
              className={`pub-pill-btn ${showAbstract ? 'active' : ''}`}
            >
              {showAbstract ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              <span>{showAbstract ? 'Hide Abstract' : 'Abstract'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowCite(!showCite)}
            className={`pub-pill-btn ${showCite ? 'active' : ''}`}
          >
            <Quote size={12} />
            <span>{showCite ? 'Close Cite' : 'Cite'}</span>
          </button>
        </div>

        {/* Expandable Abstract Panel */}
        {showAbstract && publication.abstract && (
          <div className="pub-abstract-drawer">
            <span className="drawer-kicker">Scholarly Abstract</span>
            <p className="drawer-text">
              {publication.abstract}
            </p>
          </div>
        )}

        {/* Expandable Cite Drawer */}
        {showCite && (
          <div className="pub-cite-drawer">
            <div className="cite-drawer__header">
              <span className="drawer-kicker">Citation Format:</span>
              <div className="cite-format-tabs">
                <button
                  type="button"
                  onClick={() => setCiteFormat('BIBTEX')}
                  className={`cite-tab ${citeFormat === 'BIBTEX' ? 'active' : ''}`}
                >
                  BibTeX
                </button>
                <button
                  type="button"
                  onClick={() => setCiteFormat('APA')}
                  className={`cite-tab ${citeFormat === 'APA' ? 'active' : ''}`}
                >
                  APA
                </button>
                <button
                  type="button"
                  onClick={() => setCiteFormat('IEEE')}
                  className={`cite-tab ${citeFormat === 'IEEE' ? 'active' : ''}`}
                >
                  IEEE
                </button>
              </div>
            </div>

            <pre className="cite-code-block">
              {currentCitation}
            </pre>

            <div className="cite-drawer__footer">
              <button
                type="button"
                onClick={handleCopyCitation}
                className="btn-cite-action"
              >
                {copied ? <Check size={13} className="text-sage" /> : <Copy size={13} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
              </button>

              {citeFormat === 'BIBTEX' && (
                <button
                  type="button"
                  onClick={handleDownloadBib}
                  className="btn-cite-action"
                >
                  <Download size={13} />
                  <span>Download .bib File</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
