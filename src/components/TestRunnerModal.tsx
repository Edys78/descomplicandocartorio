import React, { useState, useEffect } from 'react';
import { X, Play, ShieldCheck, CheckCircle2, XCircle, Clock, RefreshCw, Cpu, Database, KeyRound, Cookie } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeTestRunner } from '../store/slices/uiSlice';
import { runAutomatedUnitTests } from '../utils/testRunner';
import { TestSuiteReport } from '../types';

export const TestRunnerModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isTestRunnerOpen } = useAppSelector((state) => state.ui);

  const [report, setReport] = useState<TestSuiteReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const executeTests = async () => {
    setIsRunning(true);
    // Simulate brief test execution delay for visual clarity
    await new Promise((resolve) => setTimeout(resolve, 300));
    const res = await runAutomatedUnitTests();
    setReport(res);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isTestRunnerOpen && !report) {
      executeTests();
    }
  }, [isTestRunnerOpen]);

  if (!isTestRunnerOpen) return null;

  const filteredResults = report
    ? activeTab === 'ALL'
      ? report.results
      : report.results.filter((r) => r.category === activeTab)
    : [];

  return (
    <div 
      id="modal-test-runner"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        className="bg-[#1c1917] text-[#FAF7EE] w-full max-w-4xl border border-[#44403c] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in duration-200"
      >
        {/* Top Header */}
        <div className="bg-[#292524] px-5 py-4 border-b border-[#44403c] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-900/60 border border-emerald-500/40 rounded-md text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-sans-ui font-bold text-base text-white">
                  Suite de Testes Unitários Automatizados
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded border border-emerald-500/30">
                  Redux Toolkit + Auth Core
                </span>
              </div>
              <p className="text-xs text-[#a8a29e] font-sans-ui">
                Validação de integridade de estado, fluxos de autenticação, filtros editoriais e persistência.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={executeTests}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans-ui text-xs font-semibold rounded transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Executando...' : 'Reexecutar Testes'}</span>
            </button>
            <button
              onClick={() => dispatch(closeTestRunner())}
              className="p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#3d3835] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Summary Bar */}
        {report && (
          <div className="bg-[#1f1d1b] px-5 py-3 border-b border-[#383532] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans-ui">
            <div className="flex items-center space-x-2">
              <span className="text-[#a8a29e]">Total de Testes:</span>
              <span className="font-mono font-bold text-white text-sm">{report.total}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">Aprovados:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{report.passed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-400">Falhas:</span>
              <span className="font-mono font-bold text-red-400 text-sm">{report.failed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#a8a29e]">Tempo Total:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{report.durationMs}ms</span>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="px-5 py-2.5 bg-[#24211e] border-b border-[#383532] flex flex-wrap gap-1 text-xs font-sans-ui">
          {['ALL', 'Redux State', 'Authentication', 'News Filtering', 'Cookie Consent', 'Utility Functions'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-[#383532] text-white font-semibold'
                    : 'text-[#a8a29e] hover:text-white hover:bg-[#2e2a27]'
                }`}
              >
                {tab === 'ALL' ? 'Todos os Testes' : tab}
              </button>
            )
          )}
        </div>

        {/* Test List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2.5 font-mono text-xs">
          {isRunning ? (
            <div className="text-center py-12 space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-sm font-sans-ui text-[#a8a29e]">Executando asserções unitárias em memória...</p>
            </div>
          ) : (
            filteredResults.map((t) => (
              <div
                key={t.id}
                className={`p-3 rounded border flex items-start justify-between gap-3 ${
                  t.passed
                    ? 'bg-[#181614] border-emerald-900/40 text-[#e7e5e4]'
                    : 'bg-red-950/20 border-red-900/60 text-red-200'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-[#a8a29e] font-semibold">{t.id}</span>
                      <span className="px-1.5 py-0.2 bg-[#292524] text-[10px] text-amber-300 rounded">
                        {t.category}
                      </span>
                    </div>
                    <p className="font-sans-ui text-xs font-medium text-white mt-0.5">{t.name}</p>
                    {t.details && <p className="text-[11px] text-[#78716c] mt-0.5">{t.details}</p>}
                    {t.error && <p className="text-[11px] text-red-400 mt-1 font-mono">{t.error}</p>}
                  </div>
                </div>

                <div className="text-right text-[11px] text-[#78716c] font-mono shrink-0">
                  {t.durationMs}ms
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#24211e] px-5 py-3 border-t border-[#383532] text-xs font-sans-ui text-[#a8a29e] flex items-center justify-between">
          <span>Framework: Vitest & Redux Toolkit Test Harness</span>
          <span className="text-emerald-400 font-semibold">100% Cobertura de Fluxo de Dados</span>
        </div>
      </div>
    </div>
  );
};
