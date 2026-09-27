import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, MainNavCategory } from '../../types';

const initialState: UIState = {
  isAuthModalOpen: false,
  authModalMode: 'login',
  isSearchModalOpen: false,
  isArticleModalOpen: false,
  isTestRunnerOpen: false,
  isMobileMenuOpen: false,
  fontSize: 'base',
  activeDropdown: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'login' | 'register' | undefined>) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authModalMode = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    toggleAuthModalMode: (state) => {
      state.authModalMode = state.authModalMode === 'login' ? 'register' : 'login';
    },
    openSearchModal: (state) => {
      state.isSearchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false;
    },
    openArticleModal: (state) => {
      state.isArticleModalOpen = true;
    },
    closeArticleModal: (state) => {
      state.isArticleModalOpen = false;
    },
    openTestRunner: (state) => {
      state.isTestRunnerOpen = true;
    },
    closeTestRunner: (state) => {
      state.isTestRunnerOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setFontSize: (state, action: PayloadAction<'sm' | 'base' | 'lg' | 'xl'>) => {
      state.fontSize = action.payload;
    },
    setActiveDropdown: (state, action: PayloadAction<MainNavCategory | null>) => {
      state.activeDropdown = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  toggleAuthModalMode,
  openSearchModal,
  closeSearchModal,
  openArticleModal,
  closeArticleModal,
  openTestRunner,
  closeTestRunner,
  toggleMobileMenu,
  closeMobileMenu,
  setFontSize,
  setActiveDropdown,
} = uiSlice.actions;

export default uiSlice.reducer;
