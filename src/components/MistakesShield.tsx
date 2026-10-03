import React from 'react';
import { COMMON_MISTAKES } from '../data/roadmapData';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

export const MistakesShield: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>درع الحماية: 6 غلطات قاتلة متقعش فيها ⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          تجنب الأخطاء التي تضيّع شهوراً من وقتك وتخسرك العملاء
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          معظم المبتدئين في الأتمتة يقعون في هذه الفخاخ. اقرأ الحل العملي لكل غلطة وطبقه من اليوم الأول.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMMON_MISTAKES.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>غلطة #{item.id}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-relaxed">
                {item.mistake}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-rose-300 font-medium">الخطر:</span> {item.whyItHurts}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                الحل العملي (The Fix):
              </span>
              <p className="leading-relaxed">
                {item.theFix}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
