import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Check, 
  Share2, 
  X, 
  ArrowLeft, 
  Zap,
  Flame,
  Star
} from 'lucide-react';

export interface MilestoneData {
  level: number;
  percentage: number;
  badgeTitle: string;
  badgeIcon: string;
  headline: string;
  congratulationMessage: string;
  unlockedPerks: string[];
  motivationalAdvice: string;
}

export const MILESTONES: Record<number, MilestoneData> = {
  25: {
    level: 1,
    percentage: 25,
    badgeTitle: 'مستكشف الويب والـ APIs',
    badgeIcon: '🌐',
    headline: 'Level Up! ارتقيت للمستوى 1 🚀',
    congratulationMessage: 'بداية مذهلة وقوية! لقد أتقنت المفاهيم الأساسية التي يتجاهلها 90% من المبتدئين (API, HTTP, Webhooks, JSON).',
    unlockedPerks: [
      'فهم طريقة اتصال التطبيقات وتبادل البيانات لحظياً',
      'القدرة على فحص ومعالجة أخطاء الـ APIs بمفردك',
      'تجهيز أول مسار عمل في n8n بثقة وبدون تخبط'
    ],
    motivationalAdvice: 'أنت الآن متفوق على من يبدأ بـ Copy/Paste دون فهم. استمر في بناء مشاريع المرحلة 1 بأيديك!'
  },
  50: {
    level: 2,
    percentage: 50,
    badgeTitle: 'مهندس مسارات n8n الذكية',
    badgeIcon: '⚡',
    headline: 'Level Up! منتصف الطريق بنجاح (المستوى 2) 🔥',
    congratulationMessage: 'نصف خريطة الطريق أصبحت خلفك! أنت الآن قادر على بناء وتطوير مسارات n8n المعقدة، وربط نماذج الذكاء الاصطناعي وهندسة الأوامر (System Prompts).',
    unlockedPerks: [
      'تصميم وكلاء أذكياء (AI Agents) بأدوات وذاكرة تفاعلية',
      'استخراج بيانات JSON نظيفة ومنظمة تلقائياً',
      'حماية الأنظمة بنظام استعادة الأخطاء (Retry on Fail)'
    ],
    motivationalAdvice: 'نصف المسافة تم إنجازها! المرحلة القادمة هي الداتابيز والـ RAG — هنا يبدأ الفرق بين الهواة والمحترفين.'
  },
  75: {
    level: 3,
    percentage: 75,
    badgeTitle: 'سيد الـ RAG وقنوات واتساب',
    badgeIcon: '🧠',
    headline: 'Level Up! مرحلة النخبة (المستوى 3) 💎',
    congratulationMessage: 'إنجاز استثنائي! وصلت إلى عصب الأتمتة الأكثر طلباً في السوق: بناء قواعد معرفة RAG مانعة للهلوسة والربط بقنوات واتساب وإنستجرام.',
    unlockedPerks: [
      'بناء شات بوت يجيب من ملفات العميل ولوائحه بدقة 100%',
      'الربط بقنوات WhatsApp Cloud API و Meta Graph API',
      'معالجة الرسائل الصوتية والصور تلقائياً بنظام Human Handoff'
    ],
    motivationalAdvice: 'المهارة التقنية أصبحت مكتملة في يدك. خطوتك التالية هي الاستضافة المستقلة ثم إغلاق أول عميل يدفع لك!'
  },
  100: {
    level: 4,
    percentage: 100,
    badgeTitle: 'مستشار أتمتة معتمد وقناص صفقات',
    badgeIcon: '🏆',
    headline: 'ألف مبروك! أتممت الـ Roadmap بالكامل 👑',
    congratulationMessage: 'لقد صنعت المستحيل! أنهيت خريطة طريق الـ AI Automation من الصفر حتى البيع، وأصبحت جاهزاً لتقديم خدماتك للشركات بعقود Setup Fee + Retainer شهري مستقر.',
    unlockedPerks: [
      'إدارة مكالمات الاستكشاف (Discovery Calls) وحساب الـ ROI',
      'تقديم مقترحات سعرية احترافية بـ 3 باقات متكاملة',
      'بناء بيزنس متكرر الدخل يدر آلاف الدولارات شهرياً'
    ],
    motivationalAdvice: 'الآن دور الميدان: لا تنتظر يوماً إضافياً! ابدأ فوراً بالتواصل مع أول 10 عملاء مستهدفين وأغلق صفقتك الأولى.'
  }
};

interface LevelUpModalProps {
  milestone: MilestoneData;
  onClose: () => void;
  onExploreNext: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  milestone,
  onClose,
  onExploreNext
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    const text = `🎉 حققت إنجازاً جديداً في خريطة طريق الـ AI Automation!\n🏆 المستوى ${milestone.level}: ${milestone.badgeTitle}\n🚀 نسبة الإنجاز: ${milestone.percentage}%\nأتعلّم بناء أنظمة n8n، والـ RAG، وإغلاق أول عميل من الصفر حتى السوق.`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient circle */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Badge Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center text-3xl shadow-xl shadow-amber-950/50 ring-4 ring-amber-400/20 animate-bounce">
            {milestone.badgeIcon}
          </div>
          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-slate-950 border border-amber-400 text-[11px] font-mono font-bold text-amber-300">
            {milestone.percentage}% مكتمل
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>ترقية رتبة جديدة</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {milestone.headline}
          </h2>
          <div className="text-sm font-semibold text-amber-300">
            رتبتك الحالية: {milestone.badgeTitle}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto pt-1 font-normal">
            {milestone.congratulationMessage}
          </p>
        </div>

        {/* Unlocked Perks Card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-right space-y-2.5">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            ما اكتسبته في هذا المستوى:
          </span>
          <ul className="text-xs text-slate-300 space-y-1.5">
            {milestone.unlockedPerks.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Motivational Quote */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 text-center leading-relaxed">
          💬 <strong>نصيحة للمرحلة القادمة:</strong> {milestone.motivationalAdvice}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onExploreNext();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-xl shadow-lg shadow-amber-950/40"
          >
            <span>استمر في رحلة التعلّم 🚀</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors rounded-xl border border-slate-700 shrink-0"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>مشاركة الإنجاز</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const GamificationToast: React.FC<{
  title: string;
  message: string;
  onDismiss: () => void;
  onViewDetails?: () => void;
}> = ({ title, message, onDismiss, onViewDetails }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-slate-900 border border-amber-500/50 p-4 shadow-2xl animate-in slide-in-from-bottom duration-300 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
        ⚡
      </div>
      <div className="flex-1 min-w-0 text-right">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
          <span>{title}</span>
        </h4>
        <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed line-clamp-2">
          {message}
        </p>
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="mt-2 text-[11px] font-bold text-amber-400 hover:underline"
          >
            عرض تفاصيل الترقية ←
          </button>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-500 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
