import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';

export const CVPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Curriculum Vitae — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Official curriculum vitae of Dr. Musheer Ahmad, Associate Professor in Computer Engineering at Jamia Millia Islamia. Academic appointments, education, metrics, honors, and service."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <span className="section-eyebrow">Curriculum Vitae</span>
                <h1 className="section-header__title">Dr. Musheer Ahmad</h1>
                <p className="section-header__desc">
                  Associate Professor, Department of Computer Engineering, Faculty of Engineering and Technology,
                  Jamia Millia Islamia, New Delhi - 110025, India.
                </p>
              </div>

              <div>
                <Button variant="primary" href="/mahmad9.pdf" external>
                  Download Complete CV (PDF) &darr;
                </Button>
              </div>
            </div>
          </header>

          {/* Quick Contact & Verification Coordinates */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              paddingBottom: '2rem',
              marginBottom: '3rem',
              borderBottom: '1px solid var(--border-hairline)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div>Official Email: <strong style={{ color: 'var(--text-primary)' }}>mahmad9@jmi.ac.in</strong></div>
            <div>Personal Email: <strong style={{ color: 'var(--text-primary)' }}>musheer.cse@gmail.com</strong></div>
            <div>Office Phone: <strong style={{ color: 'var(--text-primary)' }}>+91 11 2698 0281</strong></div>
            <div>Last Updated: <strong style={{ color: 'var(--text-primary)' }}>June 2025</strong></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '85ch' }}>
            {/* 1. Academic Qualifications */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Academic Qualifications
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Ph.D. in Computer Engineering</strong><br />
                  Jamia Millia Islamia, New Delhi, India.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>M.Tech. in Computer Science &amp; Engineering (2008)</strong><br />
                  Z.H. College of Engineering &amp; Technology, Aligarh Muslim University (AMU), Aligarh, India.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>B.Tech. in Computer Engineering (2004)</strong><br />
                  Z.H. College of Engineering &amp; Technology, Aligarh Muslim University (AMU), Aligarh, India.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Senior Secondary Certificate (XII, 1999) &amp; High School (X, 1997)</strong><br />
                  Senior Secondary School (Boys) &amp; S.T.S. High School (Minto Circle), AMU Aligarh (Sixth Position in Class X Examination).
                </li>
              </ul>
            </section>

            {/* 2. Teaching & Academic Appointments */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Academic Appointments (18 Years Total Teaching Experience)
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Associate Professor</strong> — Department of Computer Engineering, Faculty of Engineering &amp; Technology, Jamia Millia Islamia, New Delhi.<br />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>M.Tech Project Coordinator (since 2019) • CBCS Programme Advisor (since 2015) • NAAC Nodal Faculty</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Lecturer on Temporary Basis / Guest Faculty (2006–2010)</strong><br />
                  Department of Computer Engineering, Z.H. College of Engineering &amp; Technology, Aligarh Muslim University, Aligarh.
                </li>
              </ul>
            </section>

            {/* 3. Bibliometric Summary */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Bibliometric Summary (as of June 2025)
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                <div>Total Research Papers: <strong style={{ color: 'var(--text-primary)' }}>157</strong></div>
                <div>SCOPUS Indexed Papers: <strong style={{ color: 'var(--text-primary)' }}>151</strong></div>
                <div>Web of Science Papers: <strong style={{ color: 'var(--text-primary)' }}>124</strong></div>
                <div>SCIE Indexed Papers: <strong style={{ color: 'var(--text-primary)' }}>87</strong></div>
                <div>Google Scholar Citations: <strong style={{ color: 'var(--text-primary)' }}>5,296</strong></div>
                <div>SCOPUS Citations: <strong style={{ color: 'var(--text-primary)' }}>3,878</strong></div>
                <div>Google Scholar h-index: <strong style={{ color: 'var(--text-primary)' }}>42</strong></div>
                <div>SCOPUS h-index: <strong style={{ color: 'var(--text-primary)' }}>36</strong></div>
                <div>Cumulative Impact Factor: <strong style={{ color: 'var(--text-primary)' }}>~ 300</strong></div>
              </div>
            </section>

            {/* 4. Awards & International Recognitions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Awards &amp; Scientific Recognitions
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <li>
                  <strong>Editorial Contribution Award 2025</strong> — Awarded by Springer Nature for effectively handling manuscripts as Editorial Board member of <em>Scientific Reports</em>.
                </li>
                <li>
                  <strong>FET Research Publication Award 2024</strong> — Conferred by Honorable Vice Chancellor of JMI Prof. Mazhar Asif, Registrar Prof. Md. Mehtab Alam Rizvi, and Dean Prof. Mini Shaji Thomas on 5th November, 2024.
                </li>
                <li>
                  <strong>World&apos;s Top 2% Researchers (Career-Long Category, 2024)</strong> — Stanford University, USA and Elsevier B.V.
                </li>
                <li>
                  <strong>World&apos;s Top 2% Researchers (Single-Year Category: 2024, 2023, 2022)</strong> — Consecutively recognized three times by Stanford University &amp; Elsevier B.V.
                </li>
                <li>
                  <strong>Jamia Achievers Award 2023</strong> — Conferred by Honorable Vice Chancellor of JMI Prof. Najma Akhtar, Ms. Sharmila Tagore, and Dr. Shiv Kumar Sarin on 29th October, 2023.
                </li>
                <li>
                  <strong>Dean&apos;s Official Appreciation 2022</strong> — Conferred by Dean of FET-JMI Prof. Mini Shaji Thomas for global ranking achievements.
                </li>
              </ul>
            </section>

            {/* 5. Editorial Leadership & Book Volumes */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Editorial Leadership &amp; Books Edited
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <li><strong>Editorial Board Member</strong>, <em>Scientific Reports</em>, Nature, Springer Nature [SCIE-indexed]</li>
                <li><strong>Editorial Board Member</strong>, <em>Discover Computing</em>, Springer [SCIE-indexed]</li>
                <li><strong>Associate Editor</strong>, <em>International Journal of Information Security and Privacy (IJISP)</em>, IGI Global [ESCI/SCOPUS]</li>
                <li><strong>Associate Editor</strong>, <em>International Journal of Artificial Intelligence in Scientific Disciplines (IJAISD)</em>, IGI Global</li>
                <li><strong>Lead Guest Editor</strong>, Collection on "Post-quantum cybersecurity and cryptography" in <em>Scientific Reports</em>, Springer Nature (Open till Feb 2026)</li>
                <li><strong>Guest Editor</strong>, Special Issue on "Securing Critical Infrastructure in Next-Generation Networks", <em>Discover Computing</em>, Springer (Open till Sept 2025)</li>
                <li><strong>Book Editor</strong>, <em>AI Based Cybersecurity Management: Securing Digital Economy</em>, CRC Press, Taylor &amp; Francis (under production)</li>
              </ul>
            </section>

            {/* 6. Professional Memberships */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-hairline)' }}>
                Professional Society Memberships
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <li>Senior Member, Institute of Electrical and Electronics Engineers (IEEE)</li>
                <li>Life Member, Computer Society of India (CSI)</li>
                <li>Member, Society of Digital Information and Wireless Communication (SDIWC), USA</li>
                <li>Member, International Association of Computer Science and Information Technology (IACSIT), Singapore</li>
                <li>Member, Institute of Doctors, Engineers and Scientists (IDES), India</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
