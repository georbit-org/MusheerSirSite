import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchResearchOpenings, submitProspectiveApplication } from '../lib/api';
import { ApplicationSubmission } from '../lib/types';
import { Button } from '../components/Button';
import {
  Binary,
  Cpu,
  Terminal,
  Award,
  FileText,
  Compass,
  Layers,
  Send,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export const JoinPage: React.FC = () => {
  const { data: openings } = useQuery({
    queryKey: ['researchOpenings'],
    queryFn: fetchResearchOpenings,
  });

  const [formData, setFormData] = useState<ApplicationSubmission>({
    full_name: '',
    email: '',
    phone: '',
    current_institution: '',
    degree_and_gpa: '',
    position_applied_for: 'Ph.D. Research Scholar',
    research_statement: '',
    paper_reference: '',
    cv_url_or_link: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitProspectiveApplication(formData);
      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to record application. Please email your materials directly to mahmad9@jmi.ac.in.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Prospective Researchers &amp; Positions — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Admissions guidelines, prerequisite requirements, and inquiry procedures for prospective doctoral and postgraduate researchers under Dr. Musheer Ahmad at Jamia Millia Islamia."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Academic Opportunities &amp; Supervision</span>
            <h1 className="section-header__title">Prospective Researchers &amp; Positions</h1>
            <p className="section-header__desc">
              Admissions guidelines, prerequisite expectations, and dossier submission procedures for prospective
              doctoral scholars, postgraduate dissertation researchers, and visiting fellows seeking to conduct
              inquiry in non-linear cryptology and cyber-physical security under Dr. Musheer Ahmad at Jamia Millia Islamia.
            </p>
          </header>

          {/* Active Positions / Announcements */}
          {openings && openings.length > 0 && (
            <div style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '3rem' }}>
              <span className="section-eyebrow">Active Solicitations</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', margin: '0.5rem 0 1.5rem 0' }}>
                Open Research Positions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {openings.map((opening) => (
                  <article key={opening.id} style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                        {opening.title}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                        {opening.position_type}
                      </span>
                    </div>
                    {opening.funding_info && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                        Funding / Support: {opening.funding_info}
                        {opening.deadline && ` &bull; Deadline: ${opening.deadline}`}
                      </div>
                    )}
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem' }}>
                      {opening.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Two-Column Editorial Layout: Requirements & Dossier Protocol */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              marginBottom: '5rem',
            }}
          >
            {/* Left Column: Domains & Prerequisites */}
            <div>
              <span className="section-eyebrow">Academic Foundation</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  color: 'var(--text-primary)',
                  margin: '0.35rem 0 1.5rem 0',
                  fontWeight: 500,
                }}
              >
                Candidate Prerequisites
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                Doctoral and postgraduate research in our laboratory centers on mathematically rigorous formulations
                and empirical security validation. Prospective researchers should possess:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Binary size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      1. Mathematical Rigor
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Proficiency in discrete mathematics, finite fields ($GF(2^n)$), group theory, linear algebra, probability, and dynamical systems theory.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Cpu size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      2. Algorithmic Competence
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Deep comprehension of algorithm design, computational complexity, and cryptographic primitive implementation (confusion and diffusion).
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Terminal size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      3. Scientific Programming
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Hands-on fluency in Python (NumPy, SciPy, PyTorch), MATLAB, C/C++, or Julia for numerical ODE integration and NIST SP 800-22 statistical testing.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Award size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      4. National Fellowship Priority
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Candidates holding national research fellowships (UGC-NET JRF, CSIR-NET JRF, or DST-INSPIRE) are strongly encouraged to apply directly.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Application Dossier Instructions */}
            <div>
              <span className="section-eyebrow">Submission Protocol</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  color: 'var(--text-primary)',
                  margin: '0.35rem 0 1.5rem 0',
                  fontWeight: 500,
                }}
              >
                What to Submit
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                To demonstrate alignment with our ongoing scientific investigations, every application must include the following three components:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <FileText size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Component 1: Comprehensive Curriculum Vitae
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Detailing academic qualifications (B.Tech, M.Tech, M.Sc), percentage/CGPA, national exam ranks (GATE, NET-JRF), and past technical projects.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Compass size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Component 2: Statement of Research Intent
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      One concise paragraph identifying your primary area of inquiry (e.g. hyperchaotic keystreams, S-box metaheuristic optimization, or IoT authentication).
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0, marginTop: '0.15rem' }}>
                    <Layers size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Component 3: Mandatory Paper Critique &amp; Proposed Extension
                    </strong>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Read at least one recent research publication by Dr. Musheer Ahmad (see{' '}
                      <Link to="/publications" className="text-link">
                        Publications Page
                      </Link>
                      ) and write a 1–2 page critique outlining: (a) the paper&apos;s core mathematical mechanism, (b) its limitations or cryptanalytic attack surface, and (c) a concrete proposal for extending or generalizing its findings.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Submission Form — Enclosed in Dedicated Box */}
          <div
            style={{
              paddingTop: '2.5rem',
              marginBottom: '5rem',
            }}
          >
            <div className="contact-form-box" style={{ maxWidth: '820px' }}>
              <span className="section-eyebrow">Direct Application Submission</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--text-primary)',
                  margin: '0.35rem 0 1rem 0',
                  fontWeight: 500,
                }}
              >
                Submit Prospective Research Inquiry
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '720px',
                  marginBottom: '2rem',
                }}
              >
                Submit your inquiry through the research registry below, or transmit your complete dossier via official email to{' '}
                <a href="mailto:mahmad9@jmi.ac.in" className="text-link">
                  mahmad9@jmi.ac.in
                </a>{' '}
                with subject line formatted as: <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>[Prospective Researcher] [Degree/Position] Your Name</code>.
              </p>

            {submitSuccess ? (
              <div
                style={{
                  padding: '2rem 0',
                  borderTop: '1px solid var(--accent-sage-dark)',
                  borderBottom: '1px solid var(--accent-sage-dark)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={24} color="var(--accent-sage-dark)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent-sage-dark)', margin: 0, fontWeight: 500 }}>
                    Inquiry Successfully Registered
                  </h3>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Thank you for submitting your research inquiry. Your dossier has been recorded in Dr. Musheer Ahmad&apos;s research administration queue.
                  Candidates whose background aligns with laboratory requirements will be contacted directly for an academic interview.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-secondary"
                  style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: '780px' }}>
                {errorMessage && (
                  <div
                    style={{
                      padding: '1rem',
                      border: '1px solid rgba(15, 23, 42, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(15, 23, 42, 0.05)',
                      marginBottom: '2rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Honeypot field (hidden from legitimate users, traps bots) */}
                <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                  <label htmlFor="website_hp">Leave this empty</label>
                  <input
                    id="website_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp || ''}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '1.75rem' }}>
                  <div>
                    <label
                      htmlFor="full_name"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Mohammad Tariq"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        border: 'none',
                        borderBottom: '1px solid var(--border-hairline)',
                        background: 'transparent',
                        borderRadius: 0,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tariq@domain.edu"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        border: 'none',
                        borderBottom: '1px solid var(--border-hairline)',
                        background: 'transparent',
                        borderRadius: 0,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '1.75rem' }}>
                  <div>
                    <label
                      htmlFor="current_institution"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                    >
                      CURRENT UNIVERSITY / INSTITUTION *
                    </label>
                    <input
                      id="current_institution"
                      type="text"
                      required
                      value={formData.current_institution}
                      onChange={(e) => setFormData({ ...formData, current_institution: e.target.value })}
                      placeholder="e.g. Aligarh Muslim University / JMI"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        border: 'none',
                        borderBottom: '1px solid var(--border-hairline)',
                        background: 'transparent',
                        borderRadius: 0,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="degree_and_gpa"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                    >
                      DEGREE, CGPA &amp; GATE/NET QUALIFICATION *
                    </label>
                    <input
                      id="degree_and_gpa"
                      type="text"
                      required
                      value={formData.degree_and_gpa}
                      onChange={(e) => setFormData({ ...formData, degree_and_gpa: e.target.value })}
                      placeholder="e.g. M.Tech CSE (8.8 CGPA), UGC-NET JRF Qualified"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        border: 'none',
                        borderBottom: '1px solid var(--border-hairline)',
                        background: 'transparent',
                        borderRadius: 0,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="position_applied_for"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                  >
                    POSITION APPLIED FOR *
                  </label>
                  <select
                    id="position_applied_for"
                    value={formData.position_applied_for}
                    onChange={(e) => setFormData({ ...formData, position_applied_for: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.5rem',
                      border: '1px solid var(--border-hairline)',
                      background: 'transparent',
                      borderRadius: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  >
                    <option value="Ph.D. Research Scholar">Ph.D. Research Scholar (JRF / Self-Sponsored)</option>
                    <option value="M.Tech Thesis Investigator">M.Tech Dissertation Investigator</option>
                    <option value="B.Tech Major Capstone Student">B.Tech Major Project Candidate (JMI)</option>
                    <option value="Visiting Research Fellow / Intern">Visiting Research Fellow / Academic Intern</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="research_statement"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                  >
                    STATEMENT OF RESEARCH INTEREST (1 PARAGRAPH) *
                  </label>
                  <textarea
                    id="research_statement"
                    required
                    rows={4}
                    value={formData.research_statement}
                    onChange={(e) => setFormData({ ...formData, research_statement: e.target.value })}
                    placeholder="Describe your primary research inquiries, why nonlinear cryptology or IoT authentication aligns with your goals, and your relevant computational background..."
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      border: '1px solid var(--border-hairline)',
                      background: 'transparent',
                      borderRadius: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="paper_reference"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                  >
                    WHICH RECENT PAPER OF DR. AHMAD DID YOU READ AND HOW WOULD YOU EXTEND IT? *
                  </label>
                  <textarea
                    id="paper_reference"
                    required
                    rows={3}
                    value={formData.paper_reference}
                    onChange={(e) => setFormData({ ...formData, paper_reference: e.target.value })}
                    placeholder="Specify the publication (e.g. IEEE IoT Journal 2025, Information Sciences 2022) and outline the core mechanism and your suggested methodological extension..."
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      border: '1px solid var(--border-hairline)',
                      background: 'transparent',
                      borderRadius: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label
                    htmlFor="cv_url_or_link"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                  >
                    CURRICULUM VITAE LINK (DRIVE / DROPBOX / PERSONAL SITE URL) *
                  </label>
                  <input
                    id="cv_url_or_link"
                    type="url"
                    required
                    value={formData.cv_url_or_link}
                    onChange={(e) => setFormData({ ...formData, cv_url_or_link: e.target.value })}
                    placeholder="https://drive.google.com/... or https://yourdomain.com/cv.pdf"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0',
                      border: 'none',
                      borderBottom: '1px solid var(--border-hairline)',
                      background: 'transparent',
                      borderRadius: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ padding: '0.85rem 2.25rem' }}
                  >
                    {isSubmitting ? 'Registering Application...' : <>Submit Research Inquiry &rarr;</>}
                  </button>
                </div>
              </form>
            )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
