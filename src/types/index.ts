export type MainNavCategory = 
  | 'HOME'
  | 'CURIOSIDADES'
  | 'RETIFICAÇÃO'
  | 'PROCEDIMENTOS'
  | 'CONTATO';

export type SubMenuOption =
  // Curiosidades
  | 'O que é retificação?'
  | 'O que precisa para retificar?'
  | 'E quem pode?'
  // Retificação
  | 'Nascimento'
  | 'Casamento'
  | 'Óbito'
  // Procedimentos
  | 'Alteração de Patronímico'
  | 'Alteração de nome e gênero'
  | 'Alteração de prenome';

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: MainNavCategory;
  subCategory: SubMenuOption;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
  isDailyFeed?: boolean;
  isTickerHighlight?: boolean;
  claps: number;
  commentsCount: number;
  legalBasis?: string; // e.g. "Lei 6.015/73", "Lei 14.382/2022", "Provimento 73/2018 CNJ"
  practicalTips?: string[];
  requiredDocs?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'reader' | 'subscriber' | 'consultor' | 'registrador';
  token: string;
  avatarUrl?: string;
  bookmarkedArticleIds: string[];
  joinedDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NewsState {
  articles: Article[];
  selectedArticleId: string | null;
  activeCategory: MainNavCategory;
  activeSubCategory: SubMenuOption | null;
  searchQuery: string;
  bookmarks: string[];
  comments: Record<string, Comment[]>;
  clappedArticles: Record<string, number>;
}

export interface CookiePreferences {
  accepted: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string | null;
}

export interface UIState {
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isSearchModalOpen: boolean;
  isArticleModalOpen: boolean;
  isTestRunnerOpen: boolean;
  isMobileMenuOpen: boolean;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  activeDropdown: MainNavCategory | null;
}

export interface TestResult {
  id: string;
  name: string;
  category: 'Redux State' | 'Authentication' | 'Registry Procedures' | 'Cookie Consent' | 'Navigation & Submenus';
  passed: boolean;
  durationMs: number;
  details?: string;
  error?: string;
}

export interface TestSuiteReport {
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
  timestamp: string;
  results: TestResult[];
}
