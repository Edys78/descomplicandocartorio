import React from 'react';
import { Bookmark, Clock, BookOpenCheck, ChevronRight, FileText } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSelectedArticleId, toggleBookmark, setActiveSubCategory } from '../store/slices/newsSlice';
import { openArticleModal } from '../store/slices/uiSlice';
import { MainNavCategory, SubMenuOption } from '../types';

interface CategoryViewProps {
  category: MainNavCategory;
}

const SUBMENU_MAP: Record<MainNavCategory, SubMenuOption[]> = {
  HOME: [],
  CURIOSIDADES: ['O que é retificação?', 'O que precisa para retificar?', 'E quem pode?'],
  RETIFICAÇÃO: ['Nascimento', 'Casamento', 'Óbito'],
  PROCEDIMENTOS: ['Alteração de Patronímico', 'Alteração de nome e gênero', 'Alteração de prenome'],
  CONTATO: [],
};

export const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { articles, bookmarks, activeSubCategory } = useAppSelector((state) => state.news);

  // Filter by category and optionally by activeSubCategory
  const filteredArticles = articles.filter((a) => {
    if (a.category !== category) return false;
    if (activeSubCategory) {
      return a.subCategory === activeSubCategory;
    }
    return true;
  });

  const availableSubmenus = SUBMENU_MAP[category] || [];

  const handleOpen = (id: string) => {
    dispatch(setSelectedArticleId(id));
    dispatch(openArticleModal());
  };

  const handleToggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(toggleBookmark(id));
  };

  return (
    <div className="py-8 space-y-8" id={`category-view-${category.toLowerCase()}`}>
      {/* Category Header */}
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-red-600 font-heading font-extrabold text-xs uppercase tracking-widest">
              GUIA JURÍDICO DE REGISTRO CIVIL
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 mt-1">
              {category}
            </h2>
          </div>
          <span className="text-xs font-heading text-slate-500 uppercase font-bold">
            {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} disponível{filteredArticles.length !== 1 ? 'is' : ''}
          </span>
        </div>

        {/* Submenu Filter Pills */}
        {availableSubmenus.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => dispatch(setActiveSubCategory({ category, subCategory: null as any }))}
              className={`px-3.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                !activeSubCategory
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Todos os Guias de {category}
            </button>
            {availableSubmenus.map((sub) => {
              const isSelected = activeSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => dispatch(setActiveSubCategory({ category, subCategory: sub }))}
                  className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <BookOpenCheck className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-slate-900">Nenhum artigo encontrado nesta subdivisão</h3>
          <p className="font-body text-base text-slate-600">
            Estamos redigindo novos guias e manuais práticos para esta seção. Retorne ao índice geral de {category}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarks.includes(article.id);
            return (
              <article
                key={article.id}
                onClick={() => handleOpen(article.id)}
                className="group cursor-pointer bg-white border border-slate-200 hover:border-slate-900 rounded-lg transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {article.imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 mb-4 rounded-md border border-slate-200 relative">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-heading font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                        {article.subCategory}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-heading text-red-600 font-extrabold uppercase tracking-wider mb-2">
                    <span>{article.legalBasis || article.subCategory}</span>
                    <span className="text-slate-500 font-normal font-body flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug mb-2 group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="font-body text-base text-slate-700 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Required Docs Badge if available */}
                  {article.requiredDocs && (
                    <div className="mb-4 bg-slate-50 p-2.5 rounded text-xs font-body text-slate-700 border border-slate-200">
                      <span className="font-heading font-bold text-slate-900 block mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-red-600" /> Documentos Chave:
                      </span>
                      <p className="line-clamp-2">{article.requiredDocs.join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-body text-slate-600">
                  <span className="text-slate-700 font-medium">{article.author.name} — {article.author.role}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(e, article.id)}
                      className={`p-1 cursor-pointer ${isBookmarked ? 'text-red-600' : 'text-slate-400 hover:text-slate-900'}`}
                      title={isBookmarked ? 'Remover dos salvos' : 'Salvar artigo'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-red-600' : ''}`} />
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
      )}
    </div>
  );
};
