import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  Target, 
  Flame, 
  Clock, 
  Briefcase, 
  Sparkles,
  ArrowUpRight,
  Zap,
  Award
} from 'lucide-react';
import { ROADMAP_PHASES } from '../data/roadmapData';

interface PerformanceDashboardProps {
  completedTopicsCount: number;
  totalTopicsCount: number;
  completedProjectsCount: number;
  totalProjectsCount: number;
  completedTopicIds: Set<string>;
  currentLevelTitle: string;
  currentLevelBadgeIcon: string;
  onOpenLevelModal: () => void;
  onGoToRoadmap: () => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  completedTopicsCount,
  totalTopicsCount,
  completedProjectsCount,
  totalProjectsCount,
  completedTopicIds,
  currentLevelTitle,
  currentLevelBadgeIcon,
  onOpenLevelModal,
  onGoToRoadmap
}) => {
  const topicsPercent = Math.round((completedTopicsCount / Math.max(1, totalTopicsCount)) * 100);
  const projectsPercent = Math.round((completedProjectsCount / Math.max(1, totalProjectsCount)) * 100);
  const overallPercent = Math.round((topicsPercent * 0.6) + (projectsPercent * 0.4));
  const estimatedHours = Math.round((completedTopicsCount * 1.5) + (completedProjectsCount * 3.5));
  const estimatedPortfolioValue = completedProjectsCount * 750;

  // 1. Cumulative Progress Over Time Timeline Data
  const progressTimelineData = [
    { period: 'البداية (اليوم 1)', topics: 1, projects: 0, hours: 2 },
    { period: 'الأسبوع 1 (اليوم 7)', topics: Math.min(completedTopicsCount, 6), projects: Math.min(completedProjectsCount, 1), hours: 10 },
    { period: 'الأسبوع 2 (اليوم 14)', topics: Math.min(completedTopicsCount, 12), projects: Math.min(completedProjectsCount, 3), hours: 22 },
    { period: 'الأسبوع 3 (اليوم 21)', topics: Math.min(completedTopicsCount, 19), projects: Math.min(completedProjectsCount, 6), hours: 36 },
    { period: 'المستوى الحالي', topics: completedTopicsCount, projects: completedProjectsCount, hours: estimatedHours },
    { period: 'الهدف النهائي', topics: totalTopicsCount, projects: totalProjectsCount, hours: 65 }
  ];

  // 2. Progress by Phase Data
  const phaseProgressData = ROADMAP_PHASES.map((phase) => {
    const total = phase.topics.length;
    const completed = phase.topics.filter(t => completedTopicIds.has(t.id)).length;
    const shortName = phase.number.replace('المرحلة ', 'م');

    return {
      name: `${shortName}: ${phase.title.slice(0, 14)}...`,
      fullName: phase.title,
      completed,
      remaining: total - completed,
      total
    };
  });

  // 3. Technical Mastery Distribution Data
  const techPillarsData = [
    { name: 'n8n ومسارات الأتمتة', value: 30, color: '#f59e0b' },
    { name: 'هندسة الـ RAG والذكاء الاصطناعي', value: 25, color: '#8b5cf6' },
    { name: 'واتساب و Meta APIs', value: 20, color: '#10b981' },
    { name: 'قواعد البيانات و CRM', value: 15, color: '#0ea5e9' },
    { name: 'إغلاق الصفقات والـ Retainer', value: 10, color: '#ec4899' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <TrendingUp className="w-4 h-4" />
            <span>لوحة مؤشرات الأداء والتقدم التراكمي (Performance & Mastery Suite)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            متابعة إنجازك في رحلة الـ AI Automation 🚀
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            شاهد منحنى نمو مهاراتك بالأرقام والرسوم البيانية، وقس مدى اقترابك من بناء أول بورتفوليو احترافي وإغلاق أول صفقة شهرية.
          </p>
        </div>

        {/* Current Level Pill Card */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
          <span className="text-3xl">{currentLevelBadgeIcon}</span>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">الرتبة والمستوى الحالي:</div>
            <div className="text-sm font-bold text-amber-300">{currentLevelTitle}</div>
            <button
              onClick={onOpenLevelModal}
              className="text-[11px] text-amber-400 hover:underline font-semibold flex items-center gap-1 mt-0.5"
            >
              <span>عرض بطاقة المكافآت</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Progress */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">نسبة الإنجاز الإجمالية</span>
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white tabular-nums">
            {overallPercent}%
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700" 
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Completed Topics */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">الدروس والمفاهيم المكتملة</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-300 tabular-nums">
            {completedTopicsCount} <span className="text-sm text-slate-500 font-normal">/ {totalTopicsCount}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            متبقي <strong className="text-white font-mono">{totalTopicsCount - completedTopicsCount}</strong> موضوع لإتمام المنهج
          </div>
        </div>

        {/* KPI 3: Portfolio Projects */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">مشاريع البورتفوليو المنجزة</span>
            <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-sky-300 tabular-nums">
            {completedProjectsCount} <span className="text-sm text-slate-500 font-normal">/ {totalProjectsCount}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            القيمة السوقية: <strong className="text-emerald-400 font-mono font-bold">+${estimatedPortfolioValue}</strong>
          </div>
        </div>

        {/* KPI 4: Estimated Practical Hours */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">ساعات التطبيق الفعلي</span>
            <div className="w-7 h-7 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-purple-300 tabular-nums">
            ~{estimatedHours} <span className="text-sm text-slate-500 font-normal">ساعة عمل</span>
          </div>
          <div className="text-[11px] text-slate-400">
            استثمار تراكمي حقيقي في بناء أنظمة n8n
          </div>
        </div>
      </div>

      {/* Primary Chart: Cumulative Progress Curve (AreaChart) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>منحنى التطور الزمني والإنجاز التراكمي (Growth Trajectory)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              مقارنة وتيرة إتمام الدروس والمشاريع العملية عبر محطات رحلة الـ 30 يوماً
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-slate-300">الدروس المكتملة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-sky-400" />
              <span className="text-slate-300">المشاريع المنجزة</span>
            </div>
          </div>
        </div>

        <div className="w-full h-72 sm:h-80 dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTopics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  textAlign: 'right',
                  direction: 'rtl'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="topics" 
                name="الدروس المكتملة"
                stroke="#f59e0b" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorTopics)" 
              />
              <Area 
                type="monotone" 
                dataKey="projects" 
                name="المشاريع العملية"
                stroke="#38bdf8" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorProjects)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts: Phase Breakdown (BarChart) & Tech Stack Coverage (PieChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Phase Breakdown Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>معدل إنجاز كل مرحلة في خريطة الطريق</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              توزيع الدروس المنجزة مقابل المتبقية لكل مرحلة من المراحل السبع
            </p>
          </div>

          <div className="w-full h-64 sm:h-72 dir-ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                    textAlign: 'right',
                    direction: 'rtl'
                  }} 
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                />
                <Bar dataKey="completed" name="دروس منجزة" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="remaining" name="متبقية" fill="#334155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tech Stack Distribution PieChart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>توزيع المهارات الأساسية للوكالة</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              الأركان الخمسة المطلوبة لتقديم خدمات أتمتة مؤسسية
            </p>
          </div>

          <div className="w-full h-52 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={techPillarsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {techPillarsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                    textAlign: 'right',
                    direction: 'rtl'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
            {techPillarsData.map((p, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                <span className="truncate">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Call to Action */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>جاهز لرفع نسبة إنجازك اليوم؟</span>
            <span className="text-amber-400">🔥</span>
          </div>
          <p className="text-xs text-slate-400">
            إكمال درس واحد إضافي يومياً يزيد سرعتك للوصول لأول عميل بنسبة 25%!
          </p>
        </div>

        <button
          onClick={onGoToRoadmap}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
        >
          <span>متابعة الدروس الآن</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
