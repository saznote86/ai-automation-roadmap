import React from 'react';
import { Star, Heart, ExternalLink, ArrowUp, Instagram, Github } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-base font-bold text-white tracking-tight">
              AI Automation Roadmap — من الصفر لحد أول عميل
            </div>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              تطبيق تفاعلي مبني استناداً إلى خريطة طريق الأتمتة المفتوحة المصدر للمهندس ستيفن أيمن (Co-founder @ Vida AI). ابدأ بتطبيق المشاريع العملية اليوم.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/saznote86/ai-automation-roadmap"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors"
            >
              <Github className="w-4 h-4 text-amber-400" />
              <span>GitHub Repository</span>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 ml-1" />
            </a>

            <a
              href="https://instagram.com/steventawfik"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors"
            >
              <Instagram className="w-4 h-4 text-rose-400" />
              <span>@steventawfik</span>
            </a>

            <button
              onClick={onBackToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-white transition-colors"
              title="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" />
              <span>للأعلى</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            بالتوفيق يا بطل… ابدأ النهارده، مش بكرة. 🚀
          </div>
          <div className="flex items-center gap-2">
            <span>تصميم وتطوير تطبيقة الأتمتة التفاعلية</span>
            <span aria-hidden="true">·</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
