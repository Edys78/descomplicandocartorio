import React from 'react';
import { Bookmark, Clock, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSelectedArticleId, toggleBookmark } from '../store/slices/newsSlice';
import { openArticleModal } from '../store/slices/uiSlice';

export const DailyFeedSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const bookmarks = useAppSelector((state) => state.news.bookmarks);

  // Articles for feed (excluding the main featured hero)
  const feedArticles = articles.filter((a) => !a.isFeatured);

  const handleArticleClick = (articleId: string) => {
    dispatch(setSelectedArticleId(articleId));
    dispatch(openArticleModal());
  };

  const handleToggleBookmark = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    dispatch(toggleBookmark(articleId));
  };

  return (
    <div id="daily-feed-column" className="flex flex-col">
      {/* SECTION HEADER: "ÚLTIMOS GUIAS" */}
      <div className="border-b-2 border-slate-900 pb-2 mb-5 sm:mb-6 flex items-center justify-between">
        <h2 
          id="heading-daily-feed"
          className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900"
        >
          ÚLTIMOS GUIAS
        </h2>
        <span className="text-xs font-heading text-slate-500 font-bold uppercase tracking-wider">
          Passo a Passo
        </span>
      </div>

      {/* Feed List Items */}
      <div className="space-y-6 sm:space-y-7 divide-y divide-slate-200">
        {feedArticles.map((article) => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <article
              key={article.id}
              id={`daily-feed-item-${article.id}`}
              onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer pt-5 first:pt-0 flex flex-col justify-between"
            >
              <div>
                {/* Red Sub-category Tag in Small Caps */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-600 font-heading font-extrabold text-xs tracking-wider uppercase">
                    {article.category} › {article.subCategory}
                  </span>
                  <span className="text-xs font-body text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-heading font-bold text-xl sm:text-[22px] text-slate-900 leading-tight mb-2.5 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="font-body text-base text-slate-700 leading-relaxed mb-3.5">
                  {article.excerpt}
                </p>
              </div>

              {/* Byline & Bookmark control: "Souza Edy — Especialista em Registros e Procedimentos Cartorários" */}
              <div className="flex items-center justify-between text-sm font-body text-slate-600 pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-700">
                  {article.author.name} — {article.author.role}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(e, article.id)}
                    className={`p-1 transition-colors cursor-pointer ${
                      isBookmarked ? 'text-red-600' : 'hover:text-slate-900 text-slate-400'
                    }`}
                    title={isBookmarked ? 'Remover dos favoritos' : 'Salvar artigo'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-600' : ''}`} />
                  </button>
                  <span className="text-slate-900 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
