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
      <div className="border-b border-[#292524] pb-2 mb-4 sm:mb-5 flex items-center justify-between">
        <h2 
          id="heading-daily-feed"
          className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#1c1917]"
        >
          ÚLTIMOS GUIAS
        </h2>
        <span className="text-xs font-sans-ui text-[#78716c] font-bold uppercase tracking-wider">
          Passo a Passo
        </span>
      </div>

      {/* Feed List Items */}
      <div className="space-y-6 sm:space-y-7 divide-y divide-[#e5dfd0]">
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
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#c53030] font-sans-ui font-black text-xs tracking-widest uppercase">
                    {article.category} › {article.subCategory}
                  </span>
                  <span className="text-[11px] font-sans-ui text-[#78716c] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-headline font-bold text-xl sm:text-[22px] text-[#1c1917] leading-tight mb-2 group-hover:text-[#c53030] transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="font-serif-body text-[15px] sm:text-base text-[#44403c] leading-relaxed mb-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Byline & Bookmark control: "Souza Edy — Especialista em Registros e Procedimentos Cartorários" */}
              <div className="flex items-center justify-between text-xs font-sans-ui text-[#78716c] pt-2">
                <span className="font-medium text-[#57534e]">
                  {article.author.name} — {article.author.role}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(e, article.id)}
                    className={`p-1 transition-colors cursor-pointer ${
                      isBookmarked ? 'text-[#c53030]' : 'hover:text-[#1c1917] text-[#a8a29e]'
                    }`}
                    title={isBookmarked ? 'Remover dos favoritos' : 'Salvar artigo'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#c53030]' : ''}`} />
                  </button>
                  <span className="text-[#1c1917] group-hover:translate-x-0.5 transition-transform">
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
