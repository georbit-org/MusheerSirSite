import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteSettings } from '../lib/types';
import { submitProspectiveApplication } from '../lib/api';
import {
  GoogleScholarLogo,
  ScopusLogo,
  ResearchGateLogo,
  DblpLogo,
  WebOfScienceLogo,
  UniversityLogo,
} from '../components/ScholarlyLogos';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Compass,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface ContactPageProps {
  settings?: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    subject: '',
    message: '',
    website_hp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website_hp) {
      setSubmitSuccess(true);
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

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
        website_hp: formData.website_hp,
      });

      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to transmit message. Please email directly to mahmad9@jmi.ac.in'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Contact Coordinates &amp; Campus Location — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Academic office coordinates, official email, telephone, and verified scholarly directories for Dr. Musheer Ahmad at Jamia Millia Islamia, New Delhi."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Institutional Coordinates &amp; Reach</span>
            <h1 className="section-header__title">Contact Coordinates</h1>
            <p className="section-header__desc">
              Academic office location, official correspondence channels, and verified scholarly profiles
              for Dr. Musheer Ahmad at the Department of Computer Engineering, Jamia Millia Islamia.
            </p>
          </header>

          {/* 3-Column Unboxed Contact Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3.5rem',
              paddingBottom: '3.5rem',
              marginBottom: '4.5rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            {/* Column 1: Academic Location */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <Building2 size={16} strokeWidth={2} color="var(--accent-sage-dark)" />
                <span className="section-eyebrow" style={{ margin: 0 }}>Academic Department</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Department of Computer Engineering
              </h2>
              <address
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontStyle: 'normal',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                Faculty of Engineering and Technology<br />
                Jamia Millia Islamia (A Central University)<br />
                Jamia Nagar, New Delhi &ndash; 110025, India
              </address>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <MapPin size={14} color="var(--accent-sage-dark)" />
                  <span className="section-eyebrow" style={{ margin: 0 }}>Administrative Office</span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0', lineHeight: 1.5 }}>
                  Assistant Controller of Examinations<br />
                  Office of the Controller of Examinations<br />
                  Jamia Millia Islamia, New Delhi
                </p>
              </div>
            </div>

            {/* Column 2: Electronic Mail & Phone */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <Mail size={16} strokeWidth={2} color="var(--accent-sage-dark)" />
                <span className="section-eyebrow" style={{ margin: 0 }}>Direct Correspondence</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Electronic Mail &amp; Telephone
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Official Institutional Email
                </div>
                <a
                  href={`mailto:${settings?.email_primary || 'mahmad9@jmi.ac.in'}`}
                  className="text-link"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', fontWeight: 500 }}
                >
                  {settings?.email_primary || 'mahmad9@jmi.ac.in'}
                </a>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  For university business, prospective student inquiries, and official academic correspondence.
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Alternative / Editorial Email
                </div>
                <a
                  href={`mailto:${settings?.email_secondary || 'musheer.cse@gmail.com'}`}
                  className="text-link"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem' }}
                >
                  {settings?.email_secondary || 'musheer.cse@gmail.com'}
                </a>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  For journal editorial roles, conference keynotes, and international research collaborations.
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                  <Phone size={13} color="var(--accent-sage-dark)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Office Telephone
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {settings?.office_phone || '+91 11 2698 0281'}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Department EPABX Extension: 3148
                </div>
              </div>
            </div>

            {/* Column 3: Transit & Visiting Guidelines */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <Compass size={16} strokeWidth={2} color="var(--accent-sage-dark)" />
                <span className="section-eyebrow" style={{ margin: 0 }}>Campus Transit</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Transit &amp; Visiting
              </h2>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                The Faculty of Engineering &amp; Technology is located on the main university campus in Jamia Nagar, South Delhi.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontFamily: 'var(--font-sans)', fontSize: '0.90625rem', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Delhi Metro: </strong>
                  Jamia Millia Islamia Station (Magenta Line), Gate No. 2 exit.
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Campus Entry: </strong>
                  Gate No. 7, approximately 300 meters walking distance from the metro station.
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Meeting Protocol: </strong>
                  Prior appointment by email with at least 48 hours notice is required for in-person consultations.
                </div>
              </div>
            </div>
          </div>

          {/* Direct Academic Inquiry & Correspondence Form (Enclosed in a Box) */}
          <div style={{ marginBottom: '4.5rem' }}>
            <div className="contact-form-box" style={{ maxWidth: '820px' }}>
              <span className="section-eyebrow">Direct Message Dispatch</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--text-primary)',
                  margin: '0.35rem 0 0.85rem 0',
                  fontWeight: 500,
                }}
              >
                Send an Academic Inquiry or Message
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                For research collaboration proposals, keynote/speaker invitations, or doctoral supervision queries, submit your message through this dispatch box or write directly to{' '}
                <a href={`mailto:${settings?.email_primary || 'mahmad9@jmi.ac.in'}`} className="text-link">
                  {settings?.email_primary || 'mahmad9@jmi.ac.in'}
                </a>.
              </p>

              {submitSuccess ? (
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'var(--accent-matcha-tint)',
                    border: '1px solid var(--accent-sage)',
                    borderRadius: 'var(--radius-subtle)',
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--accent-sage-dark)', margin: '0 0 0.4rem 0' }}>
                    Message Transmitted
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Thank you. Your message has been received and routed to Dr. Musheer Ahmad&apos;s academic correspondence queue. You will receive an acknowledgment at your email address.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ name: '', email: '', affiliation: '', subject: '', message: '', website_hp: '' });
                    }}
                    className="btn-secondary"
                    style={{ marginTop: '1rem' }}
                  >
                    Send Another Message &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        border: '1px solid rgba(15, 23, 42, 0.3)',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(15, 23, 42, 0.05)',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot field (hidden from legitimate users, traps automated spam) */}
                  <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      id="website_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Sarah Jenkins"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.jenkins@university.edu"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label htmlFor="affiliation" className="form-label">
                        Institution / Affiliation
                      </label>
                      <input
                        id="affiliation"
                        type="text"
                        value={formData.affiliation}
                        onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                        placeholder="e.g. University / Research Lab"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="form-label">
                        Subject / Topic *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Joint Research Inquiry / S-Box Cryptanalysis"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label htmlFor="message" className="form-label">
                      Message Content *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the nature of your correspondence, proposed collaboration, or academic query..."
                      style={{ lineHeight: 1.55 }}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ padding: '0.85rem 2.25rem' }}
                    >
                      {isSubmitting ? 'Transmitting...' : <>Send Message &rarr;</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Verified Scholarly Profiles Strip (Pure Typographic Index) */}
          <div>
            <span className="section-eyebrow">Scholarly Directories &amp; Bibliographic Indices</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                color: 'var(--text-primary)',
                margin: '0.35rem 0 1.5rem 0',
                fontWeight: 500,
              }}
            >
              Verified External Research Profiles
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '720px',
              }}
            >
              All researcher identifiers below are verified against Dr. Musheer Ahmad&apos;s Curriculum Vitae (June 2025)
              and official university records.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem 3rem',
              }}
            >
              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <GoogleScholarLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    GOOGLE SCHOLAR
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.google_scholar_url || 'https://scholar.google.com/citations?user=cPbmjWoAAAAJ'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    User: cPbmjWoAAAAJ &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  5,296 citations (Google Scholar) &bull; 3,878 citations (Scopus) &bull; h-index 42 (Google Scholar), 36 (Scopus)
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <ScopusLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    SCOPUS AUTHOR ID
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.scopus_url || 'https://www.scopus.com/authid/detail.uri?authorId=56339090200'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    ID: 56339090200 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  151 indexed documents &bull; h-index 36
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <WebOfScienceLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    WEB OF SCIENCE RESEARCHERID
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.web_of_science_url || 'https://www.webofscience.com/wos/author/record/H-9587-2018'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    ID: H-9587-2018 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  124 indexed articles &bull; 87 SCIE
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <DblpLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    DBLP BIBLIOGRAPHY
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.dblp_url || 'https://dblp.org/pid/89/8467-2.html'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    PID: 89/8467-2 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Computer Science Bibliography
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <ResearchGateLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    RESEARCHGATE
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.researchgate_url || 'https://www.researchgate.net/profile/Musheer-Ahmad-3'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    Profile: Musheer-Ahmad-3 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Full-text preprint exchange &amp; stats
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <UniversityLogo size={16} color="#75A06A" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                    JAMIA MILLIA ISLAMIA
                  </span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.jmi_profile_url || 'https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Engineering/People/Faculty-Members/3148/Musheer_Ahmad'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    Official Faculty Page &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Faculty Member ID: 3148
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
