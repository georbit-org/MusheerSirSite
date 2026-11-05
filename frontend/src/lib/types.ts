export interface SiteSettings {
  professor_name: string;
  title: string;
  secondary_roles?: string;
  department: string;
  university: string;
  location: string;
  office_room?: string;
  office_phone?: string;
  email_primary: string;
  email_secondary?: string;
  portrait?: string | null;
  portrait_alt?: string;
  cv_file?: string | null;
  cv_url?: string;
  total_papers?: number;
  scopus_papers?: number;
  wos_papers?: number;
  scie_papers?: number;
  citations_count: number;
  citations_scopus?: number;
  citations_source_url: string;
  citations_as_of: string;
  h_index: number;
  h_index_scopus?: number;
  h_index_source_url: string;
  h_index_as_of: string;
  i10_index?: number;
  i10_index_source_url?: string;
  i10_index_as_of?: string;
  cumulative_impact_factor?: string;
  teaching_experience_years?: number;
  stanford_top_2_percent: boolean;
  google_scholar_url: string;
  scopus_url?: string;
  researchgate_url?: string;
  orcid_url?: string;
  dblp_url?: string;
  wos_url?: string;
  web_of_science_url?: string;
  csauthors_url?: string;
  top_researchers_url?: string;
  jmi_profile_url?: string;
  github_url?: string;
  linkedin_url?: string;
  is_accepting_students: boolean;
  student_callout_heading: string;
  student_callout_text: string;
  announcement_banner_active?: boolean;
  announcement_banner_text?: string;
  announcement_banner_link?: string;
  footer_text?: string;
  updated_at: string;
}

export interface NavigationItem {
  id: number;
  title: string;
  path: string;
  order: number;
}

export interface HomePageContent {
  hero_statement: string;
  intro_body: string;
  figure_caption: string;
  callout_heading: string;
  callout_text: string;
  seo_title: string;
  seo_description: string;
}

export interface ResearchTheme {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body: string;
  paper_count?: number;
  order: number;
}

export interface Publication {
  id: number;
  title: string;
  slug: string;
  authors: string;
  venue: string;
  year: number;
  volume_issue_pages?: string;
  publication_type: string;
  doi?: string;
  pdf_url?: string;
  code_url?: string;
  abstract?: string;
  bibtex?: string;
  is_selected: boolean;
  citation_count: number;
  impact_factor_as_listed?: string;
  index_tags?: string;
  raw_reference?: string;
  theme?: number | null;
  theme_name?: string;
  order: number;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  body?: string;
  link?: string;
  is_pinned: boolean;
}

export interface Honor {
  id: number;
  title: string;
  issuing_organization?: string;
  awarding_body?: string;
  year: string | number;
  date_details?: string;
  citation?: string;
  description?: string;
  is_featured?: boolean;
  order: number;
}

export interface EditorialRole {
  id: number;
  journal_name: string;
  role_type?: string;
  role_type_display?: string;
  role_title?: string;
  publisher?: string;
  indexing?: string;
  special_issue_title?: string;
  submission_deadline?: string;
  years_active?: string;
  order: number;
}

export interface ServiceItem {
  id: number;
  category: string;
  category_display?: string;
  title: string;
  details?: string;
  year?: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  role_display?: string;
  research_topic?: string;
  affiliation_or_placement?: string;
  start_year: number;
  end_year?: number | null;
  profile_photo?: string | null;
  photo_alt?: string;
  scholar_url?: string;
  linkedin_url?: string;
  order: number;
}

export interface ResearchOpening {
  id: number;
  position_type: string;
  title: string;
  funding_info?: string;
  deadline?: string;
  description: string;
  is_active: boolean;
  order: number;
}

export interface ApplicationSubmission {
  full_name: string;
  email: string;
  phone?: string;
  current_institution: string;
  degree_and_gpa: string;
  position_applied_for: string;
  research_statement: string;
  paper_reference: string;
  cv_url_or_link?: string;
  website_hp?: string;
}

export interface HomePagePayload {
  settings: SiteSettings;
  navigation: NavigationItem[];
  home: HomePageContent;
  research_themes: ResearchTheme[];
  selected_publications: Publication[];
  honors: Honor[];
  editorial_roles: EditorialRole[];
  latest_news: NewsItem[];
}

