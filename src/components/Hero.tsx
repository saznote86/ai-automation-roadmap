import React from 'react';
import { ArrowLeft, Play, Sparkles, CheckCircle2, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import heroImage from '../assets/images/hero_ai_automation_roadmap_1791041571773.jpg';

interface HeroProps {
  onStartLearning: () => void;
  onOpenSimulator: () => void;
  completedCount: number;
  totalTopics: number;
}

export const Hero: React.FC<HeroProps> = ({
  onStartLearning,
  onOpenSimulator,
  completedCount,
  totalTopics
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-amber-400 font-semibold">خريطة طريق عملية 2026</span>
              <span aria-hidden="true">·</span>
              <span>مبنية على تجربة سوق حقيقية</span>
              <span aria-hidden="true">·</span>
              <span>من الصفر حتى أول عميل يدفع لك</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] text-balance">
              احترف الـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">AI Automation</span> وحوّله لبيزنس بيجيب فلوس 🚀
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              الـ Automation مش أدوات… الـ Automation حل مشاكل حقيقية بتوفر وقت وتجيب مبيعات لأصحاب الشركات.
              هذا التطبيق التفاعلي يأخذك خطوة بخطوة من إتقان الـ Webhooks و n8n وقواعد بيانات RAG وحتى المكالمة التي تغلق بها أول عقد شهري.
            </p>

            {/* Author Attribution & Philosophy */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-sm shrink-0">
                  SA
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    ستيفن أيمن — Co-founder @ Vida AI
                  </div>
                  <div className="text-slate-400">
                    أتمتة مبيعات وخدمة عملاء حقيقية في السوق العربي
                  </div>
                </div>
              </div>
              <a 
                href="https://instagram.com/steventawfik" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium self-start sm:self-auto"
              >
                <span>تابع على إنستجرام</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartLearning}
                className="flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all rounded-xl shadow-lg shadow-amber-950/30"
              >
                <span>ابدأ رحلة التعلّم الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSimulator}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white transition-all rounded-xl border border-slate-700"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>جرب محاكي n8n التفاعلي</span>
              </button>
            </div>

            {/* Quick Proof Metrics */}
            <div className="pt-4 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-right">
              <div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">7 مراحل</div>
                <div className="text-xs text-slate-400">من الأساسيات للبيع</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">10 مشاريع</div>
                <div className="text-xs text-slate-400">لبناء بورتفوليو قوي</div>
              </div>
              <div>
                <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">3 - 4 شهور</div>
                <div className="text-xs text-slate-400">بمعدل 2-3 ساعات يومياً</div>
              </div>
              <div>
                <div className="text-xl font-bold text-sky-400 font-mono tabular-nums">{completedCount}/{totalTopics}</div>
                <div className="text-xs text-slate-400">المفاهيم المكتملة</div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={heroImage}
                alt="AI Automation Architecture Blueprint"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1.5">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    المعادلة الذهبية للاستقرار المالي
                  </span>
                  <span className="font-mono text-slate-400">B2B Retainer</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Setup Fee (دفعة أولى)</strong> لتأسيس النظام + <strong className="text-emerald-400">Retainer شهري</strong> للصيانة والاستضافة هو ما يبني بيزنس حقيقي مستقر.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
