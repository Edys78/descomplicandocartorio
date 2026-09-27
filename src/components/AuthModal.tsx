import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeAuthModal, toggleAuthModalMode } from '../store/slices/uiSlice';
import { authSuccess, authFailure, startAuthAction } from '../store/slices/authSlice';
import { User } from '../types';

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, authModalMode } = useAppSelector((state) => state.ui);
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startAuthAction());

    if (!email || !password || (authModalMode === 'register' && !name)) {
      dispatch(authFailure('Por favor, preencha todos os campos obrigatórios.'));
      return;
    }

    // Simulate secure backend response with JWT token
    setTimeout(() => {
      const mockUser: User = {
        id: `usr_${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        role: email.includes('registrador') ? 'registrador' : 'subscriber',
        token: `jwt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
        bookmarkedArticleIds: [],
        joinedDate: new Date().toISOString().split('T')[0],
      };
      dispatch(authSuccess(mockUser));
      dispatch(closeAuthModal());
    }, 400);
  };

  // Fast Demo Login handler
  const handleFastDemoLogin = (role: 'registrador' | 'consultor' | 'reader') => {
    dispatch(startAuthAction());
    setTimeout(() => {
      const profiles: Record<string, User> = {
        registrador: {
          id: 'demo_registrador_01',
          name: 'Souza Edy',
          email: 'souza.edy@descomplicandocartorio.com.br',
          role: 'registrador',
          token: 'jwt_secure_auth_registrador_role_key',
          bookmarkedArticleIds: ['art-destaque-01'],
          joinedDate: '2024-01-15',
        },
        consultor: {
          id: 'demo_consultor_01',
          name: 'Consultoria Especializada',
          email: 'consultoria@descomplicandocartorio.com.br',
          role: 'consultor',
          token: 'jwt_secure_auth_consultor_role_key',
          bookmarkedArticleIds: ['curiosidade-o-que-e'],
          joinedDate: '2025-06-20',
        },
        reader: {
          id: 'demo_reader_01',
          name: 'Gabriel Martins',
          email: 'gabriel.leitor@gmail.com',
          role: 'reader',
          token: 'jwt_secure_auth_reader_role_key',
          bookmarkedArticleIds: [],
          joinedDate: '2026-03-01',
        },
      };

      dispatch(authSuccess(profiles[role]));
      dispatch(closeAuthModal());
    }, 250);
  };

  return (
    <div 
      id="modal-authentication"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div 
        className="bg-[#FAF7EE] text-[#1c1917] w-full max-w-md border-2 border-[#1c1917] p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-4 right-4 p-1.5 text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede7d5] rounded transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Masthead Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-[#c53030] mb-1">
            <Scale className="w-4 h-4" />
            <span className="text-[10px] font-sans-ui font-black uppercase tracking-widest">PORTAL JURÍDICO</span>
          </div>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-[#1c1917] leading-none mb-1">
            DESCOMPLICANDO CARTÓRIO
          </h2>
          <p className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#c53030]">
            {authModalMode === 'login' ? 'Área de Membros & Especialistas' : 'Cadastro de Novo Leitor'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-sans-ui flex items-center gap-2 rounded">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label htmlFor="auth-name-input" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#78716c] absolute left-3 top-3" />
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email-input" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
              Endereço de E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#78716c] absolute left-3 top-3" />
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password-input" className="block text-xs font-sans-ui font-bold uppercase tracking-wider text-[#57534e] mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#78716c] absolute left-3 top-3" />
              <input
                id="auth-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7EE] border border-[#d6cbaf] rounded font-sans-ui text-sm text-[#1c1917] focus:outline-hidden focus:border-[#1c1917]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1c1917] hover:bg-[#c53030] text-white font-sans-ui font-bold text-xs uppercase tracking-widest rounded shadow-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Autenticando...' : authModalMode === 'login' ? 'Entrar no Sistema' : 'Concluir Cadastro'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-4 text-center">
          <button
            onClick={() => dispatch(toggleAuthModalMode())}
            className="text-xs font-sans-ui text-[#57534e] hover:text-[#c53030] underline cursor-pointer"
          >
            {authModalMode === 'login'
              ? 'Não possui conta? Cadastre-se gratuitamente.'
              : 'Já tem conta? Faça login.'}
          </button>
        </div>

        {/* Fast Demo Profiles for Quick Testing */}
        <div className="mt-6 pt-5 border-t border-[#d6cbaf]">
          <p className="text-[11px] font-sans-ui font-bold uppercase tracking-wider text-[#78716c] mb-2 text-center">
            Perfis de Demonstração Rápida:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFastDemoLogin('registrador')}
              className="px-2 py-1.5 bg-[#e8e1cf] hover:bg-[#ded5be] text-[11px] font-sans-ui font-semibold rounded text-[#1c1917] border border-[#d6cbaf] transition-colors cursor-pointer"
            >
              🏛️ Souza Edy
            </button>
            <button
              onClick={() => handleFastDemoLogin('consultor')}
              className="px-2 py-1.5 bg-[#e8e1cf] hover:bg-[#ded5be] text-[11px] font-sans-ui font-semibold rounded text-[#1c1917] border border-[#d6cbaf] transition-colors cursor-pointer"
            >
              ⚖️ Consultoria
            </button>
            <button
              onClick={() => handleFastDemoLogin('reader')}
              className="px-2 py-1.5 bg-[#e8e1cf] hover:bg-[#ded5be] text-[11px] font-sans-ui font-semibold rounded text-[#1c1917] border border-[#d6cbaf] transition-colors cursor-pointer"
            >
              📖 Leitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
