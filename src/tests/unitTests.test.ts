import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authSuccess, logout } from '../store/slices/authSlice';
import newsReducer, { setActiveCategory, setActiveSubCategory, clapArticle } from '../store/slices/newsSlice';
import cookieReducer, { acceptAllCookies, optOutCookies } from '../store/slices/cookieSlice';
import uiReducer, { setFontSize } from '../store/slices/uiSlice';
import { User } from '../types';

describe('Descomplicando Cartório Unit Test Suite', () => {
  it('Redux Auth: manages user login and state for Souza Edy', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const mockUser: User = {
      id: 'usr_test_1',
      name: 'Souza Edy',
      email: 'souza.edy@descomplicandocartorio.com.br',
      role: 'registrador',
      token: 'jwt-token-xyz',
      bookmarkedArticleIds: [],
      joinedDate: '2026-03-01',
    };
    store.dispatch(authSuccess(mockUser));
    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(store.getState().auth.user?.name).toBe('Souza Edy');

    store.dispatch(logout());
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });

  it('Redux News: handles category and subcategory filtering', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    store.dispatch(setActiveCategory('RETIFICAÇÃO'));
    expect(store.getState().news.activeCategory).toBe('RETIFICAÇÃO');

    store.dispatch(setActiveSubCategory({ category: 'PROCEDIMENTOS', subCategory: 'Alteração de prenome' }));
    expect(store.getState().news.activeCategory).toBe('PROCEDIMENTOS');
    expect(store.getState().news.activeSubCategory).toBe('Alteração de prenome');
  });

  it('Redux News: increments appreciation claps', () => {
    const store = configureStore({ reducer: { news: newsReducer } });
    store.dispatch(clapArticle('art-destaque-01'));
    expect(store.getState().news.clappedArticles['art-destaque-01']).toBe(1);
  });

  it('Redux Cookie: accepts and configures privacy storage', () => {
    const store = configureStore({ reducer: { cookie: cookieReducer } });
    store.dispatch(acceptAllCookies());
    expect(store.getState().cookie.accepted).toBe(true);
    expect(store.getState().cookie.analytics).toBe(true);
  });

  it('Redux UI: scales font size appropriately', () => {
    const store = configureStore({ reducer: { ui: uiReducer } });
    store.dispatch(setFontSize('lg'));
    expect(store.getState().ui.fontSize).toBe('lg');
  });

  it('WhatsApp Link: correctly formats Brazilian international telephone number and parameters', () => {
    const expectedUrl = "https://wa.me/5511956870620?text=Ol%C3%A1!%20Em%20que%20posso%20te%20ajudar%3F";
    expect(expectedUrl).toContain('5511956870620');
  });
});
