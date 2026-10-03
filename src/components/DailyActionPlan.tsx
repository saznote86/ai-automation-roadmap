import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Calendar, 
  Flame, 
  Sparkles, 
  Clock, 
  Target, 
  Check, 
  RotateCcw,
  Zap,
  Sun,
  Share2,
  RefreshCw,
  Quote
} from 'lucide-react';

export interface DailyTask {
  id: string;
  text: string;
  completed: boolean;
  estimatedMinutes?: number;
  phaseTag?: string;
  createdAt: string;
}

export interface MorningInsight {
  id: number;
  quote: string;
  authorNote: string;
  topic: string;
}

const MORNING_INSIGHTS: MorningInsight[] = [
  {
    id: 1,
    quote: 'الـ Automation مش أدوات… الـ Automation حل مشاكل حقيقية بتوفر وقت وتجيب فلوس لأصحاب الشركات.',
    authorNote: 'ستيفن أيمن — Co-founder @ Vida AI',
    topic: 'عقلية الأتمتة'
  },
  {
    id: 2,
    quote: 'قاعدة 1:2 الذهبية: كل ساعة مشاهدة لكورس لازم يقابلها ساعتان بناء وتطبيق عملي بأيديك في n8n.',
    authorNote: 'خريطة الطريق العملية',
    topic: 'التطبيق المباشر'
  },
  {
    id: 3,
    quote: 'العميل مش هيشتري منك "n8n workflow"، هيشتري "الرد على استفسارات المبيعات في 8 ثوانٍ بدل ساعتين".',
    authorNote: 'أسرار إغلاق الصفقات',
    topic: 'لغة البيزنس'
  },
  {
    id: 4,
    quote: 'متحاولش تتعلم كل الأدوات كل أسبوع. n8n + Supabase + موديل ذكاء اصطناعي واحد يكفوك لتبني وكالة ناجحة.',
    authorNote: 'الـ Core Stack',
    topic: 'قوة التركيز'
  },
  {
    id: 5,
    quote: 'الـ Retainer الشهري (صيانة واستضافة وتطوير) هو ما يبني بيزنس حقيقي مستقر يدر آلاف الدولارات كل شهر.',
    authorNote: 'استراتيجية التسعير',
    topic: 'الاستقرار المالي'
  },
  {
    id: 6,
    quote: 'أقوى حارس لثقة العميل فيك هو الـ RAG المنضبط: إذا المعلومة غير موجودة في المستند، قول بلباقة مش عارف وحوّل لموظف.',
    authorNote: 'مانع الهلوسة الصارم',
    topic: 'هندسة الـ RAG'
  },
  {
    id: 7,
    quote: 'في مكالمة الاستكشاف (Discovery Call): اسمع 80% وتكلم 20%، واسأل عن الوقت والفلوس الضائعة قبل أن تتحدث عن الحل.',
    authorNote: 'فنون المبيعات الاستشارية',
    topic: 'مكالمة الاستكشاف'
  }
];

const DEFAULT_PRESET_TASKS = [
  { text: 'مذاكرة درس الـ Webhooks والـ HTTP Methods (45 دقيقة)', estimatedMinutes: 45, phaseTag: 'المرحلة 0' },
  { text: 'بناء أول مسار في n8n وتجربة استقبال البيانات عبر Webhook', estimatedMinutes: 60, phaseTag: 'المرحلة 1' },
  { text: 'تجربة محاكي n8n التفاعلي وفحص مخرجات الـ JSON لكل عقدة', estimatedMinutes: 30, phaseTag: 'تطبيق عملي' },
  { text: 'تجهيز System Prompt مانع للهلوسة وتجربته في معمل الـ RAG', estimatedMinutes: 40, phaseTag: 'المرحلة 2' }
];

export const DailyActionPlan: React.FC = () => {
  // Morning Insight selection based on day or cycle
  const [insightIndex, setInsightIndex] = useState<number>(() => {
    try {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem('ai_roadmap_insight_date');
      const savedIndex = localStorage.getItem('ai_roadmap_insight_index');

      if (savedDate === today && savedIndex !== null) {
        return Number(savedIndex);
      }
      
      const newIndex = Math.floor(Math.random() * MORNING_INSIGHTS.length);
      localStorage.setItem('ai_roadmap_insight_date', today);
      localStorage.setItem('ai_roadmap_insight_index', String(newIndex));
      return newIndex;
    } catch {
      return 0;
    }
  });

  const [copiedInsight, setCopiedInsight] = useState(false);

  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_daily_tasks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRESET_TASKS.map((preset, idx) => ({
      id: `init-${idx}`,
      text: preset.text,
      completed: idx === 0,
      estimatedMinutes: preset.estimatedMinutes,
      phaseTag: preset.phaseTag,
      createdAt: new Date().toISOString()
    }));
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);

  // Streak counter from localStorage
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_daily_streak');
      return saved ? Number(saved) : 3;
    } catch {
      return 3;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_roadmap_daily_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const updated = !t.completed;
          if (updated) {
            // Check if all tasks done to bump streak
            const allWillBeDone = prev.filter(item => item.id !== taskId).every(item => item.completed);
            if (allWillBeDone) {
              setStreakDays(s => {
                const newS = s + 1;
                localStorage.setItem('ai_roadmap_daily_streak', String(newS));
                return newS;
              });
            }
          }
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: DailyTask = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      completed: false,
      estimatedMinutes: newTaskMinutes,
      phaseTag: 'مهمة يومية',
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addPreset = (presetText: string, minutes: number, tag: string) => {
    if (tasks.some(t => t.text === presetText)) return;
    const newTask: DailyTask = {
      id: `task-${Date.now()}`,
      text: presetText,
      completed: false,
      estimatedMinutes: minutes,
      phaseTag: tag,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalEstimatedTime = tasks.filter(t => !t.completed).reduce((acc, t) => acc + (t.estimatedMinutes || 30), 0);

  const currentInsight = MORNING_INSIGHTS[insightIndex] || MORNING_INSIGHTS[0];

  const handleNextInsight = () => {
    setInsightIndex(prev => (prev + 1) % MORNING_INSIGHTS.length);
  };

  const handleShareInsight = () => {
    const text = `💡 حكمة اليوم في الـ AI Automation:\n"${currentInsight.quote}"\n— ${currentInsight.authorNote}\n🚀 من خريطة طريق الأتمتة: من الصفر لحد أول عميل`;
    navigator.clipboard.writeText(text);
    setCopiedInsight(true);
    setTimeout(() => setCopiedInsight(false), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentInsight.quote}"\n\n— ${currentInsight.authorNote} #AI_Automation #n8n`)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`💡 حكمة اليوم في الـ AI Automation:\n\n"${currentInsight.quote}"\n— ${currentInsight.authorNote}`)}`;

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Morning Achievement Insight Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-slate-950 border border-amber-500/30 p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>تنبيه الإنجاز الصباحي ☀️</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300 font-normal">{currentInsight.topic}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextInsight}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors p-1"
              title="عرض حكمة أخرى"
            >
              <RefreshCw className="w-3 h-3" />
              <span>نصيحة أخرى</span>
            </button>
          </div>
        </div>

        {/* Quote body */}
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-amber-400/60 shrink-0 mt-0.5 rotate-180" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white leading-relaxed">
              "{currentInsight.quote}"
            </p>
            <div className="text-xs text-amber-300/80 font-medium">
              — {currentInsight.authorNote}
            </div>
          </div>
        </div>

        {/* Social Sharing & Copy Footer */}
        <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[11px] text-slate-400">
            ابدأ يومك بهذه العقلية وأنجز مهامك اليومية
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareInsight}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-sm"
              title="نسخ الحكمة للمشاركة"
            >
              {copiedInsight ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم النسخ للحافظة!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>مشاركة الحكمة</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 text-[11px] font-medium transition-colors"
              title="مشاركة على واتساب"
            >
              واتساب
            </a>

            <a
              href={tweetUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[11px] font-medium transition-colors"
              title="مشاركة على إكس / تويتر"
            >
              X / تويتر
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Target className="w-4 h-4" />
            <span>خطة العمل اليومية (Daily Action Plan)</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            مهام اليوم لإكمال مسار الأتمتة خطوة بخطوة 🎯
          </h3>
          <p className="text-xs text-slate-300">
            السر في الوصول لأول عميل هو الالتزام اليومي بساعتين: قسم وقتك لمهام صغيرة مركزة وأنجزها يومياً.
          </p>
        </div>

        {/* Daily Streak & Progress summary */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-slate-300">الاستمرارية:</span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">{streakDays} أيام متتالية 🔥</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">الإنجاز:</span>
            <span className="font-mono font-bold text-emerald-400 tabular-nums">{completedCount}/{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Remaining Time */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>نسبة إنجاز مهام اليوم:</span>
            <span className="font-mono font-bold text-white tabular-nums">{progressPercent}%</span>
          </div>
          {totalEstimatedTime > 0 && (
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>الوقت المتبقي لمهام اليوم:</span>
              <strong className="text-amber-300 font-mono tabular-nums">{totalEstimatedTime} دقيقة</strong>
            </div>
          )}
        </div>
        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="اكتب مهمة تعليمية أو تطبيقية جديدة لليوم..."
          className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
        
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={newTaskMinutes}
            onChange={(e) => setNewTaskMinutes(Number(e.target.value))}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
            title="الوقت المقدر بالدقائق"
          >
            <option value={15}>15 دقيقة</option>
            <option value={30}>30 دقيقة</option>
            <option value={45}>45 دقيقة</option>
            <option value={60}>ساعة كاملة</option>
            <option value={90}>ساعة ونصف</option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95 transition-all shadow-md whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مهمة</span>
          </button>
        </div>
      </form>

      {/* Suggested Quick Task Chips */}
      <div className="space-y-1.5">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          اقتراحات سريعة لليوم (اضغط للإضافة):
        </span>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_PRESET_TASKS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addPreset(preset.text, preset.estimatedMinutes, preset.phaseTag)}
              className="text-[11px] px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-right transition-colors"
            >
              + {preset.text}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2 pt-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
            لا توجد مهام حالياً. أضف مهمتك الأولى لليوم للبدء! 🚀
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-right ${
                task.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-75'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'border-slate-700 hover:border-amber-400 text-transparent'
                  }`}
                  aria-label={task.completed ? 'إلغاء إكمال المهمة' : 'إكمال المهمة'}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-semibold leading-relaxed ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.text}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    {task.phaseTag && <span>{task.phaseTag}</span>}
                    {task.phaseTag && <span aria-hidden="true">·</span>}
                    <span>{task.estimatedMinutes} دقيقة</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-900"
                title="حذف المهمة"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
