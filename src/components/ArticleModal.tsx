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
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-relaxed',
    xl: 'text-2xl leading-relaxed',
  }[fontSize];

  return (
    <div 
      id="modal-article-reader"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        className="bg-[#FAF7EE] text-[#1c1917] w-full max-w-4xl min-h-screen my-auto rounded-none shadow-2xl border-2 border-[#1c1917] flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Sticky Top Reader Controls */}
        <div className="sticky top-0 z-20 bg-[#FAF7EE]/95 backdrop-blur-sm border-b border-[#d6cbaf] px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-sans-ui font-black text-xs text-[#c53030] uppercase tracking-widest">
              {article.category} › {article.subCategory}
            </span>
            <span className="text-[#a8a29e] hidden sm:inline">•</span>
            {/* Font Scaler Controls */}
            <div className="hidden sm:flex items-center space-x-1 border border-[#d6cbaf] rounded bg-[#f0ead8] p-0.5 text-xs font-sans-ui">
              <button
                onClick={() => dispatch(setFontSize('sm'))}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'bg-[#1c1917] text-white' : 'hover:bg-[#e2d7be]'}`}
                title="Tamanho pequeno"
              >
                A-
              </button>
              <button
                onClick={() => dispatch(setFontSize('base'))}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'base' ? 'bg-[#1c1917] text-white' : 'hover:bg-[#e2d7be]'}`}
                title="Tamanho normal"
              >
                A
              </button>
              <button
                onClick={() => dispatch(setFontSize('lg'))}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'bg-[#1c1917] text-white' : 'hover:bg-[#e2d7be]'}`}
                title="Tamanho grande"
              >
                A+
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Reader */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded border transition-colors flex items-center gap-1.5 text-xs font-sans-ui font-medium cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#c53030] text-white border-[#c53030]' 
                  : 'bg-[#f0ead8] hover:bg-[#e2d7be] border-[#d6cbaf] text-[#1c1917]'
              }`}
              title={isPlayingAudio ? 'Pausar leitura em áudio' : 'Ouvir este guia em áudio'}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Guia'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded border border-[#d6cbaf] bg-[#f0ead8] hover:bg-[#e2d7be] text-[#1c1917] cursor-pointer"
              title="Imprimir Guia"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded border border-[#d6cbaf] bg-[#f0ead8] hover:bg-[#e2d7be] text-[#1c1917] flex items-center gap-1 text-xs font-sans-ui cursor-pointer"
              title="Copiar link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => dispatch(toggleBookmark(article.id))}
              className={`p-2 rounded border border-[#d6cbaf] bg-[#f0ead8] hover:bg-[#e2d7be] cursor-pointer ${
                isBookmarked ? 'text-[#c53030]' : 'text-[#1c1917]'
              }`}
              title={isBookmarked ? 'Remover dos salvos' : 'Salvar guia'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#c53030]' : ''}`} />
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
              className="p-2 rounded bg-[#1c1917] hover:bg-[#44403c] text-white transition-colors cursor-pointer"
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ede7d5] border border-[#d6cbaf] text-[#c53030] text-xs font-sans-ui font-bold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Base Legal: {article.legalBasis}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl text-[#1c1917] leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subheading / Excerpt */}
          <p className="font-serif-body text-xl sm:text-2xl text-[#44403c] italic leading-snug mb-6 border-b border-[#d6cbaf] pb-6">
            {article.excerpt}
          </p>

          {/* Author Byline Bar (No Person Photo: "Souza Edy — Especialista em Registros e Procedimentos Cartorários") */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#d6cbaf] mb-8 text-xs font-sans-ui text-[#57534e]">
            <div>
              <p className="font-bold text-sm text-[#1c1917]">
                Souza Edy <span className="font-normal text-[#57534e]">— Especialista em Registros e Procedimentos Cartorários</span>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#78716c]" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#78716c]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Main Hero Photo (Realistic Notary / Document Photo) */}
          {article.imageUrl && (
            <figure className="mb-8">
              <div className="overflow-hidden border border-[#d6cbaf] bg-[#e5dfd0]">
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
                <figcaption className="text-xs font-sans-ui text-[#78716c] italic mt-2 text-center">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Text Paragraphs with Dropcap on first paragraph */}
          <div className={`font-serif-body ${fontSizeClass} space-y-6 text-[#1c1917]`}>
            {article.content.map((paragraph, index) => {
              if (index === 0) {
                const firstChar = paragraph.charAt(0);
                const rest = paragraph.slice(1);
                return (
                  <p key={index} className="first-paragraph">
                    <span className="float-left text-5xl sm:text-6xl font-headline font-black leading-none mr-3 pt-1 text-[#1c1917]">
                      {firstChar}
                    </span>
                    {rest}
                  </p>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Practical Tips Box */}
          {article.practicalTips && article.practicalTips.length > 0 && (
            <div className="my-8 bg-[#f0ead8] border-2 border-[#1c1917] p-5">
              <h4 className="font-headline font-bold text-lg text-[#1c1917] flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#15803d]" />
                Orientações Práticas do Especialista em Cartório
              </h4>
              <ul className="space-y-2 font-serif-body text-base text-[#44403c]">
                {article.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#c53030] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Docs Box */}
          {article.requiredDocs && article.requiredDocs.length > 0 && (
            <div className="my-8 bg-[#eef2e6] border-2 border-[#15803d] p-5">
              <h4 className="font-headline font-bold text-lg text-[#14532d] flex items-center gap-2 mb-3">
                <FileCheck className="w-5 h-5 text-[#15803d]" />
                Documentos Obrigatórios Para o Procedimento
              </h4>
              <ul className="space-y-1.5 font-sans-ui text-sm text-[#166534]">
                {article.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* WhatsApp Direct Help CTA Inside Article */}
          <div className="my-8 p-5 bg-[#e8f8ed] border border-[#25D366] rounded flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-headline font-bold text-lg text-[#14532d]">Precisa de ajuda com este caso?</p>
              <p className="font-sans-ui text-xs text-[#166534]">Fale diretamente com nossa equipe jurídica pelo WhatsApp</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans-ui font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 shadow-sm transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Interactive Clap & Appreciation */}
          <div className="my-10 pt-6 border-t-2 border-b-2 border-[#1c1917] py-6 flex items-center justify-between">
            <div>
              <p className="font-headline font-bold text-lg text-[#1c1917]">Este guia foi útil para você?</p>
              <p className="font-sans-ui text-xs text-[#78716c]">Demonstre seu apoio ao conteúdo do Descomplicando Cartório</p>
            </div>
            <button
              onClick={() => dispatch(clapArticle(article.id))}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1917] hover:bg-[#c53030] text-white font-sans-ui font-bold text-sm rounded shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Útil ({article.claps})</span>
            </button>
          </div>

          {/* Comment Section */}
          <div className="mt-10" id="article-comments-section">
            <h3 className="font-headline font-bold text-2xl text-[#1c1917] mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#c53030]" />
              Dúvidas & Comentários dos Leitores ({articleComments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8 bg-[#f0ead8] p-4 rounded border border-[#d6cbaf]">
              <label htmlFor="article-comment-input" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-2">
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
                className="w-full p-3 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-serif-body text-base text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
              />
              <div className="mt-3 flex items-center justify-between">
                {!isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => dispatch(openAuthModal('login'))}
                    className="text-xs font-sans-ui font-bold text-[#c53030] underline cursor-pointer"
                  >
                    Clique aqui para Entrar
                  </button>
                ) : (
                  <span className="text-xs font-sans-ui text-[#78716c]">Sujeito a moderação prévia</span>
                )}
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1c1917] disabled:opacity-40 hover:bg-[#44403c] text-white font-sans-ui text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar Dúvida
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {articleComments.length === 0 ? (
                <p className="text-sm font-sans-ui text-[#78716c] italic">Seja o primeiro a enviar uma dúvida ou relato neste guia.</p>
              ) : (
                articleComments.map((c) => (
                  <div key={c.id} className="p-4 bg-[#f8f5eb] border border-[#e5dfd0] rounded space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-sans-ui">
                      <span className="font-bold text-[#1c1917]">{c.author}</span>
                      <span className="text-[#78716c]">{c.timestamp}</span>
                    </div>
                    <p className="font-serif-body text-base text-[#292524]">{c.content}</p>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => dispatch(likeComment({ articleId: article.id, commentId: c.id }))}
                        className="text-xs font-sans-ui text-[#78716c] hover:text-[#c53030] flex items-center gap-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3" /> ({c.likes})
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
