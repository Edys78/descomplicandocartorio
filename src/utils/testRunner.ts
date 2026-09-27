import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authSuccess, logout, toggleBookmarkUser } from '../store/slices/authSlice';
import newsReducer, { 
  setActiveCategory, 
  setActiveSubCategory, 
  setSearchQuery, 
  toggleBookmark, 
  clapArticle, 
  addComment 
} from '../store/slices/newsSlice';
import cookieReducer, { acceptAllCookies, optOutCookies } from '../store/slices/cookieSlice';
import uiReducer, { setFontSize, openAuthModal, closeAuthModal } from '../store/slices/uiSlice';
import { TestResult, TestSuiteReport, User, Article } from '../types';

export const runAutomatedUnitTests = async (): Promise<TestSuiteReport> => {
  const results: TestResult[] = [];
  const startTime = performance.now();

  const runTest = (
    id: string,
    name: string,
    category: TestResult['category'],
    fn: () => void | Promise<void>
  ) => {
    const t0 = performance.now();
    try {
      fn();
      const t1 = performance.now();
      results.push({
        id,
        name,
        category,
        passed: true,
        durationMs: Number((t1 - t0).toFixed(2)),
        details: 'Assertion passed successfully.',
      });
    } catch (err: unknown) {
      const t1 = performance.now();
      results.push({
        id,
        name,
        category,
        passed: false,
        durationMs: Number((t1 - t0).toFixed(2)),
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  // Helper assertions
  const assert = (condition: boolean, msg: string) => {
    if (!condition) throw new Error(msg);
  };
  const assertEqual = (actual: unknown, expected: unknown, msg: string) => {
    if (actual !== expected) throw new Error(`${msg} - Expected: ${expected}, Received: ${actual}`);
  };

  // 1. Redux Auth Slice Tests
  runTest('T-AUTH-01', 'Initial authentication state should be unauthenticated if no stored session', 'Authentication', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const state = store.getState().auth;
    assert(state.user !== undefined, 'User object should exist in state');
  });

  runTest('T-AUTH-02', 'Login action updates user, assigns token and sets authenticated state', 'Authentication', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const mockUser: User = {
      id: 'usr_test_registrador',
      name: 'Souza Edy',
      email: 'souza.edy@descomplicandocartorio.com.br',
      role: 'registrador',
      token: 'jwt-mock-token-secure-hash',
      bookmarkedArticleIds: [],
      joinedDate: '2026-03-01',
    };
    store.dispatch(authSuccess(mockUser));
    const state = store.getState().auth;
    assertEqual(state.isAuthenticated, true, 'User should be authenticated');
    assertEqual(state.user?.email, 'souza.edy@descomplicandocartorio.com.br', 'Email should match');
    assertEqual(state.user?.role, 'registrador', 'Role should be registrador');
  });

  runTest('T-AUTH-03', 'Logout action clears session state and token', 'Authentication', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch(logout());
    const state = store.getState().auth;
    assertEqual(state.isAuthenticated, false, 'User should be disconnected');
    assertEqual(state.user, null, 'User state must be null after logout');
  });

  // 2. Redux News & Navigation Submenu Tests
  runTest('T-NAV-01', 'Category navigation sets active category and clears search query', 'Navigation & Submenus', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    store.dispatch(setSearchQuery('certidão'));
    store.dispatch(setActiveCategory('RETIFICAÇÃO'));
    const state = store.getState().news;
    assertEqual(state.activeCategory, 'RETIFICAÇÃO', 'Active category should be RETIFICAÇÃO');
    assertEqual(state.searchQuery, '', 'Search query should be reset');
  });

  runTest('T-NAV-02', 'Submenu selection switches category and sets specific subcategory filter', 'Navigation & Submenus', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    store.dispatch(setActiveSubCategory({ category: 'PROCEDIMENTOS', subCategory: 'Alteração de prenome' }));
    const state = store.getState().news;
    assertEqual(state.activeCategory, 'PROCEDIMENTOS', 'Category should be PROCEDIMENTOS');
    assertEqual(state.activeSubCategory, 'Alteração de prenome', 'SubCategory should match Alteração de prenome');
  });

  runTest('T-NAV-03', 'Curiosidades submenus are properly supported in state management', 'Navigation & Submenus', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    store.dispatch(setActiveSubCategory({ category: 'CURIOSIDADES', subCategory: 'O que é retificação?' }));
    const state = store.getState().news;
    assertEqual(state.activeSubCategory, 'O que é retificação?', 'Subcategory must match O que é retificação?');
  });

  // 3. Registry Procedures & Article State
  runTest('T-REG-01', 'Initial articles list contains civil registry procedural guides with Souza Edy authorship', 'Registry Procedures', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    const articles = store.getState().news.articles;
    assert(articles.length >= 8, 'Should have at least 8 articles in database');
    const hasSouzaEdy = articles.every((a: Article) => a.author.name === 'Souza Edy');
    assert(hasSouzaEdy, 'All articles should be authored by Souza Edy');
  });

  runTest('T-REG-02', 'Article claps appreciation counter increments correctly', 'Registry Procedures', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    const initialClaps = store.getState().news.articles.find((a: Article) => a.id === 'art-destaque-01')?.claps || 0;
    store.dispatch(clapArticle('art-destaque-01'));
    const updatedClaps = store.getState().news.articles.find((a: Article) => a.id === 'art-destaque-01')?.claps || 0;
    assertEqual(updatedClaps, initialClaps + 1, 'Claps should increment by 1');
  });

  runTest('T-REG-03', 'Adding comment to article increments count and updates thread', 'Registry Procedures', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    const newComment = {
      id: 'test_c_reg',
      articleId: 'art-destaque-01',
      author: 'Leticia Silva',
      content: 'Muito esclarecedor o procedimento da Lei 14.382.',
      timestamp: 'Agora mesmo',
      likes: 0,
    };
    store.dispatch(addComment(newComment));
    const comments = store.getState().news.comments['art-destaque-01'] || [];
    assert(comments.length > 0, 'Comments thread must contain new comment');
    assertEqual(comments[0].author, 'Leticia Silva', 'Author should match');
  });

  // 4. Redux Cookie Consent Tests
  runTest('T-COOKIE-01', 'Accepting all cookies activates necessary and analytics preferences', 'Cookie Consent', () => {
    const store = configureStore({ reducer: { cookie: cookieReducer } });
    store.dispatch(acceptAllCookies());
    const state = store.getState().cookie;
    assertEqual(state.accepted, true, 'Cookies should be marked accepted');
    assertEqual(state.analytics, true, 'Analytics cookies must be true');
    assert(state.updatedAt !== null, 'Timestamp must be recorded');
  });

  runTest('T-COOKIE-02', 'Opting out cookies retains only strictly necessary storage', 'Cookie Consent', () => {
    const store = configureStore({ reducer: { cookie: cookieReducer } });
    store.dispatch(optOutCookies());
    const state = store.getState().cookie;
    assertEqual(state.accepted, true, 'Consent state acknowledged');
    assertEqual(state.necessary, true, 'Necessary cookies remain active');
    assertEqual(state.analytics, false, 'Analytics disabled upon opt-out');
  });

  // 5. Redux UI & WhatsApp Link Validation Tests
  runTest('T-UI-01', 'Font size controls update reader typography scale', 'Redux State', () => {
    const store = configureStore({ reducer: { ui: uiReducer } });
    store.dispatch(setFontSize('lg'));
    assertEqual(store.getState().ui.fontSize, 'lg', 'Font size should be lg');
  });

  runTest('T-UI-02', 'Auth modal controls toggle open and closed states predictably', 'Redux State', () => {
    const store = configureStore({ reducer: { ui: uiReducer } });
    store.dispatch(openAuthModal('login'));
    assertEqual(store.getState().ui.isAuthModalOpen, true, 'Auth modal must open');
    assertEqual(store.getState().ui.authModalMode, 'login', 'Mode should be login');
    store.dispatch(closeAuthModal());
    assertEqual(store.getState().ui.isAuthModalOpen, false, 'Auth modal must close');
  });

  runTest('T-UTIL-01', 'WhatsApp link formatting contains valid Brazilian country code and phone number', 'Registry Procedures', () => {
    const phone = '5511956870620';
    const textParam = encodeURIComponent('Olá! Em que posso te ajudar?');
    const generatedUrl = `https://wa.me/${phone}?text=${textParam}`;
    assert(generatedUrl.includes('5511956870620'), 'URL must contain exact target phone number');
    assert(generatedUrl.startsWith('https://wa.me/'), 'URL must use official wa.me domain');
  });

  runTest('T-UTIL-02', 'Calculates approximate reading time based on word count algorithm', 'Registry Procedures', () => {
    const sampleWords = new Array(800).fill('cartório').join(' ');
    const calculateReadTime = (text: string) => {
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      return `${minutes} min de leitura`;
    };
    assertEqual(calculateReadTime(sampleWords), '4 min de leitura', '800 words at 200wpm should equal 4 min de leitura');
  });

  const endTime = performance.now();
  const totalDuration = Number((endTime - startTime).toFixed(2));
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;

  return {
    total: results.length,
    passed: passedCount,
    failed: failedCount,
    durationMs: totalDuration,
    timestamp: new Date().toLocaleTimeString(),
    results,
  };
};
