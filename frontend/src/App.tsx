import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHomePagePayload } from './lib/api';
import { ThemeProvider } from './lib/theme';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ResearchPage } from './pages/ResearchPage';
import { TeachingPage } from './pages/TeachingPage';
import { ServicePage } from './pages/ServicePage';
import { CVPage } from './pages/CVPage';
import { GroupPage } from './pages/GroupPage';
import { NewsPage } from './pages/NewsPage';
import { JoinPage } from './pages/JoinPage';
import { ContactPage } from './pages/ContactPage';
import { StyleguidePage } from './pages/StyleguidePage';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['homePayload'],
    queryFn: fetchHomePagePayload,
  });

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#publications') {
      navigate('/publications', { replace: true });
    }
  }, [location.pathname, location.hash, navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          background: 'var(--bg-primary)',
        }}
      >
        <span>Loading academic portfolio...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-sans)',
          background: 'var(--bg-primary)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}
        >
          Unable to Connect to Research CMS
        </h1>
        <p
          style={{
            maxWidth: '520px',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
          }}
        >
          {error instanceof Error ? error.message : 'The API service could not be reached.'}
          <br />
          Please ensure the Django backend server is running and reachable.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="btn-primary"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Layout settings={data.settings}>
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/research" element={<HomePage data={data} />} />
          <Route path="/research/:slug" element={<HomePage data={data} />} />
          <Route
            path="/publications"
            element={<PublicationsPage settings={data.settings} />}
          />
          <Route path="/teaching" element={<HomePage data={data} />} />
          <Route path="/service" element={<HomePage data={data} />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/join" element={<HomePage data={data} />} />
          <Route path="/contact" element={<HomePage data={data} />} />
          <Route path="/styleguide" element={<StyleguidePage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
