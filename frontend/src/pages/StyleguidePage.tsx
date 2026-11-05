import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { TextLink } from '../components/TextLink';
import { PublicationRow } from '../components/PublicationRow';
import { DateList } from '../components/DateList';
import { Figure } from '../components/Figure';
import { Publication, NewsItem } from '../lib/types';

export const StyleguidePage: React.FC = () => {
  const samplePub: Publication = {
    id: 101,
    title: 'A novel construction of cryptographic S-boxes using chaotic map and linear fractional transformation',
    slug: 'ahmad-2021-sbox-demo',
    authors: 'Musheer Ahmad, H. K. Verma',
    venue: 'Chaos, Solitons & Fractals',
    year: 2021,
    volume_issue_pages: 'vol. 142, p. 110419',
    publication_type: 'JOURNAL',
    doi: '10.1016/j.chaos.2020.110419',
    pdf_url: 'https://doi.org/10.1016/j.chaos.2020.110419',
    bibtex: `@article{ahmad2021sbox,\n  title={A novel construction of cryptographic S-boxes using chaotic map and linear fractional transformation},\n  author={Ahmad, Musheer and Verma, H. K.},\n  journal={Chaos, Solitons \\& Fractals},\n  volume={142},\n  pages={110419},\n  year={2021}\n}`,
    is_selected: true,
    citation_count: 86,
    order: 1,
  };

  const sampleNews: NewsItem[] = [
    {
      id: 201,
      title: 'Invited Lecture on Nonlinear Cryptology at IEEE Cyber Security Symposium',
      slug: 'sample-lecture',
      date: '2026-10-15',
      category: 'Keynote',
      body: 'Demonstrating clean dated list styling with monospace timestamps and high-contrast typography.',
      is_pinned: true,
    },
    {
      id: 202,
      title: 'Research Paper on Hyperchaotic Medical Image Encryption Accepted in Nonlinear Dynamics',
      slug: 'sample-acceptance',
      date: '2026-09-28',
      category: 'Publication',
      is_pinned: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Design System & Styleguide — Swiss Academic Editorial</title>
      </Helmet>

      <Section label="01. Design Tokens">
        <Heading level="h1" style={{ marginBottom: '1rem' }}>
          Swiss Academic Design System
        </Heading>
        <p className="text-pblue" style={{ marginBottom: '2.5rem' }}>
          Strict light theme, pure CSS variables, self-hosted typography (Newsreader, Inter, JetBrains Mono),
          and zero icon dependencies.
        </p>

        {/* Color Palette Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { name: 'Carbon Charcoal', hex: '#1F1F1F', text: '#FFFFFF' },
            { name: 'Pure White Canvas', hex: '#FFFFFF', border: true, text: '#1F1F1F' },
            { name: 'Matcha Accent', hex: '#9BCD80', text: '#1F1F1F' },
            { name: 'Mountain Sage', hex: '#75A06A', text: '#FFFFFF' },
            { name: 'Dark Olive Ink', hex: '#272826', text: '#FFFFFF' },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                background: c.hex,
                color: c.text || 'inherit',
                border: c.border ? '1px solid var(--border-hairline)' : 'none',
                padding: '1rem',
                borderRadius: 'var(--radius-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{c.name}</div>
              <div>{c.hex}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="02. Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Display (Newsreader Serif)</div>
            <Heading level="display">Dr. Musheer Ahmad</Heading>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Heading 1</div>
            <Heading level="h1">Applied Cryptology & Nonlinear Dynamics</Heading>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Heading 2</div>
            <Heading level="h2">Chaos-Based Cryptosystems & S-Box Synthesis</Heading>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Heading 3</div>
            <Heading level="h3">Lightweight Ciphers for Edge Sensor Nodes</Heading>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>Pblue Text (Inter 17px/1.65)</div>
            <p className="text-pblue">
              The synthesis of cryptographic S-boxes forms the non-linear foundation of modern symmetric block ciphers.
              Our research explores continuous hyperchaotic attractors, high-dimensional discrete maps, and projective geometric
              transformations to systematically engineer bijective S-boxes satisfying strict cryptographic benchmarks.
            </p>
          </div>
        </div>
      </Section>

      <Section label="03. Interactive Kit">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Button Elements</div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Button variant="primary">
                Primary Button Solid &rarr;
              </Button>
              <Button variant="secondary">
                Secondary Underline Link &rarr;
              </Button>
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>TextLink Elements</div>
            <p className="text-pblue">
              Links inside editorial copy are formatted with{' '}
              <TextLink href="/publications">underlined text that transitions cleanly to deep green</TextLink>{' '}
              upon user hover.
            </p>
          </div>
        </div>
      </Section>

      <Section label="04. Publication Row">
        <PublicationRow publication={samplePub} />
      </Section>

      <Section label="05. Date List">
        <DateList items={sampleNews} />
      </Section>

      <Section label="06. Figure with Static SVG">
        <Figure
          figureNumber="1"
          caption="Numerical orbit of the Lorenz chaotic attractor projected in phase space (sigma = 10, rho = 28, beta = 8/3), demonstrating continuous non-repeating trajectories."
        />
      </Section>
    </>
  );
};
