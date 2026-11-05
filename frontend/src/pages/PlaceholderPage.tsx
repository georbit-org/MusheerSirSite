import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';

interface PlaceholderPageProps {
  title: string;
  label: string;
  description: string;
  nextPhaseNotes?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  label,
  description,
  nextPhaseNotes = 'Full editorial layout and CMS integration scheduled in Phase 2.',
}) => {
  return (
    <>
      <Helmet>
        <title>{title} — Dr. Musheer Ahmad | Jamia Millia Islamia</title>
      </Helmet>

      <Section label={label} style={{ minHeight: '60vh', paddingTop: '4rem' }}>
        <div style={{ maxWidth: 'var(--text-max-ch)' }}>
          <Heading level="h1" style={{ marginBottom: '1.5rem' }}>
            {title}
          </Heading>

          <p className="text-pblue" style={{ marginBottom: '2rem' }}>
            {description}
          </p>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
            }}
          >
            <strong>[Architecture Status]:</strong> {nextPhaseNotes}
          </div>

          <Button variant="secondary" href="/">
            &larr; Return to Home Overview
          </Button>
        </div>
      </Section>
    </>
  );
};
