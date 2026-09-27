import React from 'react';
import { useAppSelector } from './store';
import { Header } from './components/Header';
import { BreakingNewsSection } from './components/BreakingNewsSection';
import { DailyFeedSection } from './components/DailyFeedSection';
import { CategoryView } from './components/CategoryView';
import { ContactView } from './components/ContactView';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const activeCategory = useAppSelector((state) => state.news.activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-[#1c1917] selection:bg-[#c53030] selection:text-white relative">
      {/* 1. Header with Live Brasília Calendar, Masthead and Navigation */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeCategory === 'HOME' ? (
          <>
            {/* Main 2-Column Editorial Grid */}
            <div className="py-6 sm:py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Guia em Destaque (Lei 14.382) */}
              <div className="lg:col-span-7 xl:col-span-7">
                <BreakingNewsSection />
              </div>

              {/* Divider on Desktop */}
              <div className="hidden lg:block lg:col-span-1 lg:w-px lg:bg-[#d6cbaf] lg:mx-auto h-full min-h-[500px]" />

              {/* Right Column: Últimos Guias */}
              <div className="lg:col-span-4 xl:col-span-4">
                <DailyFeedSection />
              </div>
            </div>
          </>
        ) : activeCategory === 'CONTATO' ? (
          <ContactView />
        ) : (
          <CategoryView category={activeCategory} />
        )}
      </main>

      {/* 3. Footer with quick submenus, newsletter & contact */}
      <Footer />

      {/* 4. Elegant WhatsApp Floating Widget in the Bottom-Left Corner */}
      <WhatsAppButton />

      {/* 5. Modals (Article reader and search) */}
      <ArticleModal />
      <SearchModal />
    </div>
  );
}
