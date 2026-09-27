import React, { useState } from 'react';
import { X, Search, Clock, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeSearchModal, openArticleModal } from '../store/slices/uiSlice';
import { setSelectedArticleId as setSelectedNewsId } from '../store/slices/newsSlice';

export const SearchModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSearchModalOpen } = useAppSelector((state) => state.ui);
  const articles = useAppSelector((state) => state.news.articles);

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const filteredArticles = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.subCategory.toLowerCase().includes(q) ||
          (a.legalBasis && a.legalBasis.toLowerCase().includes(q)) ||
          a.author.name.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectArticle = (id: string) => {
    dispatch(setSelectedNewsId(id));
    dispatch(closeSearchModal());
    dispatch(openArticleModal());
  };

  const suggestions = [
    'Retificação',
    'Nascimento',
    'Casamento',
    'Óbito',
    'Alteração de prenome',
    'Patronímico',
    'Nome e gênero',
    'Lei 14.382'
  ];

  return (
    <div 
      id="modal-search"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
    >
      <div 
        className="bg-white text-slate-900 w-full max-w-2xl border-2 border-slate-900 rounded-lg shadow-2xl relative animate-in fade-in duration-150 flex flex-col max-h-[80vh]"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar retificação, certidão, prenome, leis..."
            className="w-full bg-transparent border-none text-base sm:text-lg font-heading font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => dispatch(closeSearchModal())}
            className="p-1 text-slate-400 hover:text-slate-900 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-slate-600">
              <p className="font-body text-base mb-2 font-medium">Busque por procedimentos de Cartório de Registro Civil.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-heading">
                <span className="text-slate-400">Sugestões de busca:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              <p className="font-body text-base">Nenhum procedimento encontrado para &quot;{query}&quot;.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              <p className="text-xs font-heading font-extrabold uppercase tracking-wider text-red-600 pb-2">
                {filteredArticles.length} guias e procedimentos encontrados
              </p>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article.id)}
                  className="py-3.5 group cursor-pointer hover:bg-slate-50 px-3 -mx-3 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-heading text-red-600 font-bold uppercase tracking-wider mb-1">
                    <span>{article.category} › {article.subCategory}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-normal font-body">{article.readTime}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-red-600">
                    {article.title}
                  </h4>
                  <p className="font-body text-sm text-slate-600 line-clamp-2 mt-1">
                    {article.excerpt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
