import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Clock, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoProcedimento: 'Retificação de Nascimento',
    cidadeCartorio: '',
    mensagem: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappUrl = "https://wa.me/5511956870620?text=Ol%C3%A1!%20Em%20que%20posso%20te%20ajudar%3F";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div id="contact-view" className="py-8 space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-[#1c1917] pb-4 text-center sm:text-left">
        <span className="text-[#c53030] font-sans-ui font-black text-xs uppercase tracking-widest">
          FALE CONOSCO & CONSULTORIA ESPECIALIZADA
        </span>
        <h2 className="font-headline font-black text-3xl sm:text-5xl text-[#1c1917] mt-1">
          Contato & Análise de Documentos
        </h2>
        <p className="font-serif-body text-base sm:text-lg text-[#57534e] mt-2 max-w-3xl">
          Envie suas dúvidas sobre retificação de certidões, alteração de nome, patronímico ou procedimentos extrajudiciais de Registro Civil.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct info & WhatsApp box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#f0ead8] p-6 border border-[#d6cbaf] space-y-6">
            <h3 className="font-headline font-bold text-2xl text-[#1c1917]">Canais de Atendimento</h3>

            <div className="space-y-4 text-sm font-sans-ui text-[#44403c]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c53030] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1c1917]">Consultoria & Redação</p>
                  <p>Av. Paulista, 1000 - Bela Vista</p>
                  <p>São Paulo - SP, CEP 01310-100</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c53030] shrink-0" />
                <div>
                  <p className="font-bold text-[#1c1917]">E-mail Oficial</p>
                  <p>contato@descomplicandocartorio.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c53030] shrink-0" />
                <div>
                  <p className="font-bold text-[#1c1917]">Telefone / WhatsApp</p>
                  <p>+55 (11) 95687-0620</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#c53030] shrink-0" />
                <div>
                  <p className="font-bold text-[#1c1917]">Horário de Atendimento</p>
                  <p>Segunda a Sexta: 08:30 às 18:00</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-[#d6cbaf]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans-ui font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Atendimento Imediato no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#f8f5eb] p-6 sm:p-8 border border-[#d6cbaf]">
          <h3 className="font-headline font-bold text-2xl text-[#1c1917] mb-2">Formulário de Contato</h3>
          <p className="font-serif-body text-sm text-[#57534e] mb-6">
            Preencha os campos abaixo com os dados do seu procedimento para receber orientação precisa.
          </p>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-headline font-bold text-xl text-emerald-950">Mensagem Enviada com Sucesso!</h4>
              <p className="font-serif-body text-emerald-900 text-sm">
                Recebemos suas informações. Nossa equipe de especialistas em Registro Civil retornará seu contato em até 24 horas úteis.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    tipoProcedimento: 'Retificação de Nascimento',
                    cidadeCartorio: '',
                    mensagem: '',
                  });
                }}
                className="mt-3 px-4 py-2 bg-[#1c1917] text-white text-xs font-sans-ui font-bold rounded"
              >
                Enviar Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                  Nome Completo *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Maria Aparecida da Silva"
                  className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                    E-mail de Contato *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@exemplo.com"
                    className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-procedure-type" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                    Tipo de Procedimento *
                  </label>
                  <select
                    id="contact-procedure-type"
                    value={formData.tipoProcedimento}
                    onChange={(e) => setFormData({ ...formData, tipoProcedimento: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                  >
                    <option value="Retificação de Nascimento">Retificação de Nascimento</option>
                    <option value="Retificação de Casamento">Retificação de Casamento</option>
                    <option value="Retificação de Óbito">Retificação de Óbito</option>
                    <option value="Alteração de Prenome">Alteração de Prenome (Lei 14.382)</option>
                    <option value="Alteração de Nome e Gênero">Alteração de Nome e Gênero (Prov. 73)</option>
                    <option value="Alteração de Patronímico">Alteração de Patronímico (Sobrenome)</option>
                    <option value="Outra Dúvida de Registro Civil">Outra Dúvida de Registro Civil</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-registry-city" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                    Cidade do Cartório (Onde foi lavrado)
                  </label>
                  <input
                    id="contact-registry-city"
                    type="text"
                    value={formData.cidadeCartorio}
                    onChange={(e) => setFormData({ ...formData, cidadeCartorio: e.target.value })}
                    placeholder="Ex: Santos/SP ou Rio de Janeiro/RJ"
                    className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-details-message" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                  Detalhes do Caso ou Dúvida *
                </label>
                <textarea
                  id="contact-details-message"
                  rows={4}
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Explique resumidamente qual o erro na certidão ou qual alteração deseja realizar..."
                  className="w-full p-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-serif-body text-base text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1c1917] hover:bg-[#c53030] text-white font-sans-ui font-bold text-xs uppercase tracking-widest rounded shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Formulário para Análise'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
