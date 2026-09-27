import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const STORAGE_KEY = 'daily_chronicle_user_session';

const loadUserFromStorage = (): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return null;
};

const initialUser = loadUserFromStorage();

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuthAction: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch {
        // ignore
      }
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    },
    toggleBookmarkUser: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      const articleId = action.payload;
      const bookmarks = state.user.bookmarkedArticleIds || [];
      if (bookmarks.includes(articleId)) {
        state.user.bookmarkedArticleIds = bookmarks.filter((id) => id !== articleId);
      } else {
        state.user.bookmarkedArticleIds = [...bookmarks, articleId];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
      } catch {
        // ignore
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
        } catch {
          // ignore
        }
      }
    }
  },
});

export const {
  startAuthAction,
  authSuccess,
  authFailure,
  logout,
  toggleBookmarkUser,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;
