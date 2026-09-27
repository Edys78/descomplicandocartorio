import React, { useState } from 'react';
import { Mail, ArrowUp, Send, Check, Scale, MessageCircle } from 'lucide-react';
import { useAppDispatch } from '../store';
import { setActiveCategory, setActiveSubCategory } from '../store/slices/newsSlice';
import { SubMenuOption } from '../types';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const whatsappUrl = "https://wa.me/5511956870620?text=Ol%C3%A1!%20Em%20que%20posso%20te%20ajudar%3F";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navCuriosidades: SubMenuOption[] = [
    'O que é retificação?',
    'O que precisa para retificar?',
    'E quem pode?',
  ];

  const navRetificacao: SubMenuOption[] = [
    'Nascimento',
    'Casamento',
    'Óbito',
  ];

  const navProcedimentos: SubMenuOption[] = [
    'Alteração de Patronímico',
    'Alteração de nome e gênero',
    'Alteração de prenome',
  ];

  return (
    <footer className="w-full bg-slate-900 text-white border-t-2 border-slate-950 mt-16" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800">
          {/* Masthead Branding & Mission */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <Scale className="w-5 h-5" />
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest">
                BLOG ESPECIALIZADO
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              DESCOMPLICANDO CARTÓRIO
            </h2>
            <p className="font-body text-base text-slate-300 leading-relaxed">
              Informação jurídica clara, prática e desburocratizada sobre procedimentos em Cartório de Registro Civil das Pessoas Naturais.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs font-heading text-slate-400">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 font-bold hover:underline"
              >
                <MessageCircle className="w-4 h-4" /> (11) 95687-0620
              </a>
            </div>
          </div>

          {/* Quick Submenu Navigation: Curiosidades & Retificação */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-red-400">
              Curiosidades
            </h3>
            <ul className="space-y-1.5 font-body text-sm text-slate-300">
              {navCuriosidades.map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => {
                      dispatch(setActiveSubCategory({ category: 'CURIOSIDADES', subCategory: sub }));
                      scrollToTop();
                    }}
                    className="hover:text-red-400 hover:underline transition-colors text-left cursor-pointer"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-red-400 pt-2">
              Retificação
            </h3>
            <ul className="space-y-1.5 font-body text-sm text-slate-300">
              {navRetificacao.map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => {
                      dispatch(setActiveSubCategory({ category: 'RETIFICAÇÃO', subCategory: sub }));
                      scrollToTop();
                    }}
                    className="hover:text-red-400 hover:underline transition-colors text-left cursor-pointer"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedimentos & Contato */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-red-400">
              Procedimentos
            </h3>
            <ul className="space-y-1.5 font-body text-sm text-slate-300">
              {navProcedimentos.map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => {
                      dispatch(setActiveSubCategory({ category: 'PROCEDIMENTOS', subCategory: sub }));
                      scrollToTop();
                    }}
                    className="hover:text-red-400 hover:underline transition-colors text-left cursor-pointer"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <button
                onClick={() => {
                  dispatch(setActiveCategory('CONTATO'));
                  scrollToTop();
                }}
                className="font-heading font-bold text-xs uppercase tracking-widest text-white hover:text-red-400 underline cursor-pointer"
              >
                Formulário de Contato ›
              </button>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-4 bg-slate-800 p-5 border border-slate-700 rounded-lg">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-400" />
              Boletim Registral & Provimentos
            </h3>
            <p className="font-body text-base text-slate-300">
              Receba atualizações de normas do CNJ, Lei de Registros Públicos e novos modelos de requerimento.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu endereço de e-mail"
                  className="w-full p-2.5 text-sm font-body bg-slate-900 border border-slate-700 text-white rounded-l-md focus:outline-hidden focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-heading font-bold uppercase transition-colors shrink-0 flex items-center justify-center cursor-pointer rounded-r-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-heading text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Inscrição realizada com sucesso!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Lower Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-body text-slate-400 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span>© {new Date().getFullYear()} Descomplicando Cartório. Todos os direitos reservados.</span>
            <span>•</span>
            <span>Souza Edy — Especialista em Registros e Procedimentos Cartorários</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white hover:text-red-400 font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
