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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div 
        className="bg-white text-slate-900 w-full max-w-md border-2 border-slate-900 rounded-lg p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Masthead Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-red-600 mb-1">
            <Scale className="w-4 h-4" />
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest">PORTAL JURÍDICO</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 leading-none mb-1">
            DESCOMPLICANDO CARTÓRIO
          </h2>
          <p className="font-heading text-xs font-bold uppercase tracking-widest text-red-600">
            {authModalMode === 'login' ? 'Área de Membros & Especialistas' : 'Cadastro de Novo Leitor'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-body flex items-center gap-2 rounded">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label htmlFor="auth-name-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-md font-body text-base text-slate-900 focus:outline-hidden focus:border-slate-900"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Endereço de E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-md font-body text-base text-slate-900 focus:outline-hidden focus:border-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-md font-body text-base text-slate-900 focus:outline-hidden focus:border-slate-900"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-slate-900 hover:bg-red-600 text-white font-heading font-bold text-xs uppercase tracking-widest rounded-md shadow-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Autenticando...' : authModalMode === 'login' ? 'Entrar no Sistema' : 'Concluir Cadastro'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-4 text-center">
          <button
            onClick={() => dispatch(toggleAuthModalMode())}
            className="text-xs font-body text-slate-600 hover:text-red-600 underline cursor-pointer"
          >
            {authModalMode === 'login'
              ? 'Não possui conta? Cadastre-se gratuitamente.'
              : 'Já tem conta? Faça login.'}
          </button>
        </div>

        {/* Fast Demo Profiles for Quick Testing */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 mb-2 text-center">
            Perfis de Demonstração Rápida:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFastDemoLogin('registrador')}
              className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-semibold rounded text-slate-900 border border-slate-300 transition-colors cursor-pointer"
            >
              🏛️ Souza Edy
            </button>
            <button
              onClick={() => handleFastDemoLogin('consultor')}
              className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-semibold rounded text-slate-900 border border-slate-300 transition-colors cursor-pointer"
            >
              ⚖️ Consultoria
            </button>
            <button
              onClick={() => handleFastDemoLogin('reader')}
              className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-semibold rounded text-slate-900 border border-slate-300 transition-colors cursor-pointer"
            >
              📖 Leitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
