import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/roadmapData';
import { PortfolioProject } from '../types';
import { 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ArrowLeft, 
  ExternalLink,
  Filter,
  Search,
  DollarSign,
  Clock,
  Copy,
  Check,
  Download,
  Share2
} from 'lucide-react';

interface ProjectsLibraryProps {
  completedProjectIds: Set<number>;
  onToggleProject: (id: number) => void;
}

export const ProjectsLibrary: React.FC<ProjectsLibraryProps> = ({
  completedProjectIds,
  onToggleProject
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [copiedBlueprint, setCopiedBlueprint] = useState<boolean>(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const filtered = PORTFOLIO_PROJECTS.filter(p => {
    const matchesDifficulty = filterDifficulty === 'all' || p.difficulty === filterDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const toggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const getEstimatedPrice = (difficulty: string) => {
    if (difficulty === 'سهل') return '$350 - $600 Setup + $150/ش';
    if (difficulty === 'متوسط') return '$800 - $1,500 Setup + $300/ش';
    return '$1,800 - $3,500 Setup + $600/ش';
  };

  const getEstimatedBuildTime = (difficulty: string) => {
    if (difficulty === 'سهل') return '2 - 4 ساعات عمل';
    if (difficulty === 'متوسط') return '1 - 2 أيام عمل';
    return '3 - 5 أيام عمل';
  };

  const handleCopyBlueprint = () => {
    const blueprintJson = {
      project_id: selectedProject.id,
      title: selectedProject.title,
      difficulty: selectedProject.difficulty,
      tools: selectedProject.tools,
      architecture_pipeline: selectedProject.steps,
      sample_payload: selectedProject.samplePayload
    };
    navigator.clipboard.writeText(JSON.stringify(blueprintJson, null, 2));
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
          <Briefcase className="w-4 h-4" />
          <span>المعرض العملي المتطور: 10 مشاريع لبناء بورتفوليو احترافي</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          حقيبة المشاريع العملية المعتمدة في السوق
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          كل مشروع مصمم لحل أزمة حقيقية لدى الشركات مع تسعير البيع المقترح، ومخطط المعمارية (Architecture Pipeline)، ونموذج البيانات الجاهز.
        </p>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المشروع أو الأداة (مثال: WhatsApp, Sheets, RAG)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setFilterDifficulty('all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                filterDifficulty === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setFilterDifficulty('سهل')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                filterDifficulty === 'سهل' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              سهل (3)
            </button>
            <button
              onClick={() => setFilterDifficulty('متوسط')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                filterDifficulty === 'متوسط' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              متوسط (4)
            </button>
            <button
              onClick={() => setFilterDifficulty('متقدم')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                filterDifficulty === 'متقدم' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              متقدم (3)
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Project List & Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Selector List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
              لا توجد مشاريع مطابقة للبحث.
            </div>
          ) : (
            filtered.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              const isCompleted = completedProjectIds.has(proj.id);

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 text-right ${
                    isSelected
                      ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400 shrink-0">
                      {proj.id}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {proj.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className={proj.difficultyColor.split(' ')[0]}>
                          ● {proj.difficulty}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{proj.tools.slice(0, 2).join(' + ')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleProject(proj.id);
                    }}
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                        : 'border-slate-700 hover:border-amber-400 text-transparent'
                    }`}
                    title={isCompleted ? 'إلغاء التحديد' : 'تحديد كمشروع مكتمل'}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Project Deep-Dive Inspection */}
        <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className="font-mono text-amber-400 font-bold">المشروع #{selectedProject.id}</span>
                <span aria-hidden="true">·</span>
                <span className={`font-semibold ${selectedProject.difficultyColor.split(' ')[0]}`}>
                  المستوى: {selectedProject.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {selectedProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyBlueprint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
                title="نسخ هيكل المشروع كملف JSON"
              >
                {copiedBlueprint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedBlueprint ? 'تم النسخ!' : 'نسخ Blueprint'}</span>
              </button>

              <button
                onClick={() => onToggleProject(selectedProject.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  completedProjectIds.has(selectedProject.id)
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-800/60'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedProjectIds.has(selectedProject.id) ? 'مشروع مكتمل ✅' : 'حدّد كمكتمل'}</span>
              </button>
            </div>
          </div>

          {/* Market Value & Time Estimates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[11px] block">سعر البيع المقترح للعميل:</span>
                <strong className="text-emerald-300 font-mono">{getEstimatedPrice(selectedProject.difficulty)}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[11px] block">وقت التنفيذ المقدر:</span>
                <strong className="text-amber-300 font-mono">{getEstimatedBuildTime(selectedProject.difficulty)}</strong>
              </div>
            </div>
          </div>

          {/* Business Value */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              القيمة التجارية للعميل (Business ROI):
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {selectedProject.businessValue}
            </p>
          </div>

          {/* Architecture Pipeline Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              مخطط مسار العمل المعماري (Architecture Flow):
            </span>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {selectedProject.tools.map((tool, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-semibold text-white">
                    {tool}
                  </div>
                  {idx < selectedProject.tools.length - 1 && (
                    <span className="text-amber-400 font-bold">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Interactive Implementation Steps Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">
              خطوات التنفيذ العملية في n8n (قائمة تحقق):
            </span>
            <div className="space-y-2">
              {selectedProject.steps.map((st, sIdx) => {
                const stepKey = `proj-${selectedProject.id}-step-${sIdx}`;
                const isStepChecked = checkedSteps[stepKey] || false;

                return (
                  <div 
                    key={sIdx}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 leading-relaxed ${
                      isStepChecked 
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full font-mono font-bold flex items-center justify-center shrink-0 text-[11px] ${
                      isStepChecked ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-amber-400'
                    }`}>
                      {isStepChecked ? '✓' : sIdx + 1}
                    </span>
                    <span>{st}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample Input/Output JSON payload */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              عينة البيانات (Data Flow Payload):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">المدخل (Input Trigger):</span>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 dir-ltr text-left overflow-x-auto max-h-32">
                  <pre>{selectedProject.samplePayload.input}</pre>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">المخرج (Output Result):</span>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 dir-ltr text-left overflow-x-auto max-h-32">
                  <pre>{selectedProject.samplePayload.output}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
