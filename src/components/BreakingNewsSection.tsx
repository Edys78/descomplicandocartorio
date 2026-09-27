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
      <div className="border-b-2 border-slate-900 pb-2 mb-5 sm:mb-6 flex items-center justify-between">
        <h2 
          id="heading-breaking-news"
          className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900"
        >
          GUIA EM DESTAQUE
        </h2>
        <span className="text-xs font-heading text-red-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-4 h-4" /> Legislação Atualizada
        </span>
      </div>

      {/* Hero Article Card */}
      <article 
        id="card-breaking-news"
        onClick={handleOpenReader}
        className="group cursor-pointer bg-white flex flex-col"
      >
        {/* Main Realistic Photo with overlay tag */}
        <div className="relative overflow-hidden bg-slate-100 border border-slate-200 rounded-lg mb-5 aspect-[16/10] sm:aspect-[16/9]">
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
          <div className="absolute top-3 left-3 bg-slate-900 text-white px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>{featuredArticle.category} › {featuredArticle.subCategory}</span>
          </div>
        </div>

        {/* Headline & Details */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs font-heading font-semibold text-slate-500">
            <span className="text-red-600 font-extrabold uppercase tracking-wider">
              {featuredArticle.legalBasis || 'DIREITO REGISTRAL'}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-body text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {featuredArticle.readTime}
              </span>
            </div>
          </div>

          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight group-hover:text-red-600 transition-colors">
            {featuredArticle.title}
          </h3>

          <p className="font-body text-[17px] sm:text-lg text-slate-700 leading-relaxed">
            {featuredArticle.excerpt}
          </p>

          {/* Quick Practical Tips Box */}
          {featuredArticle.practicalTips && (
            <div className="bg-slate-50 p-4 border-l-4 border-red-600 rounded-r-md my-3">
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dicas Rápidas do Especialista:
              </p>
              <ul className="text-[15px] sm:text-base font-body text-slate-700 space-y-1">
                {featuredArticle.practicalTips.slice(0, 2).map((tip, idx) => (
                  <li key={idx}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Author: Souza Edy */}
          <div className="pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm font-body text-slate-600">
            <div className="flex items-center">
              <span className="font-heading font-bold text-slate-900">Souza Edy</span>
              <span className="text-slate-600"> — Especialista em Registros e Procedimentos Cartorários</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handleClap}
                className="flex items-center gap-1.5 hover:text-red-600 p-1 transition-colors cursor-pointer text-slate-700 font-semibold text-xs"
                title="Apoiar este artigo"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{featuredArticle.claps}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`p-1 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-red-600' : 'hover:text-slate-900 text-slate-400'
                }`}
                title={isBookmarked ? 'Remover dos salvos' : 'Salvar para consultar depois'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
