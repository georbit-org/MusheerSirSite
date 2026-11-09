import {
  HomePagePayload,
  Publication,
  ResearchTheme,
  NewsItem,
  ServiceItem,
  TeamMember,
  ResearchOpening,
  ApplicationSubmission,
} from './types';

// Support Vite import.meta.env safely across TS configs
const meta = import.meta as unknown as { env?: { VITE_API_URL?: string; PROD?: boolean } };

// Vite replaces this value at build time. Keep the production fallback pointed at
// the Render API so a missing static-site build variable never hits the SPA host.
export const API_BASE = (() => {
  if (meta && meta.env && meta.env.VITE_API_URL) {
    return meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (meta?.env?.PROD) {
    return 'https://musheer-academic-api.onrender.com/api/v1';
  }
  return '/api/v1';
})();

/**
 * Resolves media paths (e.g. portraits, CV PDFs).
 * Handles relative paths via Vite proxy or absolute URLs via backend tunnel.
 */
export function getMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  if (API_BASE.startsWith('http')) {
    try {
      const origin = new URL(API_BASE).origin;
      return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
    } catch {
      // fallback
    }
  }

  return path.startsWith('/') ? path : `/${path}`;
}

/** Resolve the CV upload, falling back to the bundled copy when the seeded media file is absent. */
export function getCvUrl(cvFile?: string | null, cvUrl?: string | null): string {
  if (cvFile) {
    const normalizedPath = cvFile.replace(/\\/g, '/').split('?')[0].toLowerCase();
    if (/(?:^|\/)(?:media\/)?cv\/mahmad9\.pdf$/.test(normalizedPath)) {
      return '/mahmad9.pdf';
    }
    return getMediaUrl(cvFile);
  }

  if (cvUrl && !cvUrl.toLowerCase().endsWith('/upload/employeeresume/mahmad9.pdf')) {
    return cvUrl;
  }

  return '/mahmad9.pdf';
}

export async function fetchHomePagePayload(): Promise<HomePagePayload> {
  const res = await fetch(`${API_BASE}/home/`);
  if (!res.ok) {
    throw new Error(`Failed to load home payload from CMS (HTTP ${res.status})`);
  }
  return res.json();
}

export async function fetchPublications(): Promise<Publication[]> {
  const res = await fetch(`${API_BASE}/publications/`);
  if (!res.ok) {
    throw new Error(`Failed to load publications from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchResearchThemes(): Promise<ResearchTheme[]> {
  const res = await fetch(`${API_BASE}/themes/`);
  if (!res.ok) {
    throw new Error(`Failed to load themes from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const res = await fetch(`${API_BASE}/news/`);
  if (!res.ok) {
    throw new Error(`Failed to load news from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchServiceItems(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/service/`);
  if (!res.ok) {
    throw new Error(`Failed to load service items from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchTeamMembers(): Promise<import('./types').TeamMember[]> {
  const res = await fetch(`${API_BASE}/team/`);
  if (!res.ok) {
    throw new Error(`Failed to load team members from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchResearchOpenings(): Promise<import('./types').ResearchOpening[]> {
  const res = await fetch(`${API_BASE}/openings/`);
  if (!res.ok) {
    throw new Error(`Failed to load research openings from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function submitProspectiveApplication(
  payload: import('./types').ApplicationSubmission
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${API_BASE}/apply/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        (errorData && Object.values(errorData).flat().join(' ')) ||
        `Application submission failed (HTTP ${res.status})`
    );
  }
  return { success: true };
}
