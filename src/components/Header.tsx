import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  ChevronDown,
  Scale,
  Calendar,
  Clock
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setActiveCategory, setActiveSubCategory } from '../store/slices/newsSlice';
import { openSearchModal, toggleMobileMenu, closeMobileMenu } from '../store/slices/uiSlice';
import { MainNavCategory, SubMenuOption } from '../types';

interface MenuConfig {
  label: string;
  category: MainNavCategory;
  submenus?: { label: string; subCategory: SubMenuOption }[];
}

const MENU_ITEMS: MenuConfig[] = [
  { label: 'Home', category: 'HOME' },
  { 
    label: 'Curiosidades', 
    category: 'CURIOSIDADES',
    submenus: [
      { label: 'O que é retificação?', subCategory: 'O que é retificação?' },
      { label: 'O que precisa para retificar?', subCategory: 'O que precisa para retificar?' },
      { label: 'E quem pode?', subCategory: 'E quem pode?' },
    ]
  },
  { 
    label: 'Retificação', 
    category: 'RETIFICAÇÃO',
    submenus: [
      { label: 'Nascimento', subCategory: 'Nascimento' },
      { label: 'Casamento', subCategory: 'Casamento' },
      { label: 'Óbito', subCategory: 'Óbito' },
    ]
  },
  { 
    label: 'Procedimentos', 
    category: 'PROCEDIMENTOS',
    submenus: [
      { label: 'Alteração de Patronímico', subCategory: 'Alteração de Patronímico' },
      { label: 'Alteração de nome e gênero', subCategory: 'Alteração de nome e gênero' },
      { label: 'Alteração de prenome', subCategory: 'Alteração de prenome' },
    ]
  },
  { label: 'Contato', category: 'CONTATO' },
];

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCategory, activeSubCategory, bookmarks } = useAppSelector((state) => state.news);
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  const [openDropdown, setOpenDropdown] = useState<MainNavCategory | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<MainNavCategory | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic calendar state in Brasília Timezone
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('');
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('');

  useEffect(() => {
    const updateBrasiliaClock = () => {
      const now = new Date();

      // Date formatter with pt-BR in America/Sao_Paulo timezone
      const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Time formatter in America/Sao_Paulo timezone
      const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const dateStr = dateFormatter.format(now);
      const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

      setCurrentDateFormatted(capitalizedDate);
      setCurrentTimeFormatted(timeFormatter.format(now));
    };

    updateBrasiliaClock();
    const interval = setInterval(updateBrasiliaClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (cat: MainNavCategory) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(cat);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleSelectCategory = (category: MainNavCategory) => {
    dispatch(setActiveCategory(category));
    setOpenDropdown(null);
    dispatch(closeMobileMenu());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubCategory = (category: MainNavCategory, subCategory: SubMenuOption) => {
    dispatch(setActiveSubCategory({ category, subCategory }));
    setOpenDropdown(null);
    dispatch(closeMobileMenu());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white text-slate-900 border-b border-slate-900 select-none" id="main-header">
      {/* 1. TOP UTILITY BAR WITH AUTOMATIC CALENDAR & BRASÍLIA TIME */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-slate-200 text-xs font-body tracking-wide flex items-center justify-between">
        {/* Automatic Calendar & Live Clock on Left */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5 text-slate-900">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
            <span className="font-heading font-semibold text-slate-900">
              {currentDateFormatted || 'Carregando calendário...'}
            </span>
          </div>
          
          <span className="text-slate-300 hidden xs:inline">•</span>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-heading font-bold text-slate-900 tracking-tight">
              {currentTimeFormatted}
            </span>
            <span className="text-[11px] font-normal text-slate-500 hidden sm:inline">
              (Horário de Brasília)
            </span>
          </div>
        </div>

        {/* Portal Tag & Mobile Menu Trigger on Right */}
        <div className="flex items-center space-x-3 text-slate-800">
          <div className="hidden lg:flex items-center space-x-2 text-slate-600 text-[11px] uppercase tracking-widest font-heading font-semibold">
            <Scale className="w-3.5 h-3.5 text-red-600" />
            <span>Portal Jurídico de Registro Civil das Pessoas Naturais</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="header-btn-mobile-menu"
            onClick={() => dispatch(toggleMobileMenu())}
            className="md:hidden p-1.5 text-slate-900 hover:text-red-600"
            aria-label="Alternar menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 2. THE ICONIC MASTHEAD ("DESCOMPLICANDO CARTÓRIO") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => handleSelectCategory('HOME')}
            className="group cursor-pointer text-center focus:outline-hidden"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <Scale className="w-4 h-4 text-red-600" />
              <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-slate-500">
                REGISTRO CIVIL DE PESSOAS NATURAIS
              </span>
              <Scale className="w-4 h-4 text-red-600" />
            </div>
            
            <h1 
              id="masthead-title"
              className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-none text-slate-900 tracking-tight uppercase hover:text-slate-800 transition-colors"
            >
              DESCOMPLICANDO CARTÓRIO
            </h1>
            
            <p className="font-body text-base sm:text-lg text-slate-600 mt-2.5 font-normal max-w-2xl mx-auto">
              Tudo sobre Retificações, Mudança de Nome, Gênero e Procedimentos Extrajudiciais
            </p>
          </button>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR WITH INTERACTIVE DROPDOWNS */}
      <div className="border-t-2 border-b-2 border-slate-900 bg-slate-900 text-white shadow-xs relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-2.5">
            {/* Desktop Menu with Submenus */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-10 text-[13px] lg:text-[14px] font-heading font-bold uppercase tracking-wider">
              {MENU_ITEMS.map((item) => {
                const isActive = activeCategory === item.category;
                const hasSubmenus = item.submenus && item.submenus.length > 0;
                const isDropdownOpen = openDropdown === item.category;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasSubmenus && handleMouseEnter(item.category)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      id={`nav-item-${item.category.toLowerCase()}`}
                      onClick={() => handleSelectCategory(item.category)}
                      className={`inline-flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
                        isActive ? 'text-red-400 font-extrabold' : 'text-slate-200 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasSubmenus && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      )}
                      {isActive && (
                        <span className="absolute -bottom-2.5 left-0 w-full h-[3px] bg-red-500"></span>
                      )}
                    </button>

                    {/* Desktop Dropdown Submenu */}
                    {hasSubmenus && isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2.5 w-64 bg-white text-slate-900 border-2 border-slate-900 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 rounded-b-md">
                        {item.submenus!.map((sub) => {
                          const isSubActive = activeCategory === item.category && activeSubCategory === sub.subCategory;
                          return (
                            <button
                              key={sub.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectSubCategory(item.category, sub.subCategory);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-body font-medium normal-case tracking-normal hover:bg-slate-100 hover:text-red-600 transition-colors flex items-center justify-between cursor-pointer ${
                                isSubActive ? 'bg-slate-100 text-red-600 font-bold' : 'text-slate-800'
                              }`}
                            >
                              <span>{sub.label}</span>
                              {isSubActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Category Active Label */}
            <div className="md:hidden font-heading font-bold uppercase text-xs tracking-wider text-red-400">
              {activeCategory} {activeSubCategory ? `› ${activeSubCategory}` : ''}
            </div>

            {/* Search Icon & Bookmarks quick count */}
            <div className="flex items-center space-x-3 text-slate-200">
              {bookmarks.length > 0 && (
                <button
                  id="header-btn-bookmarks"
                  onClick={() => handleSelectCategory('HOME')}
                  className="hidden sm:flex items-center space-x-1 text-xs font-heading font-medium text-slate-300 hover:text-white cursor-pointer"
                  title={`${bookmarks.length} artigos salvos`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>({bookmarks.length})</span>
                </button>
              )}

              <button
                id="header-btn-search"
                onClick={() => dispatch(openSearchModal())}
                className="p-1.5 text-white hover:text-red-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Buscar artigos sobre cartório..."
                aria-label="Buscar procedimentos"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER WITH SUBMENUS */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white border-b-2 border-slate-950 px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <div className="space-y-1.5">
            {MENU_ITEMS.map((item) => {
              const hasSubmenus = item.submenus && item.submenus.length > 0;
              const isExpanded = mobileExpandedCat === item.category;
              const isActive = activeCategory === item.category;

              return (
                <div key={item.label} className="border-b border-slate-800 last:border-none pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleSelectCategory(item.category)}
                      className={`text-left py-2 px-2 text-sm font-heading font-bold uppercase tracking-wider ${
                        isActive ? 'text-red-400' : 'text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                    {hasSubmenus && (
                      <button
                        onClick={() => setMobileExpandedCat(isExpanded ? null : item.category)}
                        className="p-2 text-slate-400 hover:text-white"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Submenu items list on Mobile */}
                  {hasSubmenus && isExpanded && (
                    <div className="pl-4 pb-2 space-y-1 bg-slate-800 rounded p-2 mt-1">
                      {item.submenus!.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleSelectSubCategory(item.category, sub.subCategory)}
                          className="w-full text-left py-1 text-sm font-body text-slate-300 hover:text-red-400 flex items-center gap-1.5"
                        >
                          <span className="text-red-400 font-bold">›</span>
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-end text-sm font-heading">
            <button
              onClick={() => {
                dispatch(openSearchModal());
                dispatch(closeMobileMenu());
              }}
              className="text-white font-bold flex items-center gap-1.5 py-1 text-slate-200 hover:text-red-400"
            >
              <Search className="w-4 h-4" /> Buscar no Blog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
