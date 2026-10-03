import React from 'react';
import { Layers, Sparkles, CheckCircle2, Calculator, BookOpen, Globe } from 'lucide-react';
import { LANGUAGE_META, Language, useI18n } from '../i18n';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedTopicsCount: number;
  totalTopicsCount: number;
  onOpenLevelModal?: () => void;
  currentLevelTitle?: string;
  currentLevelBadgeIcon?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedTopicsCount,
  totalTopicsCount,
  onOpenLevelModal,
  currentLevelTitle = 'مستكشف الويب',
  currentLevelBadgeIcon = '🌱'
}) => {
  const { language, setLanguage, t } = useI18n();
  const progressPercent = Math.round((completedTopicsCount / Math.max(1, totalTopicsCount)) * 100);
  const languages: Language[] = ['ar', 'fr', 'en'];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
            <Layers className="w-5 h-5 stroke-[2.5]" />
          </div>
          <button 
            onClick={() => setActiveTab('roadmap')}
            className="text-right group focus:outline-none"
          >
            <div className="text-base font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              خريطة الـ AI Automation
            </div>
            <div className="text-xs text-slate-400 font-medium">
              من الصفر لحد أول عميل
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'roadmap' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            المراحل التعليمية
          </button>
          <button
            onClick={() => setActiveTab('n8n-simulator')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'n8n-simulator' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            محاكي n8n
          </button>
          <button
            onClick={() => setActiveTab('rag-simulator')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'rag-simulator' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            معمل الـ RAG
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'projects' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            10 مشاريع عملية
          </button>
          <button
            onClick={() => setActiveTab('roi-calculator')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'roi-calculator' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            حاسبة العائد والتسعير
          </button>
          <button
            onClick={() => setActiveTab('pitch-deck')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'pitch-deck' ? 'text-amber-400 bg-slate-800/80' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            إغلاق العملاء
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'performance' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            لوحة الإنجاز 📈
          </button>
        </nav>

        {/* Zone 3: Actions & Progress */}
        <div className="flex items-center gap-2.5">
          {/* Language selector */}
          <label className="relative flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 transition-colors hover:border-amber-400/50 hover:text-white">
            <Globe className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span className="sr-only">{t('language')}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label={t('language')}
              className="cursor-pointer appearance-none bg-transparent pr-4 font-semibold outline-none"
            >
              {languages.map((code) => (
                <option key={code} value={code} className="bg-slate-900 text-white">
                  {LANGUAGE_META[code].nativeLabel}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 text-[10px] text-slate-400">⌄</span>
          </label>

          {/* Gamification Level Badge Button */}
          <button
            onClick={onOpenLevelModal}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/50 rounded-lg text-xs transition-colors group cursor-pointer"
            title="عرض مستوى التقدم والرتبة الحالية"
          >
            <span className="text-sm">{currentLevelBadgeIcon}</span>
            <span className="hidden sm:inline font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
              {currentLevelTitle}
            </span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">
              {progressPercent}%
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('roi-calculator')}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">احسب تسعير أول عميل</span>
            <span className="sm:hidden">التسعير</span>
          </button>
        </div>
      </div>

      {/* Mobile Bar Navigation */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-800/60 bg-slate-900/60 text-xs text-slate-300">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'roadmap' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          المراحل
        </button>
        <button
          onClick={() => setActiveTab('n8n-simulator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'n8n-simulator' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          محاكي n8n
        </button>
        <button
          onClick={() => setActiveTab('rag-simulator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'rag-simulator' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          معمل RAG
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'projects' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          10 مشاريع
        </button>
        <button
          onClick={() => setActiveTab('roi-calculator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'roi-calculator' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          حاسبة ROI
        </button>
        <button
          onClick={() => setActiveTab('pitch-deck')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'pitch-deck' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          إغلاق العملاء
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'performance' ? 'text-amber-400 bg-slate-800' : ''}`}
        >
          لوحة الإنجاز 📈
        </button>
      </div>
    </header>
  );
};
