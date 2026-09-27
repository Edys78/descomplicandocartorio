import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookiePreferences } from '../../types';

const COOKIE_STORAGE_KEY = 'daily_chronicle_cookie_consent';

const loadCookieConsent = (): CookiePreferences => {
  try {
    const data = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return {
    accepted: false,
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: null,
  };
};

const initialState: CookiePreferences = loadCookieConsent();

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    acceptAllCookies: (state) => {
      state.accepted = true;
      state.necessary = true;
      state.analytics = true;
      state.marketing = true;
      state.updatedAt = new Date().toISOString();
      try {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    },
    optOutCookies: (state) => {
      state.accepted = true;
      state.necessary = true;
      state.analytics = false;
      state.marketing = false;
      state.updatedAt = new Date().toISOString();
      try {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    },
    setCookiePreferences: (state, action: PayloadAction<Partial<CookiePreferences>>) => {
      Object.assign(state, action.payload);
      state.accepted = true;
      state.updatedAt = new Date().toISOString();
      try {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    },
    resetCookieConsent: (state) => {
      state.accepted = false;
      state.necessary = true;
      state.analytics = false;
      state.marketing = false;
      state.updatedAt = null;
      try {
        localStorage.removeItem(COOKIE_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  },
});

export const {
  acceptAllCookies,
  optOutCookies,
  setCookiePreferences,
  resetCookieConsent,
} = cookieSlice.actions;

export default cookieSlice.reducer;
