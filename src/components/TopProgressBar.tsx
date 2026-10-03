import React from 'react';
import { Trophy, CheckCircle2, Flame, ArrowLeft, Sparkles, Target } from 'lucide-react';

interface TopProgressBarProps {
  completedTopicsCount: number;
  totalTopicsCount: number;
  completedProjectsCount: number;
  totalProjectsCount: number;
  currentLevelTitle: string;
  currentLevelBadgeIcon: string;
  onOpenLevelModal: () => void;
  onJumpToCurrentPhase: () => void;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({
  completedTopicsCount,
  totalTopicsCount,
  completedProjectsCount,
  totalProjectsCount,
  currentLevelTitle,
  currentLevelBadgeIcon,
  onOpenLevelModal,
  onJumpToCurrentPhase
}) => {
  const progressPercent = Math.round((completedTopicsCount / Math.max(1, totalTopicsCount)) * 100);
  const remainingLessons = totalTopicsCount - completedTopicsCount;

  return (
    <div className="w-full bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-md sticky top-16 z-40 transition-all">
      {/* Visual Glowing Line at Top Edge */}
      <div className="w-full h-1 bg-slate-900 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Left/Right Text Details */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="text-amber-400 font-mono text-sm tabular-nums">{progressPercent}%</span>
            <span>نسبة إنجاز الخريطة</span>
          </div>

          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>

          <div className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white font-mono tabular-nums">{completedTopicsCount}</strong> من {totalTopicsCount} درس
            </span>
          </div>

          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>

          <div className="flex items-center gap-1 text-slate-400">
            <Target className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>
              <strong className="text-white font-mono tabular-nums">{completedProjectsCount}</strong> من {totalProjectsCount} مشاريع عملية
            </span>
          </div>

          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>

          <span className="text-slate-400 hidden md:inline">
            {remainingLessons > 0 ? (
              <span>متبقي <strong className="text-amber-300 font-mono tabular-nums">{remainingLessons}</strong> درس للوصول للهدف</span>
            ) : (
              <span className="text-emerald-400 font-bold">🎉 أتممت المسار بالكامل!</span>
            )}
          </span>
        </div>

        {/* Action button & Level badge */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenLevelModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-slate-200 transition-colors cursor-pointer"
            title="عرض تفاصيل المستوى الحالي والمكافآت"
          >
            <span>{currentLevelBadgeIcon}</span>
            <span className="font-semibold text-amber-300">{currentLevelTitle}</span>
          </button>

          <button
            onClick={onJumpToCurrentPhase}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-colors"
          >
            <span>متابعة التعلّم</span>
            <ArrowLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
