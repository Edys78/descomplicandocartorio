import React from 'react';
import { Bookmark, Clock, ThumbsUp, Scale, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSelectedArticleId, toggleBookmark, clapArticle } from '../store/slices/newsSlice';
import { openArticleModal } from '../store/slices/uiSlice';
import { Article } from '../types';

export const BreakingNewsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const bookmarks = useAppSelector((state) => state.news.bookmarks);

  const featuredArticle: Article | undefined = articles.find((a) => a.isFeatured) || articles[0];

  if (!featuredArticle) return null;

  const isBookmarked = bookmarks.includes(featuredArticle.id);

  const handleOpenReader = () => {
    dispatch(setSelectedArticleId(featuredArticle.id));
    dispatch(openArticleModal());
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleBookmark(featuredArticle.id));
  };

  const handleClap = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(clapArticle(featuredArticle.id));
  };

  return (
    <div id="breaking-news-column" className="flex flex-col">
      {/* SECTION HEADER */}
      <div className="border-b border-[#292524] pb-2 mb-4 sm:mb-5 flex items-center justify-between">
        <h2 
          id="heading-breaking-news"
          className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#1c1917]"
        >
          GUIA EM DESTAQUE
        </h2>
        <span className="text-xs font-sans-ui text-[#c53030] font-bold uppercase tracking-wider flex items-center gap-1">
          <Scale className="w-3.5 h-3.5" /> Legislação Atualizada
        </span>
      </div>

      {/* Hero Article Card */}
      <article 
        id="card-breaking-news"
        onClick={handleOpenReader}
        className="group cursor-pointer bg-[#FAF7EE] flex flex-col"
      >
        {/* Main Realistic Photo with overlay tag */}
        <div className="relative overflow-hidden bg-[#e5dfd0] border border-[#d6cbaf] mb-4 aspect-[16/10] sm:aspect-[16/9]">
          <img
            src={featuredArticle.imageUrl}
            alt={featuredArticle.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to high-availability CDN image if local fails in any environment
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 bg-[#1c1917] text-[#FAF7EE] px-3 py-1 text-[11px] font-sans-ui font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 border border-[#d6cbaf]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c53030] animate-ping"></span>
            <span>{featuredArticle.category} › {featuredArticle.subCategory}</span>
          </div>
        </div>

        {/* Headline & Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-sans-ui text-[#78716c]">
            <span className="text-[#c53030] font-black uppercase tracking-wider">
              {featuredArticle.legalBasis || 'DIREITO REGISTRAL'}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featuredArticle.readTime}
              </span>
            </div>
          </div>

          <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#1c1917] leading-tight group-hover:text-[#c53030] transition-colors">
            {featuredArticle.title}
          </h3>

          <p className="font-serif-body text-base sm:text-lg text-[#44403c] leading-relaxed line-clamp-3">
            {featuredArticle.excerpt}
          </p>

          {/* Quick Practical Tips Box */}
          {featuredArticle.practicalTips && (
            <div className="bg-[#f0ead8] p-3 border-l-3 border-[#c53030] my-2">
              <p className="text-[11px] font-sans-ui font-bold uppercase tracking-wider text-[#1c1917] mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" /> Dicas Rápidas do Especialista:
              </p>
              <ul className="text-xs font-serif-body text-[#44403c] space-y-0.5">
                {featuredArticle.practicalTips.slice(0, 2).map((tip, idx) => (
                  <li key={idx}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Author: Souza Edy */}
          <div className="pt-3 border-t border-[#e5dfd0] flex flex-wrap items-center justify-between gap-3 text-xs font-sans-ui text-[#57534e]">
            <div className="flex items-center">
              <span className="font-bold text-[#1c1917]">Souza Edy</span>
              <span className="text-[#57534e]"> — Especialista em Registros e Procedimentos Cartorários</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handleClap}
                className="flex items-center gap-1 hover:text-[#c53030] p-1 transition-colors cursor-pointer"
                title="Apoiar este artigo"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="font-semibold">{featuredArticle.claps}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`p-1 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-[#c53030]' : 'hover:text-[#1c1917] text-[#78716c]'
                }`}
                title={isBookmarked ? 'Remover dos salvos' : 'Salvar para consultar depois'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#c53030]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
