import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const whatsappUrl = "https://wa.me/5511956870620?text=Ol%C3%A1!%20Em%20que%20posso%20te%20ajudar%3F";

  return (
    <div 
      id="whatsapp-floating-widget"
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 select-none"
    >
      {/* Subtle floating message bubble */}
      {isTooltipOpen && (
        <div className="bg-[#FAF7EE] text-[#1c1917] p-3.5 rounded-lg shadow-xl border-2 border-[#25D366] max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="absolute top-2 right-2 text-[#78716c] hover:text-[#1c1917] p-0.5"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
            <span className="text-[11px] font-sans-ui font-bold text-[#1c1917] uppercase tracking-wider">
              Atendimento Online
            </span>
          </div>
          <p className="text-xs font-serif-body text-[#44403c] leading-relaxed">
            Dúvidas sobre retificação de certidão ou mudança de nome? Fale conosco direto no WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-center py-1.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-sans-ui font-bold rounded shadow-xs transition-colors"
          >
            Iniciar Conversa
          </a>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="flex items-center gap-2">
        <a
          id="btn-whatsapp-direct"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-hidden ring-4 ring-white/50"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:opacity-100"></span>
          
          <MessageCircle className="w-7 h-7 fill-white stroke-none relative z-10" />

          {/* Quick Notification Badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#c53030] border-2 border-white rounded-full"></span>
        </a>

        {/* Text Pill */}
        <button
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7EE] text-[#1c1917] border border-[#d6cbaf] hover:border-[#25D366] rounded-full text-xs font-sans-ui font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
          <span>Dúvidas de Cartório?</span>
        </button>
      </div>
    </div>
  );
};
