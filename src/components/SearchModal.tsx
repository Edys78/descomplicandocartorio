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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
    >
      <div 
        className="bg-[#FAF7EE] text-[#1c1917] w-full max-w-2xl border-2 border-[#1c1917] shadow-2xl relative animate-in fade-in duration-150 flex flex-col max-h-[80vh]"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#d6cbaf] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c53030] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar retificação, certidão, prenome, leis..."
            className="w-full bg-transparent border-none text-base sm:text-lg font-headline font-bold text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-hidden"
          />
          <button
            onClick={() => dispatch(closeSearchModal())}
            className="p-1 text-[#78716c] hover:text-[#1c1917] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-[#78716c]">
              <p className="font-sans-ui text-sm mb-2 font-medium">Busque por procedimentos de Cartório de Registro Civil.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-sans-ui">
                <span className="text-[#a8a29e]">Sugestões de busca:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 bg-[#ede7d5] hover:bg-[#dcd4bd] rounded text-[#44403c] cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-[#78716c]">
              <p className="font-sans-ui text-sm">Nenhum procedimento encontrado para &quot;{query}&quot;.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#e5dfd0]">
              <p className="text-xs font-sans-ui font-bold uppercase tracking-widest text-[#c53030] pb-2">
                {filteredArticles.length} guias e procedimentos encontrados
              </p>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article.id)}
                  className="py-3.5 group cursor-pointer hover:bg-[#f0ead8] px-2 -mx-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-[#c53030] font-bold uppercase tracking-wider mb-1">
                    <span>{article.category} › {article.subCategory}</span>
                    <span className="text-[#a8a29e]">•</span>
                    <span className="text-[#78716c] font-normal">{article.readTime}</span>
                  </div>
                  <h4 className="font-headline font-bold text-base sm:text-lg text-[#1c1917] group-hover:text-[#c53030]">
                    {article.title}
                  </h4>
                  <p className="font-serif-body text-xs sm:text-sm text-[#57534e] line-clamp-2 mt-1">
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
