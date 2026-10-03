import React from 'react';
import { Phase } from '../types';
import { Clock, CheckCircle2, CircleDot, ArrowLeft, BookOpen } from 'lucide-react';

interface RoadmapTimelineProps {
  phases: Phase[];
  currentPhaseId: number;
  onSelectPhase: (phaseId: number) => void;
  completedTopics: Set<string>;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  phases,
  currentPhaseId,
  onSelectPhase,
  completedTopics
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            مسار التعلّم الكامل (7 محطات)
          </h2>
          <p className="text-xs text-slate-400">
            اضغط على أي مرحلة لاستعراض مفاهيمها وأكوادها ومشاريعها
          </p>
        </div>
        <div className="text-xs text-slate-400">
          المدة الإجمالية: <strong className="text-amber-400 font-mono">3 - 4 شهور</strong>
        </div>
      </div>

      {/* Grid of Phase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {phases.map((phase) => {
          const isSelected = phase.id === currentPhaseId;
          const completedInPhase = phase.topics.filter(t => completedTopics.has(t.id)).length;
          const totalInPhase = phase.topics.length;
          const isDone = completedInPhase === totalInPhase && totalInPhase > 0;
          const progressPercent = Math.round((completedInPhase / totalInPhase) * 100);

          return (
            <button
              key={phase.id}
              onClick={() => onSelectPhase(phase.id)}
              className={`text-right p-4 rounded-xl border transition-all flex flex-col justify-between h-full group ${
                isSelected
                  ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-950/20 ring-1 ring-amber-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="space-y-2.5 w-full">
                {/* Meta line */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                    {phase.number}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{phase.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {phase.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {phase.summary}
                </p>
              </div>

              {/* Progress Footer */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 w-full flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <CircleDot className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  )}
                  <span className={isDone ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                    {completedInPhase}/{totalInPhase} دروس
                  </span>
                </div>

                <span className="font-mono text-slate-500 font-medium">
                  {progressPercent}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
