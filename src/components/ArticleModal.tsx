import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  ThumbsUp, 
  Share2, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Send, 
  Printer, 
  Check, 
  Scale, 
  FileCheck, 
  CheckCircle2, 
  MessageCircle 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeArticleModal, openAuthModal, setFontSize } from '../store/slices/uiSlice';
import { toggleBookmark, clapArticle, addComment, likeComment } from '../store/slices/newsSlice';

export const ArticleModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedArticleId, articles, bookmarks, comments } = useAppSelector((state) => state.news);
  const { isArticleModalOpen, fontSize } = useAppSelector((state) => state.ui);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappUrl = "https://wa.me/5511956870620?text=Ol%C3%A1!%20Estou%20com%20d%C3%BAvidas%20sobre%20o%20procedimento%20de%20cart%C3%B3rio";

  if (!isArticleModalOpen || !selectedArticleId) {
    return null;
  }

  const article = articles.find((a) => a.id === selectedArticleId);
  if (!article) return null;

  const isBookmarked = bookmarks.includes(article.id);
  const articleComments = comments[article.id] || [];

  // Text-to-Speech simulation or browser synthesis
  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `${article.title}. ${article.excerpt}. ${article.content.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!isAuthenticated || !user) {
      dispatch(openAuthModal('login'));
      return;
    }

    dispatch(
      addComment({
        id: `c-${Date.now()}`,
        articleId: article.id,
        author: user.name,
        avatar: user.avatarUrl,
        content: commentText.trim(),
        timestamp: 'Agora mesmo',
        likes: 0,
      })
    );
    setCommentText('');
  };

  const fontSizeClass = {
    sm: 'text-base leading-relaxed',
    base: 'text-[18px] leading-relaxed',
    lg: 'text-[20px] leading-relaxed',
    xl: 'text-[22px] leading-relaxed',
  }[fontSize];

  return (
    <div 
      id="modal-article-reader"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        className="bg-white text-slate-900 w-full max-w-4xl min-h-screen my-auto rounded-lg shadow-2xl border-2 border-slate-900 flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Sticky Top Reader Controls */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-heading font-extrabold text-xs text-red-600 uppercase tracking-wider">
              {article.category} › {article.subCategory}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            {/* Font Scaler Controls */}
            <div className="hidden sm:flex items-center space-x-1 border border-slate-300 rounded bg-slate-100 p-0.5 text-xs font-heading font-semibold">
              <button
                onClick={() => dispatch(setFontSize('sm'))}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${fontSize === 'sm' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tamanho padrão (16px)"
              >
                A-
              </button>
              <button
                onClick={() => dispatch(setFontSize('base'))}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${fontSize === 'base' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tamanho recomendado (18px)"
              >
                A
              </button>
              <button
                onClick={() => dispatch(setFontSize('lg'))}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${fontSize === 'lg' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tamanho ampliado (20px)"
              >
                A+
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Reader */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded border transition-colors flex items-center gap-1.5 text-xs font-heading font-semibold cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
              title={isPlayingAudio ? 'Pausar leitura em áudio' : 'Ouvir este guia em áudio'}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Guia'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
              title="Imprimir Guia"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1 text-xs font-heading font-semibold cursor-pointer"
              title="Copiar link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => dispatch(toggleBookmark(article.id))}
              className={`p-2 rounded border border-slate-300 bg-slate-100 hover:bg-slate-200 cursor-pointer ${
                isBookmarked ? 'text-red-600' : 'text-slate-800'
              }`}
              title={isBookmarked ? 'Remover dos salvos' : 'Salvar guia'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-600' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                if (isPlayingAudio && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                }
                dispatch(closeArticleModal());
              }}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              title="Fechar leitura"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="p-6 sm:p-10 md:p-12 max-w-3xl mx-auto w-full">
          {/* Legal Basis Tag if present */}
          {article.legalBasis && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-300 rounded text-red-600 text-xs font-heading font-bold uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4" />
              <span>Base Legal: {article.legalBasis}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subheading / Excerpt */}
          <p className="font-body text-xl sm:text-2xl text-slate-600 leading-relaxed mb-6 border-b border-slate-200 pb-6">
            {article.excerpt}
          </p>

          {/* Author Byline Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-slate-200 mb-8 text-sm font-body text-slate-600">
            <div>
              <p className="font-heading font-bold text-slate-900">
                Souza Edy <span className="font-body font-normal text-slate-600">— Especialista em Registros e Procedimentos Cartorários</span>
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-body text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Main Hero Photo */}
          {article.imageUrl && (
            <figure className="mb-8">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&auto=format&fit=crop&q=80';
                  }}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>
              {article.imageCaption && (
                <figcaption className="text-xs font-body text-slate-500 mt-2 text-center">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Text Paragraphs */}
          <div className={`font-body ${fontSizeClass} space-y-6 text-slate-800`}>
            {article.content.map((paragraph, index) => {
              if (index === 0) {
                const firstChar = paragraph.charAt(0);
                const rest = paragraph.slice(1);
                return (
                  <p key={index} className="first-paragraph leading-relaxed">
                    <span className="float-left text-5xl sm:text-6xl font-heading font-extrabold leading-none mr-3 pt-1 text-slate-900">
                      {firstChar}
                    </span>
                    {rest}
                  </p>
                );
              }
              return <p key={index} className="leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* Practical Tips Box */}
          {article.practicalTips && article.practicalTips.length > 0 && (
            <div className="my-8 bg-slate-50 border-2 border-slate-900 rounded-lg p-5">
              <h4 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Orientações Práticas do Especialista em Cartório
              </h4>
              <ul className="space-y-2 font-body text-base text-slate-700">
                {article.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Docs Box */}
          {article.requiredDocs && article.requiredDocs.length > 0 && (
            <div className="my-8 bg-emerald-50 border-2 border-emerald-600 rounded-lg p-5">
              <h4 className="font-heading font-bold text-lg text-emerald-950 flex items-center gap-2 mb-3">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                Documentos Obrigatórios Para o Procedimento
              </h4>
              <ul className="space-y-1.5 font-body text-sm text-emerald-900">
                {article.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* WhatsApp Direct Help CTA Inside Article */}
          <div className="my-8 p-5 bg-emerald-50 border border-emerald-300 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading font-bold text-lg text-emerald-950">Precisa de ajuda com este caso?</p>
              <p className="font-body text-sm text-emerald-800">Fale diretamente com nossa equipe jurídica pelo WhatsApp</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 shadow-sm transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Interactive Clap & Appreciation */}
          <div className="my-10 pt-6 border-t-2 border-b-2 border-slate-900 py-6 flex items-center justify-between">
            <div>
              <p className="font-heading font-bold text-lg text-slate-900">Este guia foi útil para você?</p>
              <p className="font-body text-sm text-slate-500">Demonstre seu apoio ao conteúdo do Descomplicando Cartório</p>
            </div>
            <button
              onClick={() => dispatch(clapArticle(article.id))}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-red-600 text-white font-heading font-bold text-sm rounded shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Útil ({article.claps})</span>
            </button>
          </div>

          {/* Comment Section */}
          <div className="mt-10" id="article-comments-section">
            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              Dúvidas & Comentários dos Leitores ({articleComments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label htmlFor="article-comment-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-2">
                {isAuthenticated ? `Comentando como ${user?.name}` : 'Deixe sua dúvida sobre o procedimento'}
              </label>
              <textarea
                id="article-comment-input"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isAuthenticated
                    ? 'Escreva sua dúvida jurídica ou relato de experiência com o cartório...'
                    : 'Faça login ou crie sua conta para participar das discussões.'
                }
                className="w-full p-3 bg-white border border-slate-300 rounded font-body text-base text-slate-900 focus:outline-hidden focus:border-slate-900"
              />
              <div className="mt-3 flex items-center justify-between">
                {!isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => dispatch(openAuthModal('login'))}
                    className="text-xs font-heading font-bold text-red-600 underline cursor-pointer"
                  >
                    Clique aqui para Entrar
                  </button>
                ) : (
                  <span className="text-xs font-body text-slate-500">Sujeito a moderação prévia</span>
                )}
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 disabled:opacity-40 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar Dúvida
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {articleComments.length === 0 ? (
                <p className="text-base font-body text-slate-500 italic">Seja o primeiro a enviar uma dúvida ou relato neste guia.</p>
              ) : (
                articleComments.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-xs font-body">
                      <span className="font-heading font-bold text-slate-900">{c.author}</span>
                      <span className="text-slate-500">{c.timestamp}</span>
                    </div>
                    <p className="font-body text-base text-slate-800 leading-relaxed">{c.content}</p>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => dispatch(likeComment({ articleId: article.id, commentId: c.id }))}
                        className="text-xs font-heading font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> ({c.likes})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
