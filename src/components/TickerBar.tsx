import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSelectedArticleId } from '../store/slices/newsSlice';
import { openArticleModal } from '../store/slices/uiSlice';
import { Article } from '../types';

export const TickerBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);

  // Extract 4 highlights
  const tickerItems = articles.filter((a) => a.isTickerHighlight).slice(0, 4);

  const handleArticleClick = (article: Article) => {
    dispatch(setSelectedArticleId(article.id));
    dispatch(openArticleModal());
  };

  return (
    <section 
      id="ticker-highlights-bar" 
      className="w-full bg-[#FAF7EE] border-b border-[#d6cbaf] py-4 sm:py-5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#d6cbaf]">
          {tickerItems.map((item, index) => (
            <div
              key={item.id}
              id={`ticker-item-${item.id}`}
              onClick={() => handleArticleClick(item)}
              className={`group cursor-pointer pt-3 sm:pt-0 ${index > 0 ? 'sm:pl-6 lg:pl-6' : ''}`}
            >
              {/* Red Category Header in Small Caps */}
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-[#c53030] font-sans-ui font-black text-[11px] tracking-widest uppercase">
                  {item.category} • {item.subCategory}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-headline font-bold text-[#1c1917] text-[15px] sm:text-[16px] leading-snug group-hover:text-[#c53030] transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
