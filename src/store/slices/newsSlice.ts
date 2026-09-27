import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, MainNavCategory, SubMenuOption, Comment, NewsState } from '../../types';
import { INITIAL_ARTICLES, INITIAL_COMMENTS } from '../../data/mockNews';

const BOOKMARKS_STORAGE_KEY = 'descomplicando_cartorio_bookmarks';

const loadBookmarks = (): string[] => {
  try {
    const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: NewsState = {
  articles: INITIAL_ARTICLES,
  selectedArticleId: null,
  activeCategory: 'HOME',
  activeSubCategory: null,
  searchQuery: '',
  bookmarks: loadBookmarks(),
  comments: INITIAL_COMMENTS,
  clappedArticles: {},
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<MainNavCategory>) => {
      state.activeCategory = action.payload;
      state.activeSubCategory = null;
      state.searchQuery = '';
    },
    setActiveSubCategory: (state, action: PayloadAction<{ category: MainNavCategory; subCategory: SubMenuOption }>) => {
      state.activeCategory = action.payload.category;
      state.activeSubCategory = action.payload.subCategory;
      state.searchQuery = '';
    },
    setSelectedArticleId: (state, action: PayloadAction<string | null>) => {
      state.selectedArticleId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.bookmarks.includes(id)) {
        state.bookmarks = state.bookmarks.filter((bId) => bId !== id);
      } else {
        state.bookmarks.push(id);
      }
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(state.bookmarks));
      } catch {
        // ignore
      }
    },
    clapArticle: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.clappedArticles[id] = (state.clappedArticles[id] || 0) + 1;
      const article = state.articles.find((a) => a.id === id);
      if (article) {
        article.claps += 1;
      }
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      if (!state.comments[comment.articleId]) {
        state.comments[comment.articleId] = [];
      }
      state.comments[comment.articleId].unshift(comment);
      const article = state.articles.find((a) => a.id === comment.articleId);
      if (article) {
        article.commentsCount += 1;
      }
    },
    likeComment: (state, action: PayloadAction<{ articleId: string; commentId: string }>) => {
      const list = state.comments[action.payload.articleId];
      if (list) {
        const found = list.find((c) => c.id === action.payload.commentId);
        if (found) {
          found.likes += 1;
        }
      }
    },
    publishNewArticle: (state, action: PayloadAction<Article>) => {
      state.articles.unshift(action.payload);
    },
  },
});

export const {
  setActiveCategory,
  setActiveSubCategory,
  setSelectedArticleId,
  setSearchQuery,
  toggleBookmark,
  clapArticle,
  addComment,
  likeComment,
  publishNewArticle,
} = newsSlice.actions;

export default newsSlice.reducer;
